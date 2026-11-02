import { createFileRoute } from '@tanstack/react-router';
import { Services } from '@/components/Experience';
export const Route=createFileRoute("/_site/services")({head:()=>({meta:[{title:"Prestations et location — Rital Events"}]}),component:Services});
