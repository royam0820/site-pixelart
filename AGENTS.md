# 🕹️ AGENTS.md — Règles & Contexte du Projet PIXELQUEST

Ce fichier définit les règles permanentes et l'architecture que tout agent IA doit respecter lorsqu'il intervient sur **PIXELQUEST — La Légende de Maxence**.

---

## 1. Vue d'ensemble du Projet
- **Concept** : Site web personnel gamifié façon jeu d'arcade rétro en pixel-art dont **Maxence** est le héros (carte du monde interactive, 4 zones/niveaux, boss-projets, XP/badges sauvegardés dans `localStorage`, mini-jeu Canvas et synthé audio 8-bit).
- **Vocation pédagogique** : Permettre à un jeune créateur (10–14 ans) de découvrir le développement web (*Vibe Coding* ET édition manuelle du code) grâce à une base de code claire, lisible et bien commentée en français.

---

## 2. Architecture Modulaire (4 Fichiers Principaux)
Toujours respecter la séparation stricte des responsabilités entre les 4 fichiers à la racine :

1. **`index.html` — Le Squelette (Structure HTML5)**
   - Contient uniquement la structure des écrans (HUD, Accueil Borne d'Arcade, Carte du Monde, et les 4 Niveaux) ainsi que les sprites SVG inline.
   - Ne pas remettre de blocs `<style>` ou de logique `<script>` volumineux dans `index.html`.
2. **`style.css` — Le Costume & le Décor (CSS3)**
   - Variables CSS (`:root` et `body.day-mode`), animations `@keyframes`, effet CRT scanlines, curseurs pixel-art et responsive design.
3. **`user-data.js` — Le Carnet Personnel du Héros (`USER_DATA`)**
   - Contient **uniquement** les données personnalisables de Maxence (`pseudo`, `stats`, `hobbies`, `faitsFun`, `bossProjets`, `highScores`).
   - **Règle d'or pédagogique** : Garder ce fichier ultra-simple, lisible et abondamment commenté pour que Maxence puisse le modifier à la main sans risquer de casser le moteur du jeu.
4. **`script.js` — Le Cerveau & Moteur du Jeu (JS Vanilla)**
   - Gère l'état du jeu (`localStorage`), le rendu dynamique depuis `USER_DATA`, le synthétiseur Web Audio API 8-bit, le mini-jeu `<canvas>` (`Maxence Astro-Dodge`) et les Easter Eggs (Konami Code, danse pixel, coffre secret).

---

## 3. Contraintes Techniques & Sécurité (Obligatoires)
- **Zéro dépendance & Zéro serveur requis** : Le site doit fonctionner immédiatement par simple double-clic sur `index.html` en local (`file://`) ainsi que sur GitHub Pages. N'utiliser ni bundler (Webpack/Vite), ni framework externe, ni `fetch()` local qui échouerait en `file://`.
- **Zéro fichier média lourd** :
  - **Graphismes** : Uniquement du SVG pixel-art (`shape-rendering="crispEdges"`), du CSS et des emojis.
  - **Audio** : Uniquement la `Web Audio API` native (aucun fichier `.mp3` ou `.wav`). Le son doit rester désactivé par défaut (`soundEnabled = false`) jusqu'à l'action du joueur.
- **Protection de la vie privée (Mineur)** :
  - Utiliser **uniquement le prénom/pseudo (`MAXENCE`)**.
  - Ne jamais exposer de nom de famille, adresse postale, numéro de téléphone, nom d'établissement scolaire ou e-mail personnel en clair dans le code ou le dépôt public.

---

## 4. Documentation & Synchronisation (`Doc/`)
La documentation du projet est centralisée dans le dossier `Doc/` :
- `Doc/PRD.md` : Spécifications produit, barème d'XP, fonctionnalités et choix techniques.
- `Doc/EXERCICES-CODEUR.md` : 5 missions pas-à-pas pour apprendre à modifier le code à la main (sans IA).
- `Doc/ARCHITECTURE-JEU-ARCADE.md` : Explication pédagogique de l'architecture du jeu.
- `Doc/SECRETS-ET-CULTURE-RETRO.md` : Culture geek/rétro autour des Easter Eggs du site (Code Konami, 8-bit, etc.).
- `Doc/DEVLOG.md` & `Doc/PROGRESS.md` : Journal de bord et suivi d'avancement.

> **Important** : En cas de modification de la structure des fichiers ou des lignes ciblées dans `user-data.js`, `style.css` ou `script.js`, vérifier que les indications de `Doc/EXERCICES-CODEUR.md` et `Doc/PRD.md` restent exactes.

