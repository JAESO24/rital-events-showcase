import { motion } from "framer-motion";
import {
  Sparkles,
  UtensilsCrossed,
  Truck,
  Boxes,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";
import cateringImg from "@/assets/service-catering.jpg";
import truckImg from "@/assets/service-truck.jpg";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: string;
}

const SERVICES: Service[] = [
  {
    icon: Sparkles,
    title: "Événementiel",
    description:
      "Conception et coordination d'événements sur-mesure : mariages, galas, anniversaires, séminaires.",
  },
  {
    icon: UtensilsCrossed,
    title: "Service traiteur",
    description:
      "Une cuisine raffinée et adaptée à chaque occasion, élaborée par nos chefs avec des produits d'exception.",
    image: cateringImg,
  },
  {
    icon: Truck,
    title: "Location de camion",
    description:
      "Camions réfrigérés et utilitaires disponibles pour vos transports événementiels et logistiques.",
    image: truckImg,
  },
  {
    icon: Boxes,
    title: "Logistique",
    description:
      "Une gestion millimétrée du matériel, du personnel et des installations, du début à la fin.",
  },
  {
    icon: CalendarCheck,
    title: "Organisation complète",
    description:
      "De la première idée au démontage : confiez-nous l'orchestration totale de votre événement.",
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
            className="group relative bg-gradient-card rounded-3xl overflow-hidden shadow-card hover:shadow-elegant transition-spring hover:-translate-y-2 border border-border/50"
          >
            {service.image && (
              <div className="relative h-44 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover transition-spring group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              </div>
            )}
            <div className="p-6 md:p-8">
              <div className="h-14 w-14 rounded-2xl bg-gradient-accent flex items-center justify-center mb-5 shadow-glow group-hover:scale-110 group-hover:rotate-3 transition-spring">
                <Icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-display text-2xl text-primary mb-3 group-hover:text-accent transition-smooth">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
            {/* decorative blob */}
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-accent/5 rounded-full group-hover:bg-accent/10 transition-smooth" aria-hidden="true" />
          </motion.article>
        );
      })}
    </div>
  );
}
