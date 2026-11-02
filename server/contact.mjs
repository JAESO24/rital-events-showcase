import nodemailer from "nodemailer";

const json = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
};
export function createContactHandler(
  { store, send, storageReady, mailReady },
  { now = Date.now } = {},
) {
  const limits = new Map(),
    completed = new Map();
  return async (req, res, next = () => {}) => {
    const path = new URL(req.url, "http://localhost").pathname;
    if (path === "/api/contact/status" && req.method === "GET")
      return json(res, 200, { storageReady, mailReady });
    if (path !== "/api/contact") return next();
    if (req.method !== "POST") return json(res, 405, { error: "Méthode non autorisée." });
    const host = req.headers.host,
      origin = req.headers.origin;
    if (origin) {
      try {
        if (new URL(origin).host !== host)
          return json(res, 403, { error: "Origine non autorisée." });
      } catch {
        return json(res, 403, { error: "Origine non autorisée." });
      }
    }
    if (!(req.headers["content-type"] || "").startsWith("application/json"))
      return json(res, 415, { error: "Format de demande non reconnu." });
    let body = "";
    try {
      for await (const chunk of req) {
        body += chunk;
        if (Buffer.byteLength(body) > 20000)
          return json(res, 413, { error: "Votre demande est trop longue." });
      }
    } catch {
      return json(res, 400, { error: "Demande incomplète." });
    }
    let data;
    try {
      data = JSON.parse(body);
    } catch {
      return json(res, 400, { error: "Demande illisible." });
    }
    if (!data || typeof data !== "object") return json(res, 400, { error: "Demande invalide." });
    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim() : "";
    const phone = typeof data.phone === "string" ? data.phone.trim() : "";
    const message = typeof data.message === "string" ? data.message.trim() : "";
    if (
      name.length < 2 ||
      name.length > 120 ||
      email.length > 255 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      /[\r\n]/.test(email + name) ||
      phone.length > 40 ||
      message.length < 10 ||
      message.length > 12000 ||
      data.website
    )
      return json(res, 400, {
        error: "Vérifiez votre nom, votre e-mail et le contenu de votre demande.",
      });
    if (!storageReady && !mailReady)
      return json(res, 503, {
        error:
          "Le formulaire est temporairement indisponible. Contactez-nous par téléphone ou WhatsApp.",
      });
    const token = String(req.headers["idempotency-key"] || "");
    if (!/^[a-f\d-]{36}$/i.test(token))
      return json(res, 400, {
        error: "Identifiant de demande invalide. Préparez à nouveau votre message.",
      });
    const fingerprint = JSON.stringify({ name, email, phone, message });
    const key = token;
    for (const [k, v] of completed) if (now() - v.at > 600000) completed.delete(k);
    if (completed.has(key)) {
      const prior = completed.get(key);
      if (prior.fingerprint !== fingerprint)
        return json(res, 409, { error: "Cette demande a changé. Préparez un nouveau message." });
      const result = await prior.promise;
      return json(res, result.status, result.payload);
    }
    const ip = req.socket.remoteAddress || "local";
    const recent = (limits.get(ip) || []).filter((t) => now() - t < 600000);
    if (recent.length >= 5)
      return json(res, 429, {
        error:
          "Plusieurs demandes viennent d’être envoyées. Patientez quelques minutes ou contactez-nous par téléphone.",
      });
    limits.set(ip, [...recent, now()]);
    const promise = (async () => {
      let saved = false,
        emailSent = false;
      if (storageReady) {
        try {
          await store({ name, email, phone, message });
          saved = true;
        } catch {}
      }
      if (mailReady) {
        try {
          await send({ name, email, phone, message });
          emailSent = true;
        } catch {}
      }
      if (emailSent)
        return {
          status: 200,
          payload: {
            status: "sent",
            emailSent: true,
            saved,
            message: "Votre demande a été transmise à Rital Events. Nous reviendrons vers vous.",
          },
        };
      if (saved)
        return {
          status: 202,
          payload: {
            status: "saved",
            emailSent: false,
            saved: true,
            message:
              "Votre demande a bien été enregistrée. La notification par e-mail n’a pas pu être confirmée. Vous pouvez aussi nous joindre par WhatsApp.",
          },
        };
      return {
        status: 503,
        payload: {
          error:
            "Votre demande n’a pas pu être transmise. Réessayez ou contactez-nous par WhatsApp.",
        },
      };
    })();
    completed.set(key, { fingerprint, promise, at: now() });
    const result = await promise;
    if (result.status === 503) completed.delete(key);
    return json(res, result.status, result.payload);
  };
}
export function createServices(env) {
  const url = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
  const publicKey = env.SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY;
  const storageReady = Boolean(url && publicKey);
  const port = Number(env.SMTP_PORT || 465);
  const mailReady = Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS && env.SMTP_FROM);
  const transport = mailReady
    ? nodemailer.createTransport({
        host: env.SMTP_HOST,
        port,
        secure: port === 465,
        requireTLS: port !== 465,
        auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
      })
    : null;
  return {
    storageReady,
    mailReady,
    store: async (data) => {
      const response = await fetch(new URL("/rest/v1/contacts", url), {
        method: "POST",
        headers: {
          apikey: publicKey,
          Authorization: `Bearer ${publicKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ ...data, phone: data.phone || null }),
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) throw new Error("Contact storage failed");
    },
    send: async (data) => {
      if (!transport) throw new Error("Mail not configured");
      const receipt = await transport.sendMail({
        from: env.SMTP_FROM,
        to: env.CONTACT_TO || "ritapokou12@gmail.com",
        replyTo: { name: data.name, address: data.email },
        subject: "Demande de devis — Rital Events",
        text: `Nouvelle demande depuis le site Rital Events\n\n${data.message}`,
        disableFileAccess: true,
        disableUrlAccess: true,
      });
      if (!receipt.accepted?.length) throw new Error("Mail not accepted");
    },
  };
}
export function contactPlugin(env) {
  const services = createServices(env);
  return {
    name: "rital-contact-local",
    configureServer(server) {
      server.middlewares.use(createContactHandler(services));
    },
    configurePreviewServer(server) {
      server.middlewares.use(createContactHandler(services));
    },
  };
}
