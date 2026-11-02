import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import photos from "@/data/photos.json";
import { CatalogueDownload } from "./PremiumCatalogue";
export { PremiumCatalogue as Catalogue } from "./PremiumCatalogue";
export { PremiumContact as Contact } from "./PremiumContact";
import { products, money, wa, imageUrl } from "@/data/catalogue";
import cateringImg from "@/assets/service-catering.jpg";
import truckImg from "@/assets/Location-Camion.jpg";
import flowersImg from "@/assets/Fleurs.jpg";

type Basket = Record<string, number>;
const Cart = createContext<{ basket: Basket; setQuantity: (id: string, n: number) => void }>({
  basket: {},
  setQuantity: () => {},
});
export function SelectionProvider({ children }: { children: ReactNode }) {
  const [basket, setBasket] = useState<Basket>({});
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem("rital-selection-premium-v2") || "{}");
      if (v && typeof v === "object" && !Array.isArray(v)) {
        const clean: Basket = {};
        for (const p of products) {
          if (Number.isInteger(v[p.id]) && v[p.id] > 0 && v[p.id] <= 10000) clean[p.id] = v[p.id];
        }
        setBasket(clean);
      }
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem("rital-selection-premium-v2", JSON.stringify(basket));
      } catch {}
  }, [basket, ready]);
  const setQuantity = (id: string, n: number) =>
    setBasket((prev) => {
      const next = { ...prev };
      const q = Math.min(10000, Math.max(0, Math.floor(n) || 0));
      if (q) next[id] = q;
      else delete next[id];
      return next;
    });
  return <Cart.Provider value={{ basket, setQuantity }}>{children}</Cart.Provider>;
}
export const useSelection = () => useContext(Cart);
export const selectedLines = (basket: Basket) =>
  products.filter((p) => basket[p.id] > 0).map((p) => ({ ...p, quantity: basket[p.id] }));
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro">
      <div className="wrap">
        <Eyebrow>{label}</Eyebrow>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
