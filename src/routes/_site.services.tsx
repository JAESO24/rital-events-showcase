import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_site/services")({
  head: () => ({
    meta: [
      { title: "Nos services — Rital Events" },
      {
        name: "description",
        content:
          "Découvrez tous les services de Rital Events : organisation d'événements, wedding planner, chaises et housses, traiteur, location de vaisselles, matériel événementiel, bâches, camion, décoration d'intérieur et vente de fleurs.",
      },
      { property: "og:title", content: "Nos services — Rital Events" },
      {
        property: "og:description",
        content:
          "Wedding planner, traiteur, décoration, fleurs, location de matériel : une offre complète pour orchestrer vos plus beaux événements.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      {/* HEADER */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 bg-gradient-brand text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15" aria-hidden="true">
          <svg viewBox="0 0 1440 400" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,200 C400,50 800,350 1440,150" stroke="white" strokeWidth="2" fill="none" />
            <path d="M0,300 C500,150 900,400 1440,250" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-accent-glow font-semibold mb-3">
            Nos prestations
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
            Une offre complète, pensée pour vos plus beaux moments.
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 py-20">
        <ServicesGrid />
      </section>

      <section className="container mx-auto px-4 md:px-8 pb-20">
        <div className="bg-secondary rounded-[2rem] p-10 md:p-14 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-4">
            Un projet en tête ?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Discutons de vos besoins et construisons ensemble un événement à la hauteur de vos attentes.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Nous contacter <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
}