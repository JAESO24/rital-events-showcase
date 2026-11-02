import { Outlet, Link, createRootRoute, HeadContent } from "@tanstack/react-router";
export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />
      <Outlet />
    </>
  ),
  notFoundComponent: () => (
    <main className="not-found">
      <p>404 — Page introuvable</p>
      <h1>Reprenons le bon chemin.</h1>
      <Link className="button" to="/">
        Retour à l’accueil
      </Link>
    </main>
  ),
});
