import { createFileRoute } from '@tanstack/react-router';
import { About } from '@/components/Experience';
export const Route=createFileRoute("/_site/a-propos")({head:()=>({meta:[{title:"À propos — Rital Events"}]}),component:About});
