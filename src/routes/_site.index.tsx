import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Award, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/SectionTitle";
import { ServicesGrid } from "@/components/ServicesGrid";
import { GalleryGrid } from "@/components/GalleryGrid";
import heroImg from "@/assets/hero-event.jpg";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "Rital Events — Donnez vie à vos événements" },
      {
        name: "description",
        content:
          "Rital Events organise vos événements sur-mesure : mariages, galas, séminaires. Service traiteur, logistique et organisation complète en France.",
      },
      { property: "og:title", content: "Rital Events — Donnez vie à vos événements" },
      {
        property: "og:description",
        content:
          "Agence événementielle complète : événementiel, traiteur, logistique et location. Faites de chaque moment un souvenir inoubliable.",
      },
    ],
  }),
  component: HomePage,
});

const ADVANTAGES = [
  { icon: Award, title: "Expertise", text: "Des années d'expérience au service de vos événements." },
  { icon: Sparkles, title: "Sur-mesure", text: "Chaque projet est unique, conçu autour de vos envies." },
  { icon: Shield, title: "Réactivité", text: "Une équipe disponible et à l'écoute, en toutes circonstances." },
  { icon: Heart, title: "Qualité", text: "Une exigence absolue dans chaque détail livré." },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Réception élégante organisée par Rital Events"
            width={1920}
            height={1280}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>

        {/* decorative animated curves echoing the logo */}
        <svg
          className="absolute bottom-0 left-0 w-full text-background pointer-events-none"
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,80 C320,140 720,20 1080,70 C1240,92 1360,60 1440,80 L1440,140 L0,140 Z"
          />
        </svg>

        <div className="container mx-auto px-4 md:px-8 relative z-10 pt-28 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs uppercase tracking-[0.2em] text-white font-semibold mb-6">
              Agence événementielle
            </span>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6">
              Donnez vie à vos
              <span className="block italic text-accent-glow">événements</span>
            </h1>
            <p className="text-lg md:text-xl text-white/85 max-w-xl mb-10 leading-relaxed">
              Rital Events imagine, conçoit et orchestre vos plus beaux moments —
              avec passion, élégance et précision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Nous contacter
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline-light" size="xl">
                <Link to="/services">Découvrir nos services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="container mx-auto px-4 md:px-8 py-20 md:py-28">
        <SectionTitle
          eyebrow="Nos prestations"
          title={<>Une expertise <span className="text-gradient-brand">complète</span></>}
          description="De la conception initiale à la coordination le jour J, nous prenons en charge tous les aspects de votre événement."
        />
        <ServicesGrid />
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link to="/services">Voir tous nos services <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="relative bg-primary text-primary-foreground py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-glow rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <SectionTitle
            light
            eyebrow="Pourquoi Rital Events"
            title={<>L'art de l'événement, <em className="text-accent-glow not-italic">à la française</em></>}
            description="Quatre piliers qui font la différence sur chacun de nos projets."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map((a, idx) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:-translate-y-1 transition-spring"
                >
                  <div className="h-14 w-14 mx-auto rounded-2xl bg-gradient-accent flex items-center justify-center mb-4 shadow-glow">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-display text-xl mb-2">{a.title}</h3>
                  <p className="text-sm text-white/75 leading-relaxed">{a.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="container mx-auto px-4 md:px-8 py-20 md:py-28">
        <SectionTitle
          eyebrow="Réalisations"
          title={<>Des moments <span className="text-gradient-brand">inoubliables</span></>}
          description="Un aperçu des univers que nous avons eu le plaisir de créer pour nos clients."
        />
        <GalleryGrid />
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link to="/realisations">Toutes nos réalisations <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-8 pb-20">
        <div className="relative bg-gradient-brand rounded-[2.5rem] overflow-hidden p-10 md:p-16 text-center shadow-elegant">
          <div className="absolute inset-0 opacity-20" aria-hidden="true">
            <svg viewBox="0 0 800 400" className="w-full h-full">
              <path d="M0,200 C200,50 400,350 600,150 C700,80 750,180 800,150" stroke="white" strokeWidth="2" fill="none" />
              <path d="M0,250 C200,400 500,80 800,250" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-5xl text-white mb-4">
              Prêt à donner vie à votre projet ?
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
              Parlons de votre événement. Devis gratuit et sans engagement.
            </p>
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">Demander un devis <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
