import logo from "@/assets/logo.jpeg";
import { Link } from "@tanstack/react-router";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
}

export function Logo({ className = "", size = "md", asLink = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-10",
    md: "h-12",
    lg: "h-16",
  };

  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={logo}
        alt="Rital Events"
        className={`${sizeClasses[size]} w-auto object-contain`}
        width={120}
        height={80}
      />
    </div>
  );

  if (asLink) {
    return (
      <Link to="/" className="transition-smooth hover:opacity-90">
        {content}
      </Link>
    );
  }
  return content;
}
