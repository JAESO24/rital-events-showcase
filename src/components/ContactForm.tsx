import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(120, "Nom trop long"),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z
    .string()
    .trim()
    .max(40, "Téléphone trop long")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(10, "Message trop court (min 10 caractères)").max(5000),
  // honeypot — must remain empty
  website: z.string().max(0).optional().or(z.literal("")),
});

type FormState = z.infer<typeof contactSchema>;

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Veuillez corriger les erreurs du formulaire.");
      return;
    }

    // honeypot caught
    if (parsed.data.website) {
      setSuccess(true);
      return;
    }

    setSubmitting(true);
    try {
      // 1) Persist to database
      const { error: dbError } = await supabase.from("contacts").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        message: parsed.data.message,
      });

      if (dbError) throw dbError;

      // 2) Notify by email (best-effort — don't block success on this)
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: parsed.data.name,
            email: parsed.data.email,
            phone: parsed.data.phone || null,
            message: parsed.data.message,
          }),
        });
      } catch {
        // silently ignore email failure — message is already saved
      }

      setSuccess(true);
      setValues(initial);
      toast.success("Votre message a été envoyé avec succès !");
    } catch (err) {
      console.error("Contact submit error:", err);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-card rounded-3xl p-10 md:p-14 shadow-elegant text-center"
      >
        <div className="h-20 w-20 mx-auto rounded-full bg-gradient-accent flex items-center justify-center mb-6 shadow-glow">
          <CheckCircle2 className="h-10 w-10 text-white" />
        </div>
        <h3 className="font-display text-3xl text-primary mb-3">Merci !</h3>
        <p className="text-muted-foreground mb-6">
          Votre message a été envoyé avec succès. Nous reviendrons vers vous très rapidement.
        </p>
        <Button variant="outline" onClick={() => setSuccess(false)}>
          Envoyer un autre message
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="bg-gradient-card rounded-3xl p-6 md:p-10 shadow-elegant border border-border/50"
    >
      {/* Honeypot — hidden from real users */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Laissez vide</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={update("website")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name" className="text-primary font-medium">
            Nom <span className="text-accent">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            value={values.name}
            onChange={update("name")}
            required
            maxLength={120}
            disabled={submitting}
            className="mt-2 h-12 rounded-xl"
            placeholder="Jean Dupont"
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-xs text-accent mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="email" className="text-primary font-medium">
            Email <span className="text-accent">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={update("email")}
            required
            maxLength={255}
            disabled={submitting}
            className="mt-2 h-12 rounded-xl"
            placeholder="vous@exemple.com"
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-xs text-accent mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="phone" className="text-primary font-medium">
          Téléphone <span className="text-muted-foreground text-xs font-normal">(optionnel)</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          value={values.phone}
          onChange={update("phone")}
          maxLength={40}
          disabled={submitting}
          className="mt-2 h-12 rounded-xl"
          placeholder="+33 6 12 34 56 78"
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <p className="text-xs text-accent mt-1">{errors.phone}</p>}
      </div>

      <div className="mt-5">
        <Label htmlFor="message" className="text-primary font-medium">
          Message <span className="text-accent">*</span>
        </Label>
        <Textarea
          id="message"
          value={values.message}
          onChange={update("message")}
          required
          maxLength={5000}
          rows={6}
          disabled={submitting}
          className="mt-2 rounded-xl resize-none"
          placeholder="Décrivez-nous votre projet, la date, le nombre d'invités..."
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="text-xs text-accent mt-1">{errors.message}</p>}
      </div>

      <Button
        type="submit"
        variant="hero"
        size="lg"
        disabled={submitting}
        className="mt-6 w-full md:w-auto"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Envoyer le message
          </>
        )}
      </Button>
    </form>
  );
}
