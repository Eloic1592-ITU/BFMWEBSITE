# 📖 Guide Complet : Intégration de la Page eAriary dans le Projet Angular

Ce document explique en détail **comment la page eAriary est intégrée** dans le projet Angular. Il est rédigé pour quelqu'un qui n'est pas encore familier avec Angular, TypeScript et SCSS.

---

## Table des matières

1. [Les bases d'Angular en 2 minutes](#1-les-bases-dangular-en-2-minutes)
2. [Architecture globale de la page eAriary](#2-architecture-globale-de-la-page-eariary)
3. [Comment Angular sait afficher la page eAriary (le Routing)](#3-comment-angular-sait-afficher-la-page-eariary-le-routing)
4. [Le Module eAriary — le regroupement](#4-le-module-eariary--le-regroupement)
5. [Le Composant Parent : EariaryComponent](#5-le-composant-parent--eariarycomponent)
6. [Les 5 Composants Enfants (sections de la page)](#6-les-5-composants-enfants-sections-de-la-page)
   - 6.1 [Hero (section d'accueil)](#61-hero-section-daccueil)
   - 6.2 [Signup (formulaire d'inscription)](#62-signup-formulaire-dinscription)
   - 6.3 [Use Cases (situations d'utilisation)](#63-use-cases-situations-dutilisation)
   - 6.4 [FAQ (questions fréquentes)](#64-faq-questions-fréquentes)
   - 6.5 [Side Nav (navigation latérale)](#65-side-nav-navigation-latérale)
7. [Le SCSS (les styles)](#7-le-scss-les-styles)
8. [Le mode pleine largeur dans App](#8-le-mode-pleine-largeur-dans-app)
9. [Résumé visuel de l'architecture](#9-résumé-visuel-de-larchitecture)

---

## 1. Les bases d'Angular en 2 minutes

Avant de plonger dans le code d'eAriary, voici les **concepts fondamentaux d'Angular** que vous devez connaître :

### Qu'est-ce qu'un Composant ?

Un **composant** est la brique de base d'Angular. Chaque partie visible de la page est un composant. Un composant se compose **toujours** de 3 fichiers :

| Fichier            | Rôle                                                                                        | Analogie         |
| ------------------ | ------------------------------------------------------------------------------------------- | ---------------- |
| `*.component.ts`   | La **logique** (TypeScript) — les variables, les fonctions, ce qui se passe quand on clique | Le cerveau 🧠    |
| `*.component.html` | Le **template** (HTML) — ce qui s'affiche à l'écran                                         | Le visage 👀     |
| `*.component.scss` | Le **style** (SCSS/CSS) — les couleurs, tailles, espacements                                | Les vêtements 👔 |

**Exemple concret :** Le composant Hero de eAriary :

- `eariary-hero.component.ts` → la logique (alterner le titre FR/MG toutes les 5 secondes)
- `eariary-hero.component.html` → le HTML (les mockups de téléphone, les boutons, etc.)
- `eariary-hero.component.scss` → le style (la taille du titre, les couleurs, les animations)

### Qu'est-ce que TypeScript ?

TypeScript est une **version améliorée de JavaScript**. La différence principale : on peut déclarer le **type** des variables.

```typescript
// JavaScript classique
let nom = "Rakoto";

// TypeScript : on précise que c'est un string
let nom: string = "Rakoto";
let age: number = 25;
let estActif: boolean = true;
```

### Qu'est-ce que le SCSS ?

Le SCSS est une **version améliorée du CSS** qui ajoute :

- Des **variables** (`$color-primary: #004b4c;`)
- L'**imbrication** (nesting) : on écrit les styles parents/enfants de façon hiérarchique
- Des **fonctions** et **mixins**

Dans ce projet, on utilise aussi les **variables CSS** (notation `var(--teal)`) qui fonctionnent même en CSS classique.

### Qu'est-ce qu'un Module ?

Un **module** (`@NgModule`) est un conteneur qui regroupe des composants qui fonctionnent ensemble. C'est comme un dossier logique. Il dit à Angular : _"Voici les composants qui forment cette fonctionnalité."_

### Qu'est-ce que le Routing (routage) ?

Le **routing** c'est le système de navigation. Quand l'utilisateur tape `https://site.com/eariary`, Angular sait qu'il doit afficher le module eAriary. C'est comme un tableau de correspondance :

| URL        | → Affiche            |
| ---------- | -------------------- |
| `/`        | La page d'accueil    |
| `/faq`     | La page FAQ générale |
| `/eariary` | **La page eAriary**  |
| `/contact` | La page contact      |

---

## 2. Architecture globale de la page eAriary

La page eAriary est composée de **7 fichiers principaux** organisés dans un seul dossier :

```
src/app/components/eariary/
├── eariary.module.ts              ← Le module (regroupe tout)
├── eariary-routing.module.ts      ← Le routage interne
├── eariary.component.ts           ← Le composant parent (logique)
├── eariary.component.html         ← Le template parent (structure)
├── eariary.component.scss         ← Les styles globaux eAriary (variables CSS, boutons, etc.)
│
├── hero/                          ← Section 1 : En-tête avec mockups de téléphone
│   ├── eariary-hero.component.ts
│   ├── eariary-hero.component.html
│   └── eariary-hero.component.scss
│
├── signup/                        ← Section 2 : Formulaire d'inscription
│   ├── eariary-signup.component.ts
│   ├── eariary-signup.component.html
│   └── eariary-signup.component.scss
│
├── use-cases/                     ← Section 3 : Cas d'utilisation
│   ├── eariary-use-cases.component.ts
│   ├── eariary-use-cases.component.html
│   └── eariary-use-cases.component.scss
│
├── faq/                           ← Section 4 : Questions fréquentes
│   ├── eariary-faq.component.ts
│   ├── eariary-faq.component.html
│   └── eariary-faq.component.scss
│
└── side-nav/                      ← Section 5 : Navigation latérale fixe
    ├── eariary-side-nav.component.ts
    ├── eariary-side-nav.component.html
    └── eariary-side-nav.component.scss
```

Plus un fichier image :

```
src/assets/img/eariary/eAriary.png
```

---

## 3. Comment Angular sait afficher la page eAriary (le Routing)

### Étape 1 : Le routage principal (`app-routing.module.ts`)

Le fichier `src/app/app-routing.module.ts` contient **toutes les routes** de l'application. La route eAriary est définie comme ceci :

```typescript
{
    path: 'eariary',
    loadChildren: './components/eariary/eariary.module#EariaryModule'
}
```

**Explication ligne par ligne :**

- **`path: 'eariary'`** → Quand l'URL contient `/eariary`, active cette route
- **`loadChildren: '...'`** → Utilise le **lazy loading** (chargement paresseux)

### Qu'est-ce que le Lazy Loading ?

Le lazy loading signifie que le code de la page eAriary **n'est PAS chargé quand l'utilisateur arrive sur la page d'accueil**. Il est chargé **uniquement** quand l'utilisateur navigue vers `/eariary`.

**Avantage :** La page d'accueil se charge plus vite car elle ne contient pas le code d'eAriary.

**Sans lazy loading :**

```
Utilisateur arrive → Charge TOUT le site d'un coup (lent ❌)
```

**Avec lazy loading :**

```
Utilisateur arrive → Charge seulement la page d'accueil (rapide ✅)
Utilisateur clique sur eAriary → Charge le module eAriary à ce moment
```

### Étape 2 : Le routage interne d'eAriary (`eariary-routing.module.ts`)

```typescript
const routes: Routes = [{ path: "", component: EariaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EariaryRoutingModule {}
```

**Explication :**

- **`path: ''`** → Quand on est sur `/eariary` (sans rien après), affiche `EariaryComponent`
- **`RouterModule.forChild(routes)`** → C'est un routage "enfant" (pas le routage principal). C'est ce qui fait que c'est un module lazy-loadé.

> **💡 Différence importante :**
>
> - `RouterModule.forRoot(routes)` → utilisé UNE SEULE FOIS dans `app-routing.module.ts` (le routage principal)
> - `RouterModule.forChild(routes)` → utilisé dans chaque module lazy-loadé (ici, eAriary)

---

## 4. Le Module eAriary — le regroupement

Le fichier `eariary.module.ts` déclare **tous les composants** de la page eAriary :

```typescript
@NgModule({
  imports: [
    CommonModule, // Fournit *ngIf, *ngFor, etc.
    FormsModule, // Fournit [(ngModel)] pour les formulaires
    EariaryRoutingModule, // Le routage interne (voir section 3)
  ],
  declarations: [
    EariaryComponent, // Le composant parent
    EariaryHeroComponent, // Section Hero
    EariarySignupComponent, // Section Formulaire
    EariaryUseCasesComponent, // Section Cas d'usage
    EariaryFaqComponent, // Section FAQ
    EariarySideNavComponent, // Navigation latérale
  ],
})
export class EariaryModule {}
```

**Qu'est-ce que chaque `import` fait ?**

| Import                 | Rôle                       | Exemple d'utilisation                                          |
| ---------------------- | -------------------------- | -------------------------------------------------------------- |
| `CommonModule`         | Directives de base Angular | `*ngIf="showPopup"` pour afficher/masquer un élément           |
| `FormsModule`          | Formulaires Angular        | `[(ngModel)]="formData.nom"` pour lier un input à une variable |
| `EariaryRoutingModule` | Routes internes            | Définit que `/eariary` affiche `EariaryComponent`              |

**Qu'est-ce que `declarations` ?**

C'est la liste des **composants qui appartiennent à ce module**. Si un composant n'est pas déclaré ici, Angular ne le reconnaît pas et affichera une erreur.

---

## 5. Le Composant Parent : EariaryComponent

### Le fichier TypeScript (`eariary.component.ts`)

```typescript
import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-eariary",
  templateUrl: "./eariary.component.html",
  styleUrls: ["./eariary.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EariaryComponent {}
```

**Décortiquons le `@Component` :**

| Propriété       | Valeur                         | Signification                                                                    |
| --------------- | ------------------------------ | -------------------------------------------------------------------------------- |
| `selector`      | `'app-eariary'`                | Le nom de balise HTML pour utiliser ce composant : `<app-eariary></app-eariary>` |
| `templateUrl`   | `'./eariary.component.html'`   | Le fichier HTML à afficher                                                       |
| `styleUrls`     | `['./eariary.component.scss']` | Le fichier de styles associé                                                     |
| `encapsulation` | `ViewEncapsulation.None`       | **Important !** Les styles ne sont PAS encapsulés                                |

### ViewEncapsulation.None — Qu'est-ce que ça veut dire ?

Par défaut, Angular **isole les styles** de chaque composant. Cela signifie que si vous écrivez `.btn { color: red; }` dans un composant, ça n'affectera **que** ce composant.

Avec `ViewEncapsulation.None`, les styles du composant parent eAriary **s'appliquent globalement** à tous ses enfants. C'est pour cela que le fichier `eariary.component.scss` contient les variables CSS (`:root`), les styles de boutons (`.btn`), et les animations (`.fade-in-up`) — ils sont **partagés** avec Hero, Signup, FAQ, etc.

### Le fichier HTML (`eariary.component.html`)

```html
<app-eariary-hero></app-eariary-hero>
<app-eariary-signup></app-eariary-signup>
<app-eariary-use-cases></app-eariary-use-cases>
<app-eariary-faq></app-eariary-faq>
<app-eariary-side-nav></app-eariary-side-nav>
```

C'est très simple : le parent **assemble** les 5 sections enfants dans l'ordre d'affichage. Chaque balise (`<app-eariary-hero>`, etc.) correspond au `selector` d'un composant enfant.

**Le flux visuel de la page :**

```
┌──────────────────────┐
│    HERO (accueil)    │  ← <app-eariary-hero>
├──────────────────────┤
│    SIGNUP (form)     │  ← <app-eariary-signup>
├──────────────────────┤
│    USE CASES         │  ← <app-eariary-use-cases>
├──────────────────────┤
│    FAQ               │  ← <app-eariary-faq>
├──────────────────────┤
│ SIDE NAV (fixe à     │  ← <app-eariary-side-nav>
│ gauche de l'écran)   │
└──────────────────────┘
```

---

## 6. Les 5 Composants Enfants (sections de la page)

### 6.1 Hero (section d'accueil)

**Fichiers :** `hero/eariary-hero.component.ts`, `.html`, `.scss`

**Ce que ça affiche :** La grande section d'accueil avec le titre, la description, le bouton "Ouvrir un compte", les logos partenaires, et les **2 mockups de téléphone** (smartphone + téléphone basique).

#### La logique (`eariary-hero.component.ts`)

```typescript
export class EariaryHeroComponent implements OnInit, OnDestroy {
    private titleInterval: any;
    isFrench = true;

    frenchTitle = 'Le compte <span class="hero-highlight">le moins cher</span>...';
    malagasyTitle = 'Kaonty <span class="hero-highlight">mora indrindra</span>...';

    currentTitle: string;

    ngOnInit() {
        this.currentTitle = this.frenchTitle;
        this.titleInterval = setInterval(() => {
            this.isFrench = !this.isFrench;
            this.currentTitle = this.isFrench ? this.frenchTitle : this.malagasyTitle;
        }, 5000);
    }

    ngOnDestroy() {
        if (this.titleInterval) {
            clearInterval(this.titleInterval);
        }
    }

    scrollTo(event: Event, targetId: string) { ... }
}
```

**Explications clé :**

- **`ngOnInit()`** → Fonction appelée automatiquement quand le composant apparaît à l'écran. Ici, elle démarre un `setInterval` qui alterne le titre entre français et malagasy **toutes les 5 secondes** (5000 ms).

- **`ngOnDestroy()`** → Fonction appelée quand le composant est détruit (l'utilisateur quitte la page). Elle **arrête le timer** (`clearInterval`) pour éviter des fuites mémoire.

- **`[innerHTML]="currentTitle"`** → Dans le HTML, cette syntaxe Angular lie le contenu HTML de l'élément `<h1>` à la variable `currentTitle`. On utilise `innerHTML` au lieu de `{{ }}` car le titre contient des balises `<span>`.

- **`scrollTo()`** → Quand on clique sur le bouton "Ouvrir un compte", cette fonction fait **défiler doucement** la page vers la section inscription.

#### Le HTML (`eariary-hero.component.html`) — Points importants

```html
<!-- Liaison Angular : affiche currentTitle comme HTML -->
<h1 [innerHTML]="currentTitle"></h1>

<!-- Bouton avec événement Angular (click) -->
<a href="#inscription" class="btn btn-primary btn-lg" (click)="scrollTo($event, 'inscription')">
  <i class="fas fa-user-plus"></i>
  Ouvrir un compte
</a>
```

**Syntaxe Angular dans le HTML :**
| Syntaxe | Signification | Exemple |
|---------|---------------|---------|
| `[propriété]="variable"` | **Liaison de propriété** : envoie la valeur d'une variable TS vers le HTML | `[innerHTML]="currentTitle"` |
| `(événement)="fonction()"` | **Liaison d'événement** : appelle une fonction TS quand l'événement se produit | `(click)="scrollTo(...)"` |
| `{{ variable }}` | **Interpolation** : affiche la valeur d'une variable en texte brut | `{{ section.label }}` |

---

### 6.2 Signup (formulaire d'inscription)

**Fichiers :** `signup/eariary-signup.component.ts`, `.html`, `.scss`

**Ce que ça affiche :** Un formulaire d'inscription avec les champs nom, prénom, date de naissance, lieu de résidence, email, téléphone, et type de compte. Le formulaire est **bilingue** (français/malagasy).

#### La logique (`eariary-signup.component.ts`)

```typescript
export class EariarySignupComponent implements OnInit {
    currentLang = 'fr';          // Langue active
    showSuccessPopup = false;    // Popup de succès visible ou non

    formData = {                 // Données du formulaire
        nom: '', prenom: '', dob: '', lieu: '',
        email: '', telephone: '', type: ''
    };

    formErrors: { [key: string]: string } = {};  // Erreurs de validation
```

**Points clés :**

- **`currentLang = 'fr'`** → Par défaut, le formulaire est en français. L'utilisateur peut basculer en malagasy.

- **`getText(fr, mg)`** → Fonction qui retourne le texte français ou malagasy selon `currentLang`.

  ```typescript
  getText(fr: string, mg: string): string {
      return this.currentLang === 'fr' ? fr : mg;
  }
  ```

  Utilisé dans le HTML ainsi :

  ```html
  <label>{{ getText('Nom', 'Anaram-pianakaviana') }}</label>
  ```

- **`[(ngModel)]="formData.nom"`** → C'est le **two-way binding** (liaison bidirectionnelle). Ça signifie :
  - Quand l'utilisateur tape qqch dans le champ → `formData.nom` se met à jour automatiquement
  - Si on modifie `formData.nom` en TypeScript → le champ se met à jour aussi

  > **💡 C'est pour ça qu'on a importé `FormsModule` dans le module.** Sans ce module, `[(ngModel)]` ne fonctionne pas.

- **`onSubmit()`** → Quand l'utilisateur clique sur "Soumettre" :
  1. Vérifie les champs obligatoires
  2. Vérifie le format email
  3. Vérifie le numéro de téléphone (préfixes malgaches : 032, 033, 034, 037, 038)
  4. Si tout est valide → affiche le popup de succès

- **`*ngIf="formErrors['nom']"`** → Directive structurelle Angular. Elle signifie : _affiche ce `<span>` d'erreur UNIQUEMENT si `formErrors['nom']` existe (n'est pas vide)._

- **`*ngIf="showSuccessPopup"`** → Affiche le popup de succès uniquement après une soumission réussie.

---

### 6.3 Use Cases (situations d'utilisation)

**Fichiers :** `use-cases/eariary-use-cases.component.ts`, `.html`, `.scss`

**Ce que ça affiche :** Une grille de cartes montrant les cas d'utilisation d'eAriary, avec un système d'onglets (Particuliers / Professionnel).

#### La logique (`eariary-use-cases.component.ts`)

```typescript
export class EariaryUseCasesComponent implements OnInit, AfterViewInit {
    activeTab = 'particuliers';

    switchTab(tab: string) {
        this.activeTab = tab;
        setTimeout(() => this.initScrollAnimations(), 50);
    }

    ngAfterViewInit() {
        this.initScrollAnimations();
    }

    private initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.use-cases-section .fade-in-up')
            .forEach(el => { ... observer.observe(el); });
    }
}
```

**Points clés :**

- **`activeTab`** → Contrôle quel onglet est affiché (Particuliers ou Professionnel).

- **`[class.active]="activeTab === 'particuliers'"`** → Ajoute la classe CSS `active` au bouton/panneau **uniquement si** `activeTab` vaut `'particuliers'`. C'est comme ça qu'Angular gère les onglets.

  ```html
  <!-- Bouton onglet -->
  <button [class.active]="activeTab === 'particuliers'" (click)="switchTab('particuliers')">Particuliers</button>

  <!-- Panneau correspondant -->
  <div class="use-cases-panel" [class.active]="activeTab === 'particuliers'">
    <!-- Les cartes... -->
  </div>
  ```

- **`IntersectionObserver`** → C'est une API JavaScript native (pas Angular). Elle détecte quand un élément entre dans la zone visible de l'écran. Ici, elle ajoute la classe `visible` aux cartes quand l'utilisateur scrolle, ce qui déclenche l'**animation d'apparition** (fade-in + slide-up).

- **`ngAfterViewInit()`** → Comme `ngOnInit()` mais appelée **après** que le HTML soit complètement rendu. Nécessaire ici car on accède au DOM (`document.querySelectorAll`).

---

### 6.4 FAQ (questions fréquentes)

**Fichiers :** `faq/eariary-faq.component.ts`, `.html`, `.scss`

**Ce que ça affiche :** Une liste de 15 questions/réponses avec un système accordéon (une seule réponse ouverte à la fois).

#### La logique (`eariary-faq.component.ts`)

```typescript
export class EariaryFaqComponent {
  openIndex: number | null = null; // Index de la question ouverte (null = aucune)

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }

  isOpen(index: number): boolean {
    return this.openIndex === index;
  }
}
```

**Explication :**

- **`openIndex`** → Stocke l'index (0, 1, 2...) de la question actuellement ouverte. `null` = tout est fermé.
- **`toggle(index)`** → Si on clique sur la question déjà ouverte, elle se ferme (`null`). Sinon, elle s'ouvre et l'ancienne se ferme.
- **`isOpen(index)`** → Renvoie `true` si la question `index` est ouverte.

Dans le HTML :

```html
<!-- Bouton question -->
<button (click)="toggle(0)" [attr.aria-expanded]="isOpen(0)">
  <span>Qu'est-ce que l'eAriary ?</span>
  <i class="fas fa-chevron-down faq-icon"></i>
</button>

<!-- Réponse (affichée/masquée via la classe CSS 'open') -->
<div class="faq-answer" [class.open]="isOpen(0)">
  <ul>
    ...
  </ul>
</div>
```

> **`[attr.aria-expanded]`** → C'est pour l'accessibilité. Il indique aux lecteurs d'écran si la section est ouverte ou fermée.

---

### 6.5 Side Nav (navigation latérale)

**Fichiers :** `side-nav/eariary-side-nav.component.ts`, `.html`, `.scss`

**Ce que ça affiche :** Des petits points de navigation **fixés à gauche** de l'écran, avec les labels des sections (Accueil, Inscription, Cas d'usage, FAQ). Le point actif change automatiquement quand on scrolle.

#### La logique (`eariary-side-nav.component.ts`)

```typescript
export class EariarySideNavComponent implements OnInit, OnDestroy {
  sections = [
    { id: "accueil", label: "Accueil" },
    { id: "inscription", label: "Inscription" },
    { id: "use-cases", label: "Cas d'usage" },
    { id: "faq", label: "FAQ" },
  ];

  activeIndex = 0;

  @HostListener("window:scroll", [])
  onScroll() {
    this.updateActiveSection();
  }

  private updateActiveSection() {
    const scrollPos = window.scrollY;
    for (let i = this.sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(this.sections[i].id);
      if (el && scrollPos >= el.offsetTop - 260) {
        this.activeIndex = i;
        break;
      }
    }
  }
}
```

**Points clés :**

- **`@HostListener('window:scroll', [])`** → C'est un **décorateur Angular** qui écoute l'événement `scroll` sur la fenêtre du navigateur. Chaque fois que l'utilisateur scrolle, `onScroll()` est appelée.

- **`updateActiveSection()`** → Parcourt les sections de bas en haut. La section dont le haut est le plus proche du scroll actuel (avec un offset de 260px) devient la section active.

- **`*ngFor="let section of sections; let i = index"`** → C'est une **boucle Angular**. Pour chaque élément dans le tableau `sections`, elle crée un lien dans la navigation.

  ```html
  <a *ngFor="let section of sections; let i = index" [class.active]="i === activeIndex" (click)="scrollTo($event, section.id)">
    <span class="side-nav-dot"></span>
    <span class="side-nav-label">{{ section.label }}</span>
  </a>
  ```

  Les `id` dans le tableau (`'accueil'`, `'inscription'`, etc.) correspondent aux attributs `id="accueil"`, `id="inscription"` dans le HTML des autres composants.

---

## 7. Le SCSS (les styles)

### Les styles globaux d'eAriary (`eariary.component.scss`)

Ce fichier contient les **design tokens** (variables CSS) et les styles **partagés** entre tous les composants eAriary :

```scss
:root {
  /* Couleurs de marque */
  --teal: #004b4c; /* Vert foncé — couleur principale */
  --blue: #1670bf; /* Bleu — couleur secondaire */
  --olive: #979925; /* Olive — couleur accent */
  --red: #cb3125; /* Rouge — couleur danger */

  /* Neutres */
  --white: #ffffff;
  --gray-50: #f1f3f8; /* Gris très clair */
  --gray-900: #0f1119; /* Presque noir */

  /* Dégradés réutilisables */
  --gradient-brand: linear-gradient(135deg, var(--teal) 0%, var(--blue) 100%);

  /* Ombres */
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);

  /* Rayons de bordure */
  --radius-md: 12px;
  --radius-full: 9999px; /* Complètement rond */
}
```

> **Grâce à `ViewEncapsulation.None`**, ces variables sont accessibles dans **tous** les composants enfants. C'est pourquoi les fichiers SCSS des enfants utilisent `var(--teal)`, `var(--shadow-md)`, etc.

### Pourquoi chaque composant a son propre fichier SCSS ?

Même si les variables sont partagées, chaque composant a ses **propres styles spécifiques** :

- `eariary-hero.component.scss` → styles du mockup téléphone, du titre héro, etc. (755 lignes)
- `eariary-signup.component.scss` → styles du formulaire, des cartes de type de compte, etc. (328 lignes)
- `eariary-use-cases.component.scss` → styles de la grille de cartes, des onglets, etc. (162 lignes)
- `eariary-faq.component.scss` → styles de l'accordéon FAQ
- `eariary-side-nav.component.scss` → styles de la navigation latérale fixée (80 lignes)

---

## 8. Le mode pleine largeur dans App

Il y a un mécanisme spécial dans `app.component.ts` pour que la page eAriary s'affiche **en pleine largeur**, sans la sidebar habituelle du site :

### Dans `app.component.ts` :

```typescript
isFullWidth = false;

constructor(private _route: Router, ...) {
    this._route.events.subscribe(val => {
        if (val instanceof NavigationEnd) {
            this.isFullWidth = val.url.startsWith('/eariary');
        }
    });
}
```

**Explication :** Chaque fois que la navigation se termine, Angular vérifie si l'URL commence par `/eariary`. Si oui, `isFullWidth` passe à `true`.

### Dans `app.component.html` :

```html
<div class="container-fluid" [class.eariary-fullwidth]="isFullWidth">
  <div class="row">
    <div [ngClass]="isFullWidth ? 'col-md-12' : 'col-md-8'">
      <div class="main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
    <div class="col-md-4 d-flex" *ngIf="!isFullWidth">
      <app-sidebar></app-sidebar>
    </div>
  </div>
</div>
```

**Ce qui se passe :**

| Page           | `isFullWidth` | Colonne contenu                 | Sidebar                             |
| -------------- | ------------- | ------------------------------- | ----------------------------------- |
| Pages normales | `false`       | `col-md-8` (8/12 de la largeur) | ✅ Visible (`col-md-4`)             |
| Page eAriary   | `true`        | `col-md-12` (toute la largeur)  | ❌ Masquée (`*ngIf="!isFullWidth"`) |

---

## 9. Résumé visuel de l'architecture

```
                          app-routing.module.ts
                          ─────────────────────
                          URL: /eariary
                               │
                               ▼  (lazy loading)
                     eariary.module.ts
                     ──────────────────
                     Regroupe tout : imports + declarations
                               │
                               ▼
                     eariary.component (parent)
                     ──────────────────────────
                     HTML assemble les 5 enfants
                     SCSS définit les design tokens
                     TS : aucune logique (juste un conteneur)
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
          ┌──────────┐  ┌──────────┐  ┌──────────────┐
          │   HERO   │  │  SIGNUP  │  │  USE CASES   │
          │          │  │          │  │              │
          │ -Titre   │  │ -Form    │  │ -Onglets     │
          │  FR/MG   │  │  bilingue│  │ -Grille      │
          │ -Mockups │  │ -Validat.│  │  de cartes   │
          │ -Logos   │  │ -Popup   │  │ -Animations  │
          └──────────┘  └──────────┘  └──────────────┘
                │              │              │
                ▼              ▼              ▼
          ┌──────────┐  ┌──────────────┐
          │   FAQ    │  │  SIDE NAV    │
          │          │  │  (fixé à     │
          │ -Accordéon │ │  gauche)     │
          │ -15 Q/R  │  │ -Scroll spy │
          └──────────┘  └──────────────┘
```

### Résumé du flux complet

1. L'utilisateur navigue vers `/eariary`
2. `app-routing.module.ts` détecte le chemin et **charge paresseusement** `EariaryModule`
3. `app.component.ts` détecte que l'URL commence par `/eariary` et passe en **mode pleine largeur** (masque la sidebar)
4. `eariary-routing.module.ts` affiche `EariaryComponent`
5. `EariaryComponent` (le parent) **assemble** les 5 sections enfants dans son HTML
6. Chaque section enfant gère sa **propre logique** (animations, formulaire, FAQ, navigation)
7. Les **variables CSS** définies dans le SCSS du parent sont partagées par tous les enfants grâce à `ViewEncapsulation.None`
