import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Star, Users, Lightbulb, ArrowRight, MapPin, Trophy, CalendarCheck, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_site/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Rital Events" },
      {
        name: "description",
        content:
          "Rital Events, entreprise événementielle ivoirienne fondée par Mme POKOU Rita. Plus de 500 prestations réalisées en Côte d'Ivoire : mariages, galas, décoration, traiteur et bien plus.",
      },
      { property: "og:title", content: "À propos — Rital Events" },
      {
        property: "og:description",
        content: "Découvrez notre vision, nos valeurs et notre engagement envers nos clients.",
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Heart, title: "Passion", text: "Nous mettons du cœur dans chaque détail, parce que vos émotions sont notre moteur." },
  { icon: Star, title: "Excellence", text: "Une exigence sans compromis sur la qualité et la précision." },
  { icon: Users, title: "Proximité", text: "Une relation de confiance et un accompagnement humain à chaque étape." },
  { icon: Lightbulb, title: "Créativité", text: "Des idées originales pour des événements qui marquent les esprits." },
];

const STATS = [
  { icon: Trophy, value: "+500", label: "Prestations réalisées" },
  { icon: CalendarCheck, value: "+8", label: "Années d'expérience" },
  { icon: Smile, value: "98%", label: "Clients satisfaits" },
  { icon: MapPin, value: "CI", label: "Fièrement ivoirien" },
];

function AboutPage() {
  return (
    <>
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 bg-gradient-brand text-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-accent-glow font-semibold mb-3">
            Notre histoire
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
            Une équipe passionnée, au service de vos plus beaux moments.
          </h1>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gradient-brand/5 border-b border-border/40">
        <div className="container mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-card shadow-card"
                >
                  <div className="h-11 w-11 rounded-xl bg-gradient-accent flex items-center justify-center mb-3 shadow-glow">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-display text-4xl text-primary font-bold">{stat.value}</span>
                  <span className="text-sm text-muted-foreground mt-1">{stat.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUI SOMMES-NOUS */}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
              Qui sommes-nous
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-5">
              Rital Events — l'art de transformer les idées en émotions.
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Fondée par <span className="text-primary font-semibold">Mme POKOU Rita</span>,
                Rital Events est une entreprise ivoirienne spécialisée dans l'organisation et
                la coordination d'événements sur-mesure. Basée à <span className="text-primary font-semibold">Cocody Rivera Palmeraie, Abidjan</span>,
                elle rayonne sur toute la Côte d'Ivoire et au-delà.
              </p>
              <p>
                Avec <span className="text-primary font-semibold">plus de 500 prestations réalisées</span>,
                Rital Events s'est imposée comme une référence incontournable pour les mariages,
                galas, séminaires et célébrations privées. Du mariage intimiste au grand gala
                d'entreprise, nous mettons notre savoir-faire au service de vos rêves.
              </p>
              <p>
                Notre force ? Une équipe pluridisciplinaire qui maîtrise chaque maillon de
                la chaîne événementielle : créativité, traiteur, décoration florale, logistique,
                location et coordination. Un seul interlocuteur, une exécution irréprochable.
              </p>
              <p>
                Nous croyons qu'un événement réussi est un événement où chaque détail
                compte — et où vous, vous n'avez plus qu'à profiter.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-elegant relative">
              <div className="absolute inset-0 bg-gradient-brand" />
              <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full opacity-30" aria-hidden="true">
                <path d="M50,100 C100,50 200,150 300,80 C350,50 380,100 380,150" stroke="white" strokeWidth="3" fill="none" />
                <path d="M30,250 C150,200 250,350 380,300" stroke="white" strokeWidth="3" fill="none" />
                <path d="M50,400 C200,350 300,450 380,420" stroke="white" strokeWidth="3" fill="none" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                <div>
                  <p className="font-display text-5xl text-white italic mb-3">"</p>
                  <p className="font-display text-2xl text-white leading-relaxed mb-4">
                    Faire d'un instant<br />un souvenir éternel.
                  </p>
                  <div className="mt-6 border-t border-white/20 pt-5">
                    <p className="text-white font-semibold tracking-wide">Mme POKOU Rita</p>
                    <p className="text-white/70 text-sm uppercase tracking-widest mt-1">Fondatrice & Directrice</p>
                    <p className="text-white/60 text-xs mt-1 flex items-center justify-center gap-1">
                      <MapPin className="h-3 w-3" /> Côte d'Ivoire
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* decorative blob */}
            <div className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-accent shadow-glow animate-float" aria-hidden="true" />
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
              Nos valeurs
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-primary">
              Ce qui nous anime au quotidien.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, idx) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-card rounded-3xl p-7 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-spring"
                >
                  <div className="h-12 w-12 rounded-2xl bg-gradient-accent flex items-center justify-center mb-4 shadow-glow">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl text-primary mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 py-20">
        <div className="bg-gradient-brand rounded-[2.5rem] p-10 md:p-14 text-center shadow-elegant">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Travaillons ensemble.
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Une question, un projet ? Nous serions ravis d'en discuter avec vous.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Prendre contact <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
}