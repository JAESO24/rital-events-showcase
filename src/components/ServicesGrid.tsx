import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Truck,
  Boxes,
  CalendarCheck,
  Heart,
  Armchair,
  Utensils,
  Package,
  Tent,
  Paintbrush,
  Flower2,
  type LucideIcon,
} from "lucide-react";
import cateringImg from "@/assets/service-catering.jpg";

import orgImg from "@/assets/Organisation-Evénement.jpg";
import weddingImg from "@/assets/WeddindDay.jpg";
import chaisesImg from "@/assets/Chaises_et_housses.jpg";
import vaisselleImg from "@/assets/Location-Vaisselle.jpg";
import materielImg from "@/assets/Location-Matériel.jpg";
import bachesImg from "@/assets/Bâches.jpg";
import camionImg from "@/assets/Location-Camion.jpg";
import decoImg from "@/assets/Décoration-Intérieur.jpg";
import fleursImg from "@/assets/Fleurs.jpg";
import logistiqueImg from "@/assets/Logistique.jpg";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
}

const SERVICES: Service[] = [
  {
    icon: CalendarCheck,
    title: "Organisation d'événement",
    description:
      "Conception et coordination d'événements sur-mesure : mariages, galas, anniversaires, séminaires.",
    image: orgImg,
  },
  {
    icon: Heart,
    title: "Wedding Planner",
    description:
      "Planification complète de votre mariage, du moindre détail à la grande cérémonie, pour un jour inoubliable.",
    image: weddingImg,
  },
  {
    icon: Armchair,
    title: "Chaises et housses",
    description:
      "Large sélection de chaises élégantes et housses assorties pour habiller vos espaces avec raffinement.",
    image: chaisesImg,
  },
  {
    icon: UtensilsCrossed,
    title: "Services traiteurs",
    description:
      "Une cuisine raffinée et adaptée à chaque occasion, élaborée par nos chefs avec des produits d'exception.",
    image: cateringImg,
  },
  {
    icon: Utensils,
    title: "Location de vaisselles",
    description:
      "Vaisselles fines et ustensiles de qualité disponibles à la location pour tous vos événements.",
    image: vaisselleImg,
  },
  {
    icon: Package,
    title: "Location de matériel événementiel",
    description:
      "Tout le matériel nécessaire à la réussite de votre événement, disponible à la location.",
    image: materielImg,
  },
  {
    icon: Tent,
    title: "Bâches et chapitaux",
    description:
      "Tentes, bâches et structures couvertes pour protéger et sublimer vos espaces extérieurs.",
    image: bachesImg,
  },
  {
    icon: Truck,
    title: "Location de camion",
    description:
      "Camions réfrigérés et utilitaires disponibles pour vos transports événementiels et logistiques.",
    image: camionImg,
  },
  {
    icon: Paintbrush,
    title: "Décoration d'intérieur",
    description:
      "Des aménagements intérieurs soignés et créatifs pour transformer chaque espace en écrin de beauté.",
    image: decoImg,
  },
  {
    icon: Flower2,
    title: "Vente de fleurs",
    description:
      "Des compositions florales fraîches et sur-mesure pour embellir vos cérémonies, tables et espaces événementiels.",
    image: fleursImg,
  },
  {
    icon: Boxes,
    title: "Logistique",
    description:
      "Une gestion millimétrée du matériel, du personnel et des installations, du début à la fin.",
    image: logistiqueImg,
  },
];

export function ServicesGrid({ limit }: { limit?: number }) {
  const items = limit ? SERVICES.slice(0, limit) : SERVICES;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {items.map((service, idx) => {
        const Icon = service.icon;
        return (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-elegant transition-spring hover:-translate-y-2 border border-white/10 min-h-[320px] flex flex-col justify-end"
          >
            {/* Background image assombrie */}
            <div className="absolute inset-0">
              <img
                src={service.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="w-full h-full object-cover transition-spring group-hover:scale-110"
              />
              {/* Overlay sombre dégradé */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20 group-hover:from-black/90 group-hover:via-black/55 transition-smooth" />
            </div>

            {/* Contenu par-dessus */}
            <div className="relative z-10 p-6 md:p-8">
              <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4 shadow-glow group-hover:scale-110 group-hover:rotate-3 group-hover:bg-gradient-accent transition-spring">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-2xl text-white mb-2 group-hover:text-accent transition-smooth">
                {service.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-smooth">
                {service.description}
              </p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}