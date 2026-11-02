# Mise à jour — Catalogue Rital Events Premium 2026

Le site reste accessible sur **http://localhost:5177**, uniquement sur cet ordinateur. Le raccourci du bureau continue de fonctionner.

## Catalogue et photos

Le document `Catalogue_Rital_Events_Premium_2026 (1).pdf` contient 42 pages, 64 références et 11 familles. Il est proposé en téléchargement sur l’accueil, la page Catalogue, la page Contact et le pied de page.

Les images sont extraites directement des blocs produits du PDF, dans l’ordre de leur position sur chaque page. Chaque fiche conserve la référence RE-001 à RE-064, son nom, sa description, sa famille, son image et la page PDF correspondante. Le zoom affiche la photo entière. La galerie utilise exactement les mêmes références et les mêmes fichiers.

Les tarifs de cette collection remplacent ceux de la première grille dans la sélection du site. Les variantes sont distinguées : formats de bâches, plancher et moquette des Gardens, modèles de glacières, etc. Le chapiteau est tarifé au m² et le tapis rouge au mètre. Les pièces non tarifées restent « Sur devis » et ne sont pas incluses dans le sous-total. La durée, les disponibilités et les frais annexes doivent être confirmés par l’équipe.

Les données sont dans `src/data/premium.json`, les images dans `public/premium/` et le PDF téléchargeable dans `public/Catalogue-Rital-Events-Premium-2026.pdf`. Le relevé des correspondances et l’empreinte du fichier source sont dans `verification/premium-source.json`.

## Fluidité

Préchargement des pages au survol, animations légères à l’entrée des sections, images WebP chargées progressivement, zoom accessible au clavier et respect de la préférence de réduction des animations. Les animations ne masquent pas la page pendant les transitions.

## Formulaire et e-mails : fonctionnement et activation

Le formulaire appelle une API locale, avec validation côté serveur, champ anti-robot, protection contre les doubles envois, état de chargement et retour d’erreur. Il conserve la sélection détaillée et les coordonnées du client.

L’ancienne version enregistrait dans la table `contacts` de Supabase. Son code de notification dépendait d’une configuration externe Lovable Cloud ; aucun transport d’e-mails autonome n’était fourni. Le nouveau traitement effectue une seule insertion et peut transmettre une notification par SMTP. L’adresse du client est placée dans « Répondre à » pour permettre une réponse depuis la messagerie de Rital Events.

**L’envoi réel n’est pas encore activé.** Les réglages SMTP sont absents. Le domaine Supabase indiqué dans l’ancienne configuration ne se résout pas lors du contrôle réseau. Il faut reconnecter ce service, ou configurer le compte d’envoi SMTP choisi. Sans connexion valide, le formulaire affiche une erreur plutôt qu’une fausse confirmation.

Un modèle de réglages est disponible dans `.env.mail.example`. Copier les variables nécessaires dans `.env.local`, renseigner les identifiants localement, puis redémarrer le site. Ne pas mettre de secret dans une variable préfixée `VITE_`. Ne pas transmettre le mot de passe habituel de la messagerie dans la conversation. Le mot de passe SMTP doit rester dans le fichier local ignoré par Git.

Lorsqu’un message est enregistré mais que l’e-mail n’est pas accepté par le serveur d’envoi, la confirmation l’indique explicitement. Une acceptation SMTP confirme la prise en charge par le serveur d’envoi ; la réception en boîte de réception doit encore être vérifiée avec un vrai compte une fois la configuration disponible.

Les essais utilisent des services simulés : aucun message réel ni aucune demande réelle n’a été transmis. Les résultats navigateur et captures sont dans `verification/premium/`. Les tests de l’API se lancent avec `node --test server/contact.test.mjs`.
