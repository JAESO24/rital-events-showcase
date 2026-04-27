import { motion } from "framer-motion";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const ITEMS = [
  { src: gallery1, title: "Cérémonies en plein air", category: "Mariage" },
  { src: gallery2, title: "Galas d'entreprise", category: "Corporate" },
  { src: gallery3, title: "Anniversaires & fêtes", category: "Privé" },
  { src: gallery4, title: "Cocktails & réceptions", category: "Réception" },
];

export function GalleryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {ITEMS.map((item, idx) => (
        <motion.figure
          key={item.title}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: idx * 0.07 }}
          className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-card hover:shadow-elegant cursor-pointer"
        >
          <img
            src={item.src}
            alt={item.title}
            loading="lazy"
            width={1024}
            height={1024}
            className="absolute inset-0 w-full h-full object-cover transition-spring group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-80 group-hover:opacity-100 transition-smooth" />
          <figcaption className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-spring">
            <span className="text-xs uppercase tracking-widest text-accent-glow font-semibold">
              {item.category}
            </span>
            <h3 className="font-display text-xl md:text-2xl mt-1">{item.title}</h3>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
