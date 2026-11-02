import collection from "./premium.json";
export const money = (n: number) => new Intl.NumberFormat("fr-FR").format(n) + " F CFA";
export const phone = "2250779937563";
export const wa = (text: string) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
export const pdfUrl = "/Catalogue-Rital-Events-Premium-2026.pdf";
export const collections = collection;
export const imageUrl = (id: number, thumb = false) =>
  `/premium/RE-${String(id).padStart(3, "0")}${thumb ? "-thumb" : ""}.webp`;
export type Product = {
  id: string;
  reference: string;
  name: string;
  category: string;
  price: number;
  quoted: boolean;
  image: number;
  unit: string;
  fromPrice: boolean;
  description: string;
  page: number;
  variant: string;
};
export const products: Product[] = collections.flatMap((c) =>
  c.options.map((o, i) => ({
    id: `${c.reference}-${i + 1}`,
    reference: c.reference,
    name: c.title + (c.options.length > 1 ? ` — ${o.label}` : ""),
    category: c.category,
    price: o.price ?? 0,
    quoted: o.price === null,
    image: c.id,
    unit: c.unit,
    fromPrice: c.fromPrice,
    description: c.description,
    page: c.page,
    variant: o.label,
  })),
);
export const priceText = (p: Product) =>
  p.quoted ? "Sur devis" : `${p.fromPrice ? "À partir de " : ""}${money(p.price)} / ${p.unit}`;
export const onRequest: never[] = [];
