# Plan d'implémentation – Statistiques de consultation eAriary

## 1. Faisabilité

**Oui, c’est faisable.** On peut suivre :

- le **nombre total de visites** de la rubrique eAriary (une visite = chargement de la page `/eariary`) ;
- le **nombre de visites par section** : Accueil, Inscription, Cas d’usage, FAQ (une “visite” de section = l’utilisateur a vu la section, par exemple après scroll ou clic dans la navigation).

Deux grandes options :

- **A. Backend dédié** : votre API enregistre chaque événement (page vue, section vue) et agrège les chiffres. Vous gardez la maîtrise des données et pouvez construire un tableau de bord admin.
- **B. Outil tiers (Google Analytics, Matomo, etc.)** : le front envoie des événements (page vue, section vue) ; les statistiques sont consultées dans l’outil. Moins de développement backend, mais dépendance au tiers.

Le plan ci‑dessous décrit l’option **A** (backend + frontend), avec une variante **B** en fin de document.

---

## 2. Périmètre fonctionnel
docker cp bfm-front-app-prod:/usr/share/nginx/html/. ./dist-from-docker/

| Élément | Description |
|--------|-------------|
| **Visite rubrique eAriary** | Comptabilisée à chaque chargement de la route `/eariary` (une fois par “session” ou selon règle choisie). |
| **Visite par section** | Comptabilisée quand l’utilisateur “voit” la section : Accueil (`#accueil`), Inscription (`#inscription`), Cas d’usage (`#use-cases`), FAQ (`#faq`). Détection par scroll (section dans le viewport) et/ou par clic sur le menu latéral. |

Règles possibles pour éviter les doublons :

- **Par session** : au plus une fois “visite eAriary” et une fois par section par session (ex. session = onglet, ou identifiant stocké en `sessionStorage`).
- **Par jour / par visiteur** : si vous avez un identifiant anonyme (cookie ou localStorage), une visite (ou une visite par section) par jour et par visiteur.

---

## 3. Architecture proposée (option A – backend dédié)

```
[Frontend Angular]
       │
       │ 1. Chargement /eariary  →  POST /api/eariary/stats { event: "page_view" }
       │ 2. Section visible       →  POST /api/eariary/stats { event: "section_view", section: "accueil"|"inscription"|"use-cases"|"faq" }
       │
       ▼
[API Backend]
       │
       ├── Enregistrement en base (table stats_eariary)
       └── (Optionnel) Endpoints admin : GET totaux, GET par section
       ▼
[Base de données]
```

---

## 4. Plan d’implémentation détaillé

### Étape 1 – Backend (API + persistance)

1. **Créer un endpoint d’envoi d’événements**  
   - **POST** `/api/eariary/stats` (ou équivalent, ex. `https://www.banky-foibe.mg/admin/wp-json/bfm/eariary/stats` si WordPress).  
   - Corps JSON proposé :  
     `{ "event": "page_view" | "section_view", "section"?: "accueil" | "inscription" | "use-cases" | "faq" }`  
   - Réponse : 200 OK (ou 201) après enregistrement.

2. **Modèle de données (exemple)**  
   - Table `eariary_stats` (ou équivalent) :  
     - `id`, `event` (page_view | section_view), `section` (nullable), `created_at`, éventuellement `session_id` ou `visitor_id` pour déduplication côté backend.

3. **Règles côté backend**  
   - Optionnel : déduplication (ex. une seule `page_view` par `session_id` par jour, une seule `section_view` par (session_id, section) par jour).  
   - Agrégation : requêtes SQL (ou équivalent) pour obtenir le total des visites et le total par section.
docker cp bfm-front-app-prod:/usr/share/nginx/html/. ./dist-from-docker/

   - Créer un service dédié (ex. `EariaryStatsService`) injectable dans le module eAriary.  
   - Méthodes :  
     - `trackPageView()` : envoie `{ event: "page_view" }`.  
     - `trackSectionView(section: string)` : envoie `{ event: "section_view", section }` avec `section` dans `["accueil","inscription","use-cases","faq"]`.  
   - Utiliser `HttpClient` pour faire un POST vers l’URL de l’API.  
   - Gestion d’erreur : ne pas bloquer l’UX en cas d’échec (log éventuel, pas d’affichage d’erreur à l’utilisateur).

2. **Déduplication côté frontend**  
   - Utiliser `sessionStorage` (ou `localStorage`) pour mémoriser :  
     - que la “visite page” a déjà été envoyée pour cette session ;  
     - quelles sections ont déjà été comptées pour cette session.  
   - Appeler `trackPageView()` une seule fois par session au chargement de la page eAriary.  
   - Appeler `trackSectionView(section)` au plus une fois par section et par session lorsque la section est “vue”.

