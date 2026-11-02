import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { PageMotion } from "@/components/PageMotion";
import { SelectionProvider } from "@/components/Experience";
export const Route = createFileRoute("/_site")({
  component: () => (
    <SelectionProvider>
      <Header />
      <PageMotion />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </SelectionProvider>
  ),
});
