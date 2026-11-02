# Rital Events — version locale Premium 2026

Double-cliquer sur **Rital Events - Local** sur le bureau, ou sur **Lancer-Rital-Events.cmd** dans ce dossier.

Adresse : **http://localhost:5177**. Aucun déploiement sur un serveur.

Le catalogue Premium 2026 est téléchargeable depuis l’accueil, le catalogue, le contact et le pied de page. Le site reprend ses 64 références dans 11 familles avec leurs photos exactes, leurs variantes et leurs unités de prix. Les articles sans prix restent sur devis. Les conditions et la durée de location doivent être confirmées par Rital Events.

La nouvelle gestion des demandes dispose d’une API locale et d’un transport d’e-mails. **L’envoi réel reste à configurer :** les identifiants SMTP manquent et le domaine du service Supabase d’origine ne se résout pas lors de la vérification. Le modèle `.env.mail.example` indique les variables à renseigner localement dans `.env.local`. Aucun mot de passe ne doit être ajouté au code ou à une variable `VITE_`.

Le fonctionnement détaillé, les sources et les limites de validation sont décrits dans [MISE-A-JOUR-PREMIUM.md](MISE-A-JOUR-PREMIUM.md). Les essais du formulaire n’ont envoyé aucun vrai message.

```text
npm.cmd install
npm.cmd run dev -- --host 127.0.0.1 --port 5177 --strictPort
npm.cmd run build
npm.cmd run typecheck
node --test server/contact.test.mjs
```

Les modifications restent locales dans ce dépôt Git. Les résultats de vérification sont conservés dans `verification/premium/`.
