import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Rital Events" },
      {
        name: "description",
        content:
          "Contactez Rital Events pour organiser votre événement : devis gratuit, équipe disponible et réactive.",
      },
      { property: "og:title", content: "Contact — Rital Events" },
      {
        property: "og:description",
        content: "Demandez un devis gratuit pour votre événement. Notre équipe vous répond rapidement.",
      },
    ],
  }),
  component: ContactPage,
});

const INFO = [
  { icon: Mail, label: "Email", value: "ritapokou12@gmail.com" },
  { icon: Phone, label: "Téléphone", value: "+225 0779937563" },
  { icon: MapPin, label: "Adresse", value: "834 Avenue Albert Kakou Tiapani, Abidjan — Yango : Rue I165, 111" },
  { icon: Clock, label: "Horaires", value: "Lundi au Samedi, 8h — 18h" },
];

function ContactPage() {
  return (
    <>
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 bg-gradient-brand text-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-accent-glow font-semibold mb-3">
            Contact
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight max-w-3xl mb-4">
            Parlons de votre événement.
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Décrivez-nous votre projet, nous vous recontactons rapidement avec une proposition sur-mesure.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
          {/* Info side */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-primary mb-4">
              Nos coordonnées
            </h2>
            {INFO.map((i) => {
              const Icon = i.icon;
              return (
                <div
                  key={i.label}
                  className="bg-gradient-card rounded-2xl p-5 shadow-card border border-border/50 flex items-start gap-4 hover:shadow-elegant hover:-translate-y-0.5 transition-spring"
                >
                  <div className="h-12 w-12 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow shrink-0">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                      {i.label}
                    </p>
                    <p className="text-primary font-medium">{i.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form side */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>

        {/* Map */}
        <div className="max-w-6xl mx-auto mt-12">
          <h2 className="font-display text-2xl md:text-3xl text-primary mb-6">
            Nous trouver
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-elegant border border-border/50 h-80 md:h-96">
            <iframe
              title="Localisation Rital Events"
              src="https://maps.google.com/maps?q=834+Avenue+Albert+Kakou+Tiapani+Abidjan&output=embed&z=16"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
