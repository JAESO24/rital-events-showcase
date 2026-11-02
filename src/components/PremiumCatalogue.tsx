import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Download,
  FileText,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  X,
  ZoomIn,
} from "lucide-react";
import { collections, products, money, imageUrl, priceText, pdfUrl } from "@/data/catalogue";
import { useSelection, selectedLines, PageIntro, Faq, Eyebrow } from "./Experience";

export function CatalogueDownload({ compact = false }: { compact?: boolean }) {
  return (
    <div className={"catalogue-download" + (compact ? " compact" : "")}>
      <img
        src="/premium/couverture.webp"
        alt="Couverture du catalogue Rital Events Premium 2026"
        loading="lazy"
        decoding="async"
      />
      <div>
        <Eyebrow>La collection complète</Eyebrow>
        <h2>
          Votre catalogue,
          <br /> <em>à garder sous la main.</em>
        </h2>
        <p>
          64 références, 11 familles et leurs variantes. Retrouvez les photos, les descriptifs et
          les tarifs dans le catalogue Premium 2026.
        </p>
        <a className="button" href={pdfUrl} download="Catalogue-Rital-Events-Premium-2026.pdf">
          Télécharger le catalogue PDF <Download size={18} />
        </a>
        <a className="text-link" href={pdfUrl} target="_blank" rel="noopener noreferrer">
          Consulter le PDF <FileText size={16} />
        </a>
      </div>
    </div>
  );
}
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function PremiumCatalogue() {
  const { basket, setQuantity } = useSelection();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tout");
  const [sort, setSort] = useState("default");
  const [variants, setVariants] = useState<Record<number, number>>({});
  const [zoom, setZoom] = useState<(typeof collections)[number] | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const lines = selectedLines(basket);
  const total = lines.reduce((n, p) => n + p.price * p.quantity, 0);
  const pending = lines.filter((p) => p.quoted);
  const minimum = lines.some((p) => p.fromPrice);
  const categories = [
    "Tout",
    ...new Set([...collections].sort((a, b) => a.page - b.page).map((c) => c.category)),
  ];
  const floor = (c: (typeof collections)[number]) =>
    Math.min(...c.options.map((o) => o.price ?? Infinity));
  let shown = collections.filter(
    (c) =>
      (category === "Tout" || category === c.category) &&
      normalize(c.title + " " + c.reference + " " + c.description).includes(normalize(query)),
  );
  if (sort !== "default")
    shown = [...shown].sort((a, b) => {
      const x = floor(a),
        y = floor(b);
      if (x === Infinity) return y === Infinity ? 0 : 1;
      if (y === Infinity) return -1;
      return sort === "up" ? x - y : y - x;
    });
  return (
    <>
      <PageIntro
        label="Catalogue Premium 2026"
        title="Le bon modèle. Le bon détail."
        description="Explorez les 11 familles du catalogue. Chaque référence conserve sa photo, sa description, ses variantes et son unité de tarification."
      />
      <section className="wrap section catalogue-section">
        <CatalogueDownload compact />
        <div className="catalogue-notice">
          <p>
            <strong>Les tarifs du catalogue Premium 2026 · F CFA</strong>
            <br />
            Prix à l’unité, au mètre ou au m² selon l’article. Disponibilités, durée de location et
            frais annexes à confirmer au devis. Les pièces sans prix sont indiquées « Sur devis ».
          </p>
          <a className="text-link" href={pdfUrl} download>
            Catalogue complet <Download size={17} />
          </a>
        </div>
        <div className="catalogue-layout">
          <div>
            <div className="catalogue-toolbar">
              <label className="search">
                <Search size={18} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher un modèle ou une référence…"
                  aria-label="Rechercher un article"
                />
              </label>
              <select
                aria-label="Trier les articles"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">Ordre des références</option>
                <option value="up">Prix croissant</option>
                <option value="down">Prix décroissant</option>
              </select>
            </div>
            <div className="filter-tabs" aria-label="Familles de produits">
              {categories.map((c) => (
                <button key={c} onClick={() => setCategory(c)} aria-pressed={category === c}>
                  {c}
                </button>
              ))}
            </div>
            <div className="results-heading">
              <p aria-live="polite">
                {shown.length} référence{shown.length > 1 ? "s" : ""}
              </p>
              <p className="caption">Photos et références du PDF</p>
            </div>
            <div className="product-grid">
              {shown.map((c) => {
                const variant = variants[c.id] ?? 0;
                const p = products.find((p) => p.id === `${c.reference}-${variant + 1}`)!;
                return (
                  <article
                    className="product-card"
                    key={c.id}
                    data-reference={c.reference}
                    data-pdf-page={c.page}
                  >
                    <button
                      className="product-photo"
                      aria-label={"Agrandir : " + c.title}
                      onClick={() => {
                        setZoom(c);
                        dialog.current?.showModal();
                      }}
                    >
                      <img
                        src={imageUrl(c.id, true)}
                        alt={c.reference + " — " + c.title}
                        loading="lazy"
                        decoding="async"
                        width="440"
                        height="660"
                      />
                      <span>
                        <ZoomIn size={15} /> Voir le modèle
                      </span>
                    </button>
                    <div className="product-details">
                      <span className="product-category">
                        {c.category} · {c.reference}
                      </span>
                      <h3>{c.title}</h3>
                      <p className="product-description">{c.description}</p>
                      {c.options.length > 1 && (
                        <label className="variant-label">
                          Version
                          <select
                            aria-label={"Version : " + c.title}
                            value={variant}
                            onChange={(e) =>
                              setVariants((v) => ({ ...v, [c.id]: Number(e.target.value) }))
                            }
                          >
                            {c.options.map((o, i) => (
                              <option value={i} key={i}>
                                {o.label} — {o.price === null ? "Sur devis" : money(o.price)}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                      <p className="product-price">
                        {p.quoted ? (
                          "Sur devis"
                        ) : (
                          <>
                            {p.fromPrice && <small>À partir de </small>}
                            {money(p.price)} <small>/ {p.unit}</small>
                          </>
                        )}
                      </p>
                      <a
                        className="source-link"
                        href={`${pdfUrl}#page=${c.page}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Page {c.page} du catalogue <FileText size={12} />
                      </a>
                      {c.note && <p className="caption">{c.note}</p>}
                      <div className="quantity">
                        <button
                          aria-label={"Retirer une unité : " + p.name}
                          disabled={!basket[p.id]}
                          onClick={() => setQuantity(p.id, (basket[p.id] || 0) - 1)}
                        >
                          <Minus size={15} />
                        </button>
                        <input
                          aria-label={"Quantité : " + p.name}
                          type="number"
                          inputMode="numeric"
                          min="0"
                          max="10000"
                          value={basket[p.id] || 0}
                          onChange={(e) => setQuantity(p.id, Number(e.target.value))}
                        />
                        <button
                          aria-label={"Ajouter une unité : " + p.name}
                          onClick={() => setQuantity(p.id, (basket[p.id] || 0) + 1)}
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                      {c.unit !== "unité" && <p className="quantity-unit">Quantité en {c.unit}</p>}
                    </div>
                  </article>
                );
              })}
            </div>
            {!shown.length && (
              <div className="empty-state">
                <Search />
                <h3>Aucun modèle trouvé</h3>
                <p>Essayez un autre mot ou une autre famille.</p>
                <button
                  className="text-link"
                  onClick={() => {
                    setQuery("");
                    setCategory("Tout");
                  }}
                >
                  Réinitialiser la recherche
                </button>
              </div>
            )}
          </div>
          <aside className="basket">
            <div className="basket-title">
              <ShoppingBag size={20} />
              <h2>Ma sélection</h2>
              <span>{lines.length}</span>
            </div>
            {lines.length ? (
              <>
                <ul>
                  {lines.map((p) => (
                    <li key={p.id}>
                      <div>
                        <strong>{p.name}</strong>
                        <small>
                          {p.quantity} {p.unit} · {priceText(p)}
                        </small>
                      </div>
                      <button
                        aria-label={"Supprimer " + p.name}
                        onClick={() => setQuantity(p.id, 0)}
                      >
                        <X size={15} />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="basket-total">
                  <span>
                    {pending.length ? "Sous-total des articles tarifés" : "Total indicatif"}
                    {minimum ? " · à partir de" : ""}
                  </span>
                  <strong>{lines.some((p) => !p.quoted) ? money(total) : "Sur devis"}</strong>
                  {pending.length > 0 && (
                    <p className="caption">
                      + {pending.length} référence{pending.length > 1 ? "s" : ""} sur devis, non
                      comprise{pending.length > 1 ? "s" : ""} dans le sous-total.
                    </p>
                  )}
                </div>
                <Link to="/contact" className="button">
                  Préparer ma demande <ArrowRight size={17} />
                </Link>
                <button
                  className="clear-selection"
                  onClick={() => {
                    if (window.confirm("Vider votre sélection ?"))
                      lines.forEach((p) => setQuantity(p.id, 0));
                  }}
                >
                  Vider la sélection
                </button>
              </>
            ) : (
              <div className="basket-empty">
                <ShoppingBag size={32} />
                <p>Votre réception prend forme ici.</p>
                <small>Choisissez vos modèles, leurs variantes et les quantités.</small>
              </div>
            )}
            <p className="caption">
              Prix indicatifs, hors frais annexes éventuels. Votre sélection devient une réservation
              après confirmation de l’équipe.
            </p>
          </aside>
        </div>
      </section>
      <Faq />
      <dialog
        className="product-dialog"
        ref={dialog}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="dialog-close"
          aria-label="Fermer l’image"
          onClick={() => dialog.current?.close()}
        >
          <X />
        </button>
        {zoom && (
          <figure>
            <img src={imageUrl(zoom.id)} alt={zoom.reference + " — " + zoom.title} />
            <figcaption>
              {zoom.reference} · {zoom.title}
              <a href={`${pdfUrl}#page=${zoom.page}`} target="_blank" rel="noopener noreferrer">
                Consulter la fiche PDF
              </a>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
