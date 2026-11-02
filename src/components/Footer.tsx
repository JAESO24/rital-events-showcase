import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Logo asLink={false} />
            <p>
              Location de matériel et accompagnement événementiel. Des détails qui font de belles
              réceptions.
            </p>
          </div>
          <div>
            <h3>Explorer</h3>
            <ul>
              <li>
                <Link to="/services">Nos prestations</Link>
              </li>
              <li>
                <Link to="/catalogue">Catalogue & tarifs</Link>
              </li>
              <li>
                <Link to="/realisations">Inspirations en images</Link>
              </li>
              <li>
                <Link to="/a-propos">À propos de Rital Events</Link>
              </li>
              <li>
                <Link to="/contact">Préparer un devis</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Restons en contact</h3>
            <ul>
              <li>
                Riviera Palmeraie, non loin du complexe
                <br />
                Abidjan, Côte d’Ivoire
              </li>
              <li>
                <a href="tel:+2250779937563">+225 07 79 93 75 63</a>
                <br />
                <a href="tel:+2250797900238">+225 07 97 90 02 38</a>
              </li>
              <li>
                <a href="mailto:ritapokou12@gmail.com">ritapokou12@gmail.com</a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/people/Rital-Events/100064047724671/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Retrouvez-nous sur Facebook ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Rital Events · Tous droits réservés.</span>
          <a href="/Catalogue-Rital-Events-Premium-2026.pdf" download>
            Catalogue Premium 2026 · Télécharger le PDF ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
