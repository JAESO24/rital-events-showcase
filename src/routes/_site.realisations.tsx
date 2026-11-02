import { createFileRoute } from '@tanstack/react-router';
import { Gallery } from '@/components/Experience';
export const Route=createFileRoute("/_site/realisations")({head:()=>({meta:[{title:"Inspirations et matériel — Rital Events"}]}),component:Gallery});
