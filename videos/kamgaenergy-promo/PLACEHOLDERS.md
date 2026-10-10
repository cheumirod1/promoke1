# Éléments provisoires — à remplacer avant diffusion

Ce film est **complet et rendu**, mais six éléments sont des substituts assumés. Aucun
n'est présenté comme authentique. Les remplacer est une substitution mécanique : la
structure, le montage et les durées ne bougent pas.

## 1. Le bloc de marque (plans 1 et 8) — SUBSTITUT TYPOGRAPHIQUE

Le logo officiel n'a pas pu être déposé sur le disque de la session. Le film affiche donc
un bloc typographique « KAMGA | ENERGY » reprenant la structure de votre logo (cartouche
noir + mot vert), **sans reproduire la marque figurative** (le soleil porté par deux mains).
Je n'ai pas redessiné votre logo : c'est votre fichier qui doit y aller.

Le disque solaire animé des plans 1 et 8 est une création originale inspirée du motif
solaire, pas une copie du logo.

> **Remplacement :** déposer le logo (PNG détouré ou SVG) et il se substitue aux deux blocs,
> intégré à son ratio natif.

## 2. Les trois interfaces (plans 4, 5, 6) — MAQUETTES REPRÉSENTATIVES

La capture réelle de `assistant.html`, `pompe.html` et `chauffe-eau.html` a échoué : le
domaine `www.kamgaenergy.com` est refusé par la politique réseau de l'environnement
(`capture/BLOCKED.md`, `ERR_TUNNEL_CONNECTION_FAILED`).

Conformément à votre brief — *« Sinon, utiliser des maquettes clairement représentatives,
sans les présenter comme des captures authentiques »* — les écrans sont traités en
**schéma stylisé**, volontairement graphiques et non photoréalistes. Ils ne peuvent pas
être pris pour des captures.

Les champs affichés proviennent **exclusivement** de l'inventaire de votre section 4 :

| Plan | Champs montrés | Résultats évoqués |
| --- | --- | --- |
| 4 — Devis | Appareils à alimenter, consommation journalière, autonomie, puissance de pointe, usage jour/nuit | Panneaux, onduleur, batteries, régulateur, câblage + « Estimation du projet » |
| 5 — Pompe | Profondeur du forage, hauteur de refoulement, distance de conduite, volume journalier | Hauteur manométrique totale, débit recherché, caractéristiques de pompe, configuration solaire |
| 6 — Chauffe-eau | Besoins en eau chaude, nombre d'utilisateurs, conditions d'utilisation | Principe captation → ballon → distribution |

**Aucune valeur chiffrée n'apparaît nulle part.** Les zones de résultat sont rendues en
barres abstraites et en étiquettes de catégories. Aucun prix, aucun débit, aucune
puissance, aucun délai, aucun pourcentage.

> **Remplacement :** autoriser `www.kamgaenergy.com` dans le réseau de l'environnement, ou
> fournir des captures PNG. Les écrans réels prendront la place des maquettes.

## 3. Les images de terrain (plans 2 et 7) — DESSIN AU TRAIT

Vos photos n'ont pas pu être déposées sur le disque. Les plans 2 et 7 utilisent donc un
dessin au trait original (devanture, modules photovoltaïques) cohérent avec le registre
graphique du film. Ce n'est pas un pis-aller visuel — le trait est le langage du film —
mais une photo réelle donnerait plus de chair au plan 2.

Le contenu textuel du plan 2, lui, est **authentique** : « INSTALLATION & VENTE » et
« Une énergie propre, durable et accessible à tous » sont repris de votre enseigne.

## 4. Le pays — ARBITRAGE EN ATTENTE

Votre enseigne porte « Fournir l'énergie d'un **Niger** Prospère ». Votre brief décrit une
entreprise **camerounaise**. Le film a été monté **sans mention de pays** : c'est la seule
option qui ne prend pas le risque d'une erreur. La ligne de signature dit simplement
« Préparez votre projet solaire dès maintenant ».

> **Décision requise** avant toute mention géographique.

## 5. Les coordonnées (plan 8)

Seul `www.kamgaenergy.com` est affiché — l'adresse que vous m'avez transmise, donc fiable.
Téléphone et WhatsApp ne sont pas affichés faute d'information.

## 6. L'audio — ABSENT PAR DÉCISION

Film muet, piloté par le texte à l'écran, à votre demande. Le script voix off complet est
écrit et vérifié en cadence (`SCRIPT.md`) ; la timeline peut recevoir voix et musique sans
remontage. Les API vocales Google sont joignables depuis cet environnement
(`scripts/tts-google.mjs` est prêt) ; ElevenLabs, OpenAI et HeyGen sont bloqués.
