import logo from "@/assets/logo.jpeg";
import { Link } from "@tanstack/react-router";
export function Logo({
  asLink = true,
  className = "",
}: {
  asLink?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const content = (
    <>
      <img src={logo} alt="Rital Events" width="86" height="64" />
      <span className="brand-text">
        L’art de recevoir
        <br />
        Abidjan · Côte d’Ivoire
      </span>
    </>
  );
  return asLink ? (
    <Link to="/" className={"brand " + className} aria-label="Rital Events — Accueil">
      {content}
    </Link>
  ) : (
    <div className={"brand " + className}>{content}</div>
  );
}
