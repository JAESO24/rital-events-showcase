import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Download,
  LoaderCircle,
  MapPin,
  Send,
  ShoppingBag,
} from "lucide-react";
import { useSelection, selectedLines, PageIntro, Eyebrow, Faq } from "./Experience";
import { money, pdfUrl, wa, priceText } from "@/data/catalogue";
type Payload = { name: string; email: string; phone: string; message: string; website: string };
export function PremiumContact() {
  const { basket } = useSelection();
  const lines = selectedLines(basket);
  const total = lines.reduce((n, p) => n + p.price * p.quantity, 0);
  const unpriced = lines.filter((p) => p.quoted).length;
  const [prepared, setPrepared] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "saved" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState<boolean | null>(null);
  const id = useRef("");
  const previous = useRef("");
  const form = useRef<HTMLFormElement>(null);
  const now = new Date();
  const dateMin = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/contact/status", { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setReady(Boolean(data.storageReady || data.mailReady)))
      .catch(() => {
        if (!controller.signal.aborted) setReady(false);
      });
    return () => controller.abort();
  }, []);
  function collect(): Payload | null {
    if (!form.current?.reportValidity()) return null;
    const d = new FormData(form.current);
    const date = String(d.get("date") || "");
    const text = `Bonjour Rital Events,\n\nJe souhaite préparer un événement.\nNom : ${d.get("name")}\nTéléphone : ${d.get("phone")}\nE-mail : ${d.get("email")}\nÉvénement : ${d.get("event")}\nDate : ${date ? date.split("-").reverse().join("/") : "À préciser"}\nLieu : ${d.get("place")}\nInvités : ${d.get("guests") || "À préciser"}\n\n${lines.length ? "Ma sélection — Catalogue Premium 2026 :\n" + lines.map((p) => `- ${p.reference} · ${p.name} : ${p.quantity} ${p.unit} · ${priceText(p)}${p.quoted ? "" : " = " + money(p.quantity * p.price)}`).join("\n") + (lines.some((p) => !p.quoted) ? "\nSous-total indicatif des articles tarifés : " + money(total) : "\nMontant de la sélection : sur devis") + (unpriced ? "\n+ " + unpriced + " référence(s) sur devis, non comprise(s) dans le sous-total." : "") + "\nDurée, disponibilités et frais annexes à confirmer.\n\n" : ""}Précisions : ${d.get("message") || "À discuter ensemble"}\n\nMerci de confirmer les disponibilités et de me proposer un devis.`;
    setPrepared(text);
    if (previous.current !== text) {
      id.current = crypto.randomUUID();
      previous.current = text;
    }
    return {
      name: String(d.get("name")).trim(),
      email: String(d.get("email")).trim(),
      phone: String(d.get("phone")).trim(),
      message: text,
      website: String(d.get("website") || ""),
    };
  }
  async function send(e: React.FormEvent) {
    e.preventDefault();
    const payload = collect();
    if (!payload) return;
    setState("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": id.current },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(45000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "L’envoi a échoué. Veuillez réessayer.");
      setState(result.emailSent ? "sent" : "saved");
      setFeedback(result.message);
    } catch (err) {
      setState("error");
      setFeedback(
        err instanceof Error && err.name === "TimeoutError"
          ? "L’envoi prend plus de temps que prévu. Réessayez : votre demande ne sera pas envoyée deux fois."
          : err instanceof Error
            ? err.message
            : "Le service est momentanément indisponible. Réessayez ou contactez-nous par WhatsApp.",
      );
    }
  }
  return (
    <>
      <PageIntro
        label="Préparons votre événement"
        title="Une belle histoire commence ici."
        description="Décrivez votre événement et transmettez votre sélection à Rital Events. L’équipe pourra vous répondre à l’adresse e-mail indiquée."
      />
      <section className="wrap contact-layout">
        <aside className="contact-info">
          <Eyebrow>Rital Events · Côte d’Ivoire</Eyebrow>
          <h2>
            À votre
            <br />
            <em>écoute.</em>
          </h2>
          <p>
            Riviera Palmeraie, non loin du complexe.
            <br />
            Abidjan, Côte d’Ivoire
          </p>
          <a href="tel:+2250779937563">
            +225 07 79 93 75 63 <ArrowUpRight size={17} />
          </a>
          <a href="tel:+2250797900238">
            +225 07 97 90 02 38 <ArrowUpRight size={17} />
          </a>
          <a href="mailto:ritapokou12@gmail.com">
            ritapokou12@gmail.com <ArrowUpRight size={17} />
          </a>
          <a
            className="button"
            href={wa("Bonjour Rital Events, je souhaite discuter de mon événement.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Discuter sur WhatsApp <ArrowUpRight size={17} />
          </a>
          <a
            className="text-link"
            href="https://www.google.com/maps/search/?api=1&query=Rital+Events+Riviera+Palmeraie+Abidjan"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rechercher l’itinéraire <MapPin size={17} />
          </a>
          <p className="caption">
            Confirmez le point de rendez-vous avec l’équipe avant votre déplacement.
          </p>
          <a className="text-link" href={pdfUrl} download>
            Télécharger le catalogue PDF <Download size={17} />
          </a>
        </aside>
        <div>
          <form
            className="quote-form"
            ref={form}
            onSubmit={send}
            onChange={() => {
              if (state === "sent" || state === "saved" || state === "error") {
                setState("idle");
                setFeedback("");
              }
            }}
          >
            <div className="form-heading">
              <span>Votre projet, en quelques mots</span>
              <small>* Champs obligatoires</small>
            </div>
            <fieldset disabled={state === "sending"}>
              <div className="form-grid">
                <label>
                  Votre nom *
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={120}
                    placeholder="Nom et prénom"
                  />
                </label>
                <label>
                  Téléphone *
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    pattern="[+0-9 ]{8,30}"
                    maxLength={30}
                    placeholder="+225 07 00 00 00 00"
                  />
                </label>
                <label>
                  E-mail *
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={180}
                    placeholder="vous@exemple.com"
                  />
                </label>
                <label>
                  Type d’événement *
                  <select name="event" required defaultValue="">
                    <option value="" disabled>
                      Choisir un événement
                    </option>
                    {[
                      "Mariage",
                      "Anniversaire",
                      "Réception privée",
                      "Événement professionnel",
                      "Cérémonie",
                      "Autre",
                    ].map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Date souhaitée
                  <input name="date" type="date" min={dateMin} />
                </label>
                <label>
                  Nombre d’invités
                  <input name="guests" type="number" min="1" max="100000" placeholder="Ex. 100" />
                </label>
                <label className="full">
                  Lieu de l’événement *
                  <input
                    name="place"
                    required
                    minLength={2}
                    maxLength={200}
                    placeholder="Commune, quartier ou lieu de réception"
                  />
                </label>
                <label className="full">
                  Vos envies et besoins
                  <textarea
                    name="message"
                    rows={4}
                    maxLength={4000}
                    placeholder="Couleurs, matériel, quantités, livraison souhaitée…"
                  />
                </label>
              </div>
              <label className="form-honeypot" aria-hidden="true">
                Laissez ce champ vide
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
              <div className="selection-summary">
                <ShoppingBag size={18} />
                <div>
                  <strong>
                    {lines.length
                      ? `${lines.length} référence${lines.length > 1 ? "s" : ""} dans votre sélection`
                      : "Pas encore de sélection ?"}
                  </strong>
                  <p>
                    {lines.length
                      ? (lines.some((p) => !p.quoted) ? money(total) : "Sur devis") +
                        " · sous-total indicatif" +
                        (unpriced ? " + articles sur devis" : "")
                      : "Décrivez votre besoin directement."}
                  </p>
                </div>
                <Link to="/catalogue">{lines.length ? "Modifier" : "Voir le catalogue"}</Link>
              </div>
              <p className="caption form-explanation">
                Votre demande sera transmise à Rital Events. L’envoi ne constitue pas une
                réservation.
              </p>
              {ready === false && (
                <p className="form-feedback error" role="status">
                  Le formulaire est momentanément indisponible. Vous pouvez préparer votre message
                  puis nous contacter par WhatsApp.
                </p>
              )}
              <button
                className="button send-request"
                type="submit"
                disabled={
                  state === "sending" || state === "sent" || state === "saved" || ready !== true
                }
              >
                {state === "sending" ? (
                  <>
                    <LoaderCircle className="spin" size={18} />
                    Envoi en cours…
                  </>
                ) : state === "sent" || state === "saved" ? (
                  <>
                    <CheckCircle2 size={18} />
                    Demande prise en compte
                  </>
                ) : ready === null ? (
                  <>
                    <LoaderCircle className="spin" size={18} />
                    Chargement du formulaire…
                  </>
                ) : (
                  <>
                    Envoyer ma demande <Send size={17} />
                  </>
                )}
              </button>
              <button
                className="text-link preview-request"
                type="button"
                onClick={() => {
                  if (collect())
                    setTimeout(
                      () =>
                        document
                          .getElementById("prepared-message")
                          ?.scrollIntoView({ behavior: "smooth", block: "center" }),
                      30,
                    );
                }}
              >
                Relire et partager le message <ArrowRight size={16} />
              </button>
            </fieldset>
            <div aria-live="polite">
              {feedback && (
                <p
                  className={
                    "form-feedback " +
                    (state === "error" ? "error" : state === "sent" ? "success" : "saved")
                  }
                >
                  {feedback}
                </p>
              )}
            </div>
          </form>
          {prepared && (
            <div
              className="prepared-message"
              id="prepared-message"
              role="region"
              aria-label="Votre demande prête à transmettre"
            >
              <Eyebrow>Votre projet en détail</Eyebrow>
              <h3>Le message de votre demande.</h3>
              <pre>{prepared}</pre>
              <div className="message-actions">
                <a className="button" href={wa(prepared)} target="_blank" rel="noopener noreferrer">
                  Ouvrir WhatsApp <ArrowUpRight size={17} />
                </a>
                <a
                  className="button outline"
                  href={
                    "mailto:ritapokou12@gmail.com?subject=" +
                    encodeURIComponent("Demande de devis — Rital Events") +
                    "&body=" +
                    encodeURIComponent(prepared)
                  }
                >
                  Ouvrir ma messagerie
                </a>
                <button
                  className="text-link"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(prepared);
                      setCopied(true);
                    } catch {
                      setFeedback("Sélectionnez le texte du message pour le copier.");
                    }
                  }}
                >
                  {copied ? "Message copié" : "Copier le message"}
                </button>
              </div>
              <p className="caption">
                Ces options vous permettent aussi de partager la demande depuis WhatsApp ou votre
                messagerie.
              </p>
            </div>
          )}
        </div>
      </section>
      <Faq />
    </>
  );
}
