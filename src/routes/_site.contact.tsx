import { createFileRoute } from '@tanstack/react-router';
import { Contact } from '@/components/Experience';
export const Route=createFileRoute("/_site/contact")({head:()=>({meta:[{title:"Préparer un devis — Rital Events"}]}),component:Contact});