export function Cta() {
  return (
    <section className="wrap cta-band">
      <div>
        <Eyebrow>Et si on préparait votre événement ?</Eyebrow>
        <h2>
          Vous imaginez.
          <br />
          <em>Nous vous accompagnons.</em>
        </h2>
      </div>
      <div>
        <p>
          Une réception intime ou une grande célébration : commençons par vos envies, votre date et
          votre nombre d’invités.
        </p>
        <Link className="button cream" to="/contact">
          Parlons de votre projet <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
const services = [
  {
    n: "01",
    title: "Location de mobilier",
    text: "Chaises de réception, tables rondes ou rectangulaires, fauteuils de cérémonie et salon des mariés.",
    image: 11,
    items: ["Chaises et housses", "Tables et mobilier de cocktail", "Fauteuils de cérémonie"],
  },
  {
    n: "02",
    title: "L’art de recevoir",
    text: "Composez une table harmonieuse avec de la vaisselle, de la verrerie, des couverts et du linge de table.",
    image: 35,
    items: ["Assiettes et couverts", "Verres et accessoires", "Nappes et serviettes"],
  },
  {
    n: "03",
    title: "Tentes et réception",
    text: "Préparez votre espace extérieur avec des bâches, chapiteaux et Gardens aux dimensions de votre projet.",
    image: 2,
    items: ["Bâches 8 × 6 m et 5 × 3 m", "Chapiteaux", "Gardens simples et transparents"],
  },
  {
    n: "04",
    title: "Buffet et service",
    text: "Chafing dishes, plateaux, seaux à champagne et accessoires pour organiser le service de votre réception.",
    image: 41,
    items: ["Maintien au chaud", "Présentation et service", "Rafraîchissement des boissons"],
  },
  {
    n: "05",
    title: "Décoration et ambiance",
    text: "Échangeons sur vos couleurs, vos centres de table et la mise en scène de vos espaces de cérémonie.",
    image: 13,
    items: ["Décoration de table", "Mobilier décoratif", "Accessoires de réception"],
  },
  {
    n: "06",
    title: "Organisation sur mesure",
    text: "Mariage, anniversaire ou rendez-vous professionnel : précisez les prestations à coordonner et les contraintes du lieu.",
    image: 54,
    items: [
      "Préparation de votre événement",
      "Coordination à définir ensemble",
      "Sonorisation et ventilation sur devis",
    ],
  },
  {
    n: "07",
    title: "Service traiteur",
    text: "Cocktail, buffet ou repas de réception : partagez le format souhaité et le nombre de convives pour étudier une proposition.",
    image: cateringImg,
    items: ["Menus et formule à définir", "Nombre de convives à préciser", "Proposition sur devis"],
  },
  {
    n: "08",
    title: "Transport et logistique",
    text: "Location de camion et besoins logistiques : précisez le trajet, le volume et les horaires pour organiser votre prestation.",
    image: truckImg,
    items: [
      "Besoins de transport à étudier",
      "Retrait et retour à organiser",
      "Livraison et installation à confirmer",
    ],
  },
  {
    n: "09",
    title: "Fleurs et décoration intérieure",
    text: "Composez une ambiance autour de vos couleurs, de vos espaces et de vos envies de décoration florale.",
    image: flowersImg,
    items: [
      "Décoration florale sur demande",
      "Aménagement des espaces",
      "Choix des couleurs et du style",
    ],
  },
];
export function ServiceCards({ preview = false }: { preview?: boolean }) {
  return (
    <div className="service-grid">
      {services.slice(0, preview ? 3 : services.length).map((s) => (
        <article className="service-card" key={s.n}>
          <Link to="/catalogue" className="service-photo">
            <img
              src={typeof s.image === "number" ? imageUrl(s.image, true) : s.image}
              alt={s.title + " — visuel du catalogue Rital Events"}
              loading="lazy"
              decoding="async"
            />
            <span className="photo-number">{s.n}</span>
            <ArrowUpRight size={22} />
          </Link>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          {!preview && (
            <ul>
              {s.items.map((x) => (
                <li key={x}>
                  <Check size={14} />
                  {x}
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}
export function Process() {
  return (
    <section className="process wrap">
      <div>
        <Eyebrow>Simple, du début à la fête</Eyebrow>
        <h2>
          Votre événement,
          <br />
          <em>en quatre temps.</em>
        </h2>
        <p>Une préparation claire pour choisir le bon matériel et avancer sereinement.</p>
      </div>
      <ol>
        {[
          [
            "Racontez-nous votre projet",
            "Date, lieu, type d’événement et nombre d’invités : partagez l’essentiel.",
          ],
          [
            "Composez votre sélection",
            "Repérez les articles, les modèles et les quantités dans le catalogue.",
          ],
          [
            "Validez votre devis",
            "Nous confirmons les disponibilités, les prestations et les conditions de location.",
          ],
          [
            "Préparez le jour J",
            "Convenez avec l’équipe des modalités de retrait ou de livraison et de retour.",
          ],
        ].map(([t, d], i) => (
          <li key={t}>
            <span>0{i + 1}</span>
            <div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
export function Faq() {
  return (
    <section className="wrap faq">
      <div>
        <Eyebrow>Vos questions</Eyebrow>
        <h2>
          Avant de
          <br />
          <em>se lancer.</em>
        </h2>
      </div>
      <div>
        {[
          [
            "Les prix correspondent à quelle durée ?",
            "Le catalogue Premium indique des prix à l’unité, au mètre ou au m² selon la référence. La durée de location et les conditions sont à confirmer dans le devis.",
          ],
          [
            "Puis-je louer seulement quelques articles ?",
            "Préparez une sélection avec les quantités souhaitées. L’équipe vous confirmera les disponibilités et les conditions applicables.",
          ],
          [
            "Les quantités donnent-elles droit à une réduction ?",
            "Une réduction éventuelle est étudiée avec l’équipe selon votre sélection. Elle n’est pas appliquée automatiquement au sous-total indicatif.",
          ],
          [
            "La livraison et l’installation sont-elles comprises ?",
            "Le document ne précise pas ces frais. Indiquez le lieu et les prestations attendues afin de les faire confirmer dans le devis.",
          ],
          [
            "Quelles sont les conditions en cas de casse ou de perte ?",
            "Le catalogue Premium ne précise pas les montants de casse ou de perte. Demandez les modalités applicables avant de valider votre location.",
          ],
          [
            "Ma sélection est-elle une réservation ?",
            "Non. La sélection sert à préparer une demande. Seule une confirmation de l’équipe peut valider les articles, la date, le prix final et les conditions.",
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <Plus size={17} />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <Eyebrow>Rital Events · Abidjan</Eyebrow>
          <h1>
            L’élégance
            <br />
            se cache dans
            <br />
            <em>les détails.</em>
          </h1>
          <p>
            Du mobilier à l’art de la table, donnez du caractère à vos réceptions. Location de
            matériel et accompagnement événementiel à Riviera Palmeraie.
          </p>
          <div className="hero-actions">
            <Link to="/catalogue" className="button">
              Explorer le catalogue <ArrowUpRight size={18} />
            </Link>
            <Link to="/contact" className="text-link">
              Préparer mon événement <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-note">
            <span className="tiny-dot" /> Mariages · Réceptions privées · Événements professionnels
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="/catalogue/reception.webp"
            alt="Décoration de réception : tables dorées, fleurs blanches et vaisselle, extrait du catalogue Rital Events"
            fetchPriority="high"
          />
          <div className="hero-caption">
            <span>Le sens du détail</span>
            <p>
              De belles tables.
              <br />
              De précieux souvenirs.
            </p>
            <a href="/realisations" aria-label="Voir les inspirations du catalogue">
              <ArrowUpRight />
            </a>
          </div>
          <span className="vertical-label">L’ART DE RECEVOIR — RITAL EVENTS</span>
        </div>
      </section>
      <div className="info-strip">
        <span>
          <MapPin size={17} /> Riviera Palmeraie, Abidjan
        </span>
        <span>64 références · 11 familles</span>
        <span>Tarifs en francs CFA</span>
        <a href="/Catalogue-Rital-Events-Premium-2026.pdf" download>
          Le catalogue PDF <Download size={15} />
        </a>
      </div>
      <section className="wrap section">
        <div className="section-heading">
          <div>
            <Eyebrow>Tout commence par une ambiance</Eyebrow>
            <h2>
              Vos envies.
              <br />
              <em>Notre sélection.</em>
            </h2>
          </div>
          <div>
            <p>
              Une chaise qui donne le ton, une table qui rassemble, une décoration qui vous
              ressemble. Découvrez les essentiels de votre réception.
            </p>
            <Link to="/services" className="text-link">
              Toutes les prestations <ArrowRight size={17} />
            </Link>
          </div>
        </div>
        <ServiceCards preview />
      </section>
      <section className="catalogue-teaser">
        <div className="wrap teaser-inner">
          <div className="teaser-pictures">
            <img
              src={imageUrl(32, true)}
              alt="Assiettes de présentation dorées du catalogue"
              loading="lazy"
              decoding="async"
            />
            <img
              src={imageUrl(11, true)}
              alt="Chaises dorées du catalogue"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <Eyebrow>Une réception à votre image</Eyebrow>
            <h2>
              Choisissez.
              <br />
              Associez.
              <br />
              <em>Célébrez.</em>
            </h2>
            <p>
              Retrouvez les tarifs du catalogue, ajustez vos quantités et préparez une demande
              claire, article par article.
            </p>
            <p className="price-highlight">
              Chaises de réception <strong>à partir de 100 F CFA / unité</strong>
              <small>Chaise Malaga · Selon disponibilité</small>
            </p>
            <Link className="button" to="/catalogue">
              Composer ma sélection <ShoppingBag size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="wrap section">
        <CatalogueDownload />
      </section>
      <Process />
      <section className="wrap section">
        <div className="section-heading">
          <div>
            <Eyebrow>Le catalogue en images</Eyebrow>
            <h2>
              Un aperçu de
              <br />
              <em>votre prochain décor.</em>
            </h2>
          </div>
          <Link className="text-link" to="/realisations">
            Explorer les 64 visuels <ArrowRight size={17} />
          </Link>
        </div>
        <div className="home-gallery">
          {[11, 18, 3, 35].map((id) => (
            <Link to="/realisations" key={id}>
              <img
                src={imageUrl(id, true)}
                alt={photos[id - 1].title + " — Rital Events"}
                loading="lazy"
                decoding="async"
              />
            </Link>
          ))}
        </div>
        <p className="caption">Matériel et inspirations issus du catalogue Rital Events.</p>
      </section>
      <Faq />
      <Cta />
    </>
  );
}
export function Gallery() {
  const [category, setCategory] = useState("Tout");
  const [selected, setSelected] = useState<number | null>(null);
  const close = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const shown = photos.filter((p) => category === "Tout" || p.category === category);
  const photo = selected === null ? null : photos[selected - 1];
  useEffect(() => {
    if (selected === null) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") setSelected((v) => (v === null ? null : (v % 64) + 1));
      if (e.key === "ArrowLeft") setSelected((v) => (v === null ? null : ((v + 62) % 64) + 1));
      if (e.key === "Tab") {
        const nodes = Array.from(
          document.querySelectorAll<HTMLElement>(".lightbox button,.lightbox a"),
        );
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = before;
      document.removeEventListener("keydown", handler);
      opener.current?.focus();
    };
  }, [selected !== null]);
  return (
    <>
      <PageIntro
        label="Inspirations & matériel"
        title="Tout un univers à découvrir."
        description="Parcourez les 64 visuels du catalogue Rital Events. Agrandissez une image pour découvrir le matériel, les modèles et les détails."
      />
      <section className="wrap section">
        <div className="filter-tabs">
          {["Tout", ...new Set(photos.map((p) => p.category))].map((c) => (
            <button key={c} aria-pressed={c === category} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
        <p className="caption" aria-live="polite">
          {shown.length} visuels du catalogue · Cliquez sur une image pour l’agrandir.
        </p>
        <div className="gallery-grid">
          {shown.map((p) => (
            <button
              className="gallery-item"
              key={p.id}
              onClick={(e) => {
                opener.current = e.currentTarget;
                setSelected(p.id);
              }}
              aria-label={"Agrandir : " + p.title}
            >
              <img src={imageUrl(p.id, true)} alt={p.title} loading="lazy" decoding="async" />
              <span>
                {p.title}
                <Plus size={18} />
              </span>
            </button>
          ))}
        </div>
      </section>
      {photo && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={photo.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <button
            ref={close}
            className="lightbox-close"
            aria-label="Fermer l’image"
            onClick={() => setSelected(null)}
          >
            <X />
          </button>
          <button
            className="lightbox-prev"
            aria-label="Image précédente"
            onClick={() => setSelected(((photo.id + 62) % 64) + 1)}
          >
            <ChevronLeft />
          </button>
          <figure>
            <img src={imageUrl(photo.id)} alt={photo.title} />
            <figcaption>
              {photo.id} / 64 — {photo.title}{" "}
              <a href={imageUrl(photo.id)} download>
                Télécharger le visuel
              </a>
            </figcaption>
          </figure>
          <button
            className="lightbox-next"
            aria-label="Image suivante"
            onClick={() => setSelected((photo.id % 64) + 1)}
          >
            <ChevronRight />
          </button>
        </div>
      )}
      <Cta />
    </>
  );
}
export function Services() {
  return (
    <>
      <PageIntro
        label="Nos prestations"
        title="Chaque détail a sa place."
        description="De la location de matériel à la préparation de votre réception, construisons une prestation adaptée à votre événement."
      />
      <section className="wrap section">
        <ServiceCards />
      </section>
      <Process />
      <Faq />
      <Cta />
    </>
  );
}
export function About() {
  return (
    <>
      <PageIntro
        label="La maison Rital Events"
        title="L’art de recevoir, à Abidjan."
        description="Une réception se compose de mille détails. Notre rôle : vous aider à leur donner une belle harmonie."
      />
      <section className="wrap about-story">
        <img
          src={imageUrl(13)}
          alt="Mobilier et décoration de réception du catalogue Rital Events"
          loading="lazy"
          decoding="async"
        />
        <div>
          <Eyebrow>Proches de vous, proches de vos envies</Eyebrow>
          <h2>
            Des idées,
            <br />
            du matériel,
            <br />
            <em>de l’attention.</em>
          </h2>
          <p>
            Installée à Riviera Palmeraie, non loin du complexe, Rital Events vous accompagne dans
            la préparation de vos événements et la location de matériel de réception.
          </p>
          <p>
            Chaises, tables, vaisselle, verrerie, bâches et chapiteaux : notre catalogue réunit les
            essentiels pour accueillir vos invités. Les visuels vous aident à comparer les styles et
            à partager vos préférences avec l’équipe.
          </p>
          <p>
            Du choix des articles aux modalités de mise à disposition, nous clarifions avec vous les
            besoins, les quantités et les conditions avant de confirmer une prestation.
          </p>
          <Link to="/contact" className="text-link">
            Rencontrons-nous <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="wrap principles">
        {[
          ["Écouter", "Comprendre votre événement, le lieu et les attentes de vos invités."],
          ["Composer", "Associer le matériel, les couleurs et les usages autour de vos envies."],
          ["Clarifier", "Confirmer ensemble les quantités, les disponibilités et le devis."],
        ].map(([t, d], i) => (
          <article key={t}>
            <span>0{i + 1}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </section>
      <Process />
      <Cta />
    </>
  );
}
