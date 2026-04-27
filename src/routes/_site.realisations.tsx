import { createFileRoute } from "@tanstack/react-router";
import { GalleryGrid } from "@/components/GalleryGrid";

export const Route = createFileRoute("/_site/realisations")({
  head: () => ({
    meta: [
      { title: "Nos réalisations — Rital Events" },
      {
        name: "description",
        content:
          "Galerie des événements organisés par Rital Events : mariages, galas d'entreprise, anniversaires, cocktails et réceptions.",
      },
      { property: "og:title", content: "Nos réalisations — Rital Events" },
      {
        property: "og:description",
        content: "Découvrez nos plus beaux événements en images.",
      },
    ],
  }),
  component: RealisationsPage,
});

function RealisationsPage() {
  return (
    <>
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 bg-gradient-brand text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15" aria-hidden="true">
          <svg viewBox="0 0 1440 400" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,150 C400,300 900,50 1440,200" stroke="white" strokeWidth="2" fill="none" />
            <path d="M0,250 C500,100 900,350 1440,180" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-accent-glow font-semibold mb-3">
            Nos réalisations
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
            Des moments uniques, gravés dans le temps.
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 py-20">
        <GalleryGrid />
      </section>
    </>
  );
}