3. **Où appeler le suivi**  
   - **Page vue** : dans le composant parent eAriary (ex. `EariaryComponent`), dans `ngOnInit()` (ou dans un guard / resolver si vous préférez centraliser).  
   - **Section vue** :  
     - **Option A** : réutiliser / étendre la logique du side-nav qui détecte déjà la section visible (scroll). Dès qu’une section devient “active” (visible), appeler `trackSectionView(sectionId)`.  
     - **Option B** : ajouter un `IntersectionObserver` sur chaque bloc de section (accueil, inscription, use-cases, faq) ; au premier passage “visible” (ex. 20–30 % dans le viewport), appeler `trackSectionView(sectionId)`.

4. **Correspondance sections ↔ IDs**  
   - Accueil → `accueil` (élément `#accueil`).  
   - Inscription → `inscription` (`#inscription`).  
   - Cas d’usage → `use-cases` (`#use-cases`).  
   - FAQ → `faq` (`#faq`).  
   Ces IDs sont déjà utilisés dans le side-nav ; les réutiliser pour les événements garantit la cohérence.

---

### Étape 3 – Tests et mise en production

1. **Tests**  
   - Vérifier que le chargement de `/eariary` envoie bien un `page_view` (une fois par session).  
   - Vérifier que le scroll (ou le clic side-nav) vers chaque section envoie un `section_view` avec le bon `section`, une fois par section par session.  
   - Vérifier que les totaux côté backend reflètent ces envois (et la déduplication si implémentée).

2. **Production**  
   - Configurer l’URL de l’API (environnement production).  
   - S’assurer que l’API et la base sont accessibles depuis le front (CORS, firewall).  
   - Documenter l’endpoint pour l’équipe (et pour un éventuel tableau de bord admin).

---

## 5. Résumé des fichiers à créer / modifier

| Fichier / composant | Action |
|---------------------|--------|
| **Backend** | Nouvel endpoint POST `/api/eariary/stats`, table de persistance, optionnel GET summary. |
| **Frontend** | Nouveau service `EariaryStatsService` (appels HTTP + déduplication sessionStorage). |
| **EariaryComponent** | Dans `ngOnInit()`, appeler `EariaryStatsService.trackPageView()` (avec déduplication). |
| **Détection de section** | Étendre le side-nav ou ajouter un IntersectionObserver sur les sections pour appeler `trackSectionView(section)`. |
| **Module eAriary** | Importer `HttpClientModule` (si pas déjà fait) et déclarer `EariaryStatsService`. |

---

## 6. Option B – Google Analytics / Matomo (sans backend dédié)

Si vous ne souhaitez pas développer d’API dédiée :

1. Intégrer Google Analytics 4 (ou Matomo) dans l’application Angular (script + identifiant).
2. Au chargement de la page eAriary : envoyer un événement personnalisé (ex. `eariary_page_view`).
3. Lorsqu’une section est vue : envoyer un événement (ex. `eariary_section_view`) avec un paramètre `section` = `accueil` | `inscription` | `use-cases` | `faq`.
4. Consulter les statistiques dans le tableau de bord GA4/Matomo (nombre d’événements, répartition par `section`).

Avantage : pas de backend à maintenir. Inconvénient : données hébergées chez le tiers et format des rapports imposé par l’outil.

---

## 7. Recommandation

- **Court terme / rapidité** : Option B (GA4 ou Matomo) pour avoir très vite des chiffres de consultation et par section.  
- **Long terme / maîtrise des données** : Option A (backend dédié) avec le plan des étapes 1 à 3, et éventuellement un petit tableau de bord admin (totaux + par section) consommant l’endpoint GET summary.

Les deux options sont **faisables** ; le choix dépend de votre contrainte backend et de qui doit consulter les statistiques (équipe interne vs outil tiers).

---

## 8. Implémentation réalisée (Option B – Google Analytics)

L’option B a été mise en place avec **Google Analytics** (gtag) :

- **Service** `EariaryStatsService` (`src/app/components/eariary/eariary-stats.service.ts`) :
  - `trackPageView()` : envoie l’événement `eariary_page_view` (une fois par session).
  - `trackSectionView(sectionId)` : envoie l’événement `eariary_section_view` avec le paramètre `section` = `accueil` | `inscription` | `use-cases` | `faq` (une fois par section par session).
  - Déduplication via `sessionStorage`.

- **Rubrique eAriary** : au chargement de la page (`EariaryComponent.ngOnInit`), appel de `trackPageView()`.

- **Sections** : dans le side-nav, à chaque changement de section détecté au scroll, appel de `trackSectionView(sections[i].id)`.

Dans Google Analytics (UA ou GA4), consulter **Événements** pour :
- **eariary_page_view** → nombre de visites de la rubrique eAriary ;
- **eariary_section_view** → répartition par section (paramètre / libellé : `accueil`, `inscription`, `use-cases`, `faq`).

Pour GA4 : ajouter dans `index.html` un second `gtag('config', 'G-VOTRE_ID_GA4');` si vous utilisez une propriété GA4 en plus de l’UA existante.
