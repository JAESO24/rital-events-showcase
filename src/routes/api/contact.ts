import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const bodySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).nullable().optional(),
  message: z.string().trim().min(1).max(5000),
});

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const parsed = bodySchema.safeParse(payload);
        if (!parsed.success) {
          return new Response(
            JSON.stringify({ error: "Validation failed", issues: parsed.error.issues }),
            { status: 400, headers: { "Content-Type": "application/json" } },
          );
        }

        const { name, email, phone, message } = parsed.data;

        // Best-effort: log to a server-side audit row using admin client.
        // Email delivery to the business is handled by Lovable Cloud once
        // an email domain is configured (see the dashboard).
        try {
          // No-op insert mirror: we already insert from the client, but in
          // case the client insert was bypassed, we make the route resilient.
          await supabaseAdmin
            .from("contacts")
            .insert({ name, email, phone: phone ?? null, message })
            .select()
            .maybeSingle();
        } catch (err) {
          console.error("Server-side mirror insert failed:", err);
        }

        // Log a structured record so the team can monitor in server logs.
        console.log("[contact] new submission", { name, email, phone });

        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
