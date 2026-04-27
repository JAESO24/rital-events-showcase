import { MessageCircle } from "lucide-react";

const PHONE = "2250779937563"; // sans le +
const MESSAGE = encodeURIComponent("Bonjour Rital Events, je souhaite obtenir plus d'informations.");

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactez-nous sur WhatsApp"
      className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-elegant hover:scale-110 transition-spring animate-pulse-glow"
    >
      <MessageCircle className="h-6 w-6" fill="currentColor" />
    </a>
  );
}
