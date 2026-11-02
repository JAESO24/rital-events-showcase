import { useEffect } from "react";
import { useLocation, useRouterState } from "@tanstack/react-router";
export function PageMotion() {
  const path = useLocation({ select: (l) => l.pathname });
  const loading = useRouterState({ select: (s) => s.isLoading });
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting && !seen.has(entry.target)) {
            seen.add(entry.target);
            entry.target.animate(
              [
                { opacity: 0.45, transform: "translateY(14px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 450, easing: "cubic-bezier(.2,.65,.3,1)" },
            );
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.08 },
    );
    const watch = () =>
      document
        .querySelectorAll(
          ".section-heading,.service-card,.catalogue-download,.process li,.home-hero .hero-copy,.page-intro .wrap,.product-card,.gallery-item,.principles article",
        )
        .forEach((el) => {
          if (!seen.has(el)) observer.observe(el);
        });
    watch();
    const changes = new MutationObserver(watch);
    const main = document.getElementById("main-content");
    if (main) changes.observe(main, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      changes.disconnect();
    };
  }, [path]);
  return loading ? (
    <div className="navigation-progress" role="status" aria-label="Chargement de la page" />
  ) : null;
}
