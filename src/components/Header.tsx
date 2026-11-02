import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useSelection, selectedLines } from "./Experience";
const links = [
  ["/", "Accueil"],
  ["/services", "Prestations"],
  ["/catalogue", "Catalogue"],
  ["/realisations", "Inspirations"],
  ["/a-propos", "À propos"],
] as const;
export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { basket } = useSelection();
  const count = selectedLines(basket).length;
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <>
      <a href="#main-content" className="skip-link">
        Aller au contenu
      </a>
      <header className="site-header">
        <div className="wrap header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Navigation principale">
            {links.map(([to, label]) => (
              <Link key={to} to={to} activeOptions={{ exact: true }}>
                {label}
                {to === "/catalogue" && count > 0 ? ` (${count})` : ""}
              </Link>
            ))}
          </nav>
          <Link className="button header-cta" to="/contact">
            Demander un devis <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav id="mobile-menu" className="mobile-nav" aria-label="Navigation mobile">
            {links.map(([to, label]) => (
              <Link key={to} to={to} activeOptions={{ exact: true }}>
                {label}
              </Link>
            ))}
            <Link to="/contact">Contact</Link>
          </nav>
        )}
      </header>
    </>
  );
}
