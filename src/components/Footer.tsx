import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden mt-20">
      {/* Decorative wave */}
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute -top-1 left-0 right-0 w-full h-16 text-background"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,40 C240,80 480,0 720,30 C960,60 1200,20 1440,50 L1440,0 L0,0 Z"
        />
      </svg>

      <div className="container mx-auto px-4 md:px-8 pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="bg-white rounded-2xl p-3 inline-block mb-4">
              <Logo size="md" asLink={false} />
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Donnez vie à vos événements avec élégance et professionnalisme.
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg mb-4 text-accent-foreground">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-primary-foreground/75 hover:text-white transition-smooth">Accueil</Link></li>
              <li><Link to="/services" className="text-primary-foreground/75 hover:text-white transition-smooth">Services</Link></li>
              <li><Link to="/realisations" className="text-primary-foreground/75 hover:text-white transition-smooth">Réalisations</Link></li>
              <li><Link to="/a-propos" className="text-primary-foreground/75 hover:text-white transition-smooth">À propos</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/75 hover:text-white transition-smooth">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-accent-glow shrink-0" />
                <span>contact@ritalevents.fr</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-accent-glow shrink-0" />
                <span>+33 6 00 00 00 00</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-accent-glow shrink-0" />
                <span>France</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg mb-4">Suivez-nous</h3>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-accent hover:scale-110 flex items-center justify-center transition-spring"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-accent hover:scale-110 flex items-center justify-center transition-spring"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-accent hover:scale-110 flex items-center justify-center transition-spring"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Rital Events. Tous droits réservés.</p>
          <p>Conçu avec passion pour vos plus beaux moments.</p>
        </div>
      </div>
    </footer>
  );
}
