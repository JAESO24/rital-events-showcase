import { createFileRoute } from '@tanstack/react-router';
import { Catalogue } from '@/components/Experience';
export const Route=createFileRoute("/_site/catalogue")({head:()=>({meta:[{title:"Catalogue et tarifs en F CFA — Rital Events"}]}),component:Catalogue});
