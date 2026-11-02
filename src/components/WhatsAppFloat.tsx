import { MessageCircle } from "lucide-react";
import { wa } from "@/data/catalogue";
export function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={wa("Bonjour Rital Events, je souhaite obtenir des informations pour mon événement.")}
      aria-label="Contacter Rital Events sur WhatsApp"
      title="Discuter sur WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={23} />
    </a>
  );
}
