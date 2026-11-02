import { createFileRoute } from '@tanstack/react-router';
import { Home } from '@/components/Experience';
export const Route=createFileRoute("/_site/")({head:()=>({meta:[{title:"Rital Events — L’art de recevoir à Abidjan"}]}),component:Home});
