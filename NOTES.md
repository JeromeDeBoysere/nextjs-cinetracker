# Notes techniques

> Aide-mémoire des concepts clés pour les entretiens.
>
> _Dernière mise à jour : 09/01/2025 - 16:00_

---

## React Hooks - Mémoire interne

### useState : la valeur initiale n'est utilisée qu'une seule fois

En JavaScript classique, une variable locale est réinitialisée à chaque appel de fonction.

**En React, c'est différent :** la valeur passée à `useState(valeurInitiale)` est **ignorée** après le premier render.

```typescript
function Component() {
  const [count, setCount] = useState(0);
  // Premier render  : count = 0 (valeur initiale utilisée)
  // Renders suivants: count = valeur actuelle du slot (0 ignoré)
}
```

### Comment React persiste les valeurs

React maintient un **tableau de slots mémoire** pour chaque instance de composant :

```
Composant MyComponent - Mémoire interne:
┌─────────────────────────────────┐
│ Slot #0 (1er useState): "value" │
│ Slot #1 (2ème useState): 42     │
│ Slot #2 (useEffect): {...}      │
└─────────────────────────────────┘
```

- **Premier render :** React crée le slot et stocke la valeur initiale.
- **Renders suivants :** React retourne la valeur actuelle du slot, la valeur initiale est ignorée.

### Identification des slots par ordre d'appel

React identifie les hooks par leur **ordre d'appel**, pas par nom de variable :

```typescript
// ❌ INTERDIT - l'ordre change selon la condition
if (condition) {
  useState(a); // Slot #0 ou pas ?
}
useState(b); // Slot #0 ou #1 ? React ne sait plus

// ✅ OK - ordre toujours identique
useState(a); // Toujours slot #0
useState(b); // Toujours slot #1
```

C'est pourquoi les hooks sont interdits dans les `if`, boucles, ou fonctions imbriquées.

---

## Debounce

### Problème

Éviter les appels API à chaque frappe (6 appels pour taper "Batman").

### Solution

Attendre que l'utilisateur arrête de taper (300-500ms) avant d'appeler l'API.

### Mécanisme

```
User tape "B"    → Timer 300ms démarre
User tape "a"    → Timer annulé, nouveau timer 300ms
User tape "t"    → Timer annulé, nouveau timer 300ms
[300ms passent]  → Timer expire → API appelée avec "Bat"
```

### Utilisation

```typescript
const [search, setSearch] = useState("");
const debouncedSearch = useDebounce(search, 300);

// search           → mis à jour immédiatement (à chaque frappe)
// debouncedSearch  → mis à jour après 300ms sans nouvelle frappe
```

Le hook `useDebounce` utilise `setTimeout` + cleanup (`clearTimeout`) pour annuler le timer précédent à chaque changement de valeur.

---

## Next.js - ISR (Incremental Static Regeneration)

### Syntaxe

```typescript
fetch(url, {
  next: { revalidate: 3600 }, // 3600 secondes = 1 heure
});
```

`next: {}` est une option **spécifique à Next.js**, pas du JavaScript standard.

### Comportement

```
1er appel   → Requête réseau → Réponse stockée en cache
2ème appel  → Cache valide (<1h) → Retourne le cache (pas de requête)
3ème appel  → Cache expiré (>1h) → Retourne le cache + nouvelle requête en background
4ème appel  → Nouveau cache disponible → Données fraîches
```

**Avantage :** L'utilisateur reçoit toujours une réponse rapide (cache), même pendant l'actualisation.

### Alternatives

```typescript
fetch(url, { cache: "no-store" }); // Jamais de cache (toujours frais)
fetch(url, { cache: "force-cache" }); // Cache permanent
fetch(url, { next: { revalidate: 60 } }); // ISR 1 minute
```

---

## URL - encodeURIComponent

Encode les caractères spéciaux pour les URLs :

```typescript
encodeURIComponent("Batman Returns"); // "Batman%20Returns"
encodeURIComponent("été"); // "%C3%A9t%C3%A9"
```

**Obligatoire** pour les paramètres de recherche avec espaces ou accents.

---

## Next.js - Server Components vs Client Components

### Par défaut : Server Component

Depuis Next.js 13+ (App Router), tous les composants sont **Server Components par défaut**.

```typescript
// Pas de directive → Server Component
export default function Page() { ... }

// Avec directive → Client Component
"use client";
export default function Page() { ... }
```

### Comparaison

|                    | Server Component   | Client Component |
| ------------------ | ------------------ | ---------------- |
| Directive          | Aucune (défaut)    | `"use client"`   |
| Exécution          | Serveur uniquement | Serveur + Client |
| Hooks React        | ❌ Interdit        | ✅ Autorisé      |
| État (`useState`)  | ❌ Interdit        | ✅ Autorisé      |
| Events (`onClick`) | ❌ Interdit        | ✅ Autorisé      |
| Accès DB/fichiers  | ✅ Direct          | ❌ Via API       |

### La frontière client/serveur

`"use client"` marque le point où on passe du serveur au client.

```
SearchPage (Server Component)
    │
    └──▶ SearchBar ("use client")  ◀── FRONTIÈRE
              │
              └── useState, useEffect, onClick fonctionnent
```

### Un Server Component peut contenir un Client Component

C'est le **pattern recommandé** :

```typescript
// ✅ OK - Server Component contenant un Client Component
export default function SearchPage() {
  return <SearchBar />;  // SearchBar a "use client"
}

// ❌ INTERDIT - Server Component avec hooks
export default function SearchPage() {
  const [search, setSearch] = useState("");  // ERREUR !
  return <div>{search}</div>;
}
```

### Ce qui se passe à l'exécution

1. **Serveur** : `SearchPage` se rend, voit `<SearchBar />`, génère un placeholder
2. **Client** : React "hydrate" `SearchBar`, active les hooks et événements

### Règle simple

- Tu veux hooks/état/events → `"use client"` sur CE composant
- Tu affiches juste un Client Component → pas besoin de `"use client"` sur le parent

---

## CSS - Conventions de nommage

### Définitions

| Convention     | Signification                             | Principe                                       |
| -------------- | ----------------------------------------- | ---------------------------------------------- |
| **BEM**        | Block Element Modifier                    | Nommage structuré `.block__element--modifier`  |
| **SMACSS**     | Scalable and Modular Architecture for CSS | Catégoriser les styles (layout, module, state) |
| **OOCSS**      | Object-Oriented CSS                       | Séparer structure et apparence                 |
| **Atomic CSS** | Utility-first                             | Une classe = une propriété (Tailwind)          |

### Avec Tailwind (recommandé)

Tailwind = utility-first, donc **pas besoin de classes custom** dans la plupart des cas.

```tsx
// ❌ Inutile avec Tailwind
<div className="c-searchbar">

// ✅ Tailwind suffit
<div className="relative flex items-center gap-2">
```

### Quand utiliser des classes custom ?

- Styles très répétés qu'on ne peut pas extraire en composant
- Animations complexes
- Override de librairies tierces

### BEM (Block Element Modifier) - Standard industrie

**Block** = un composant autonome et réutilisable (ex: `search-bar`, `movie-card`)
**Element** = une partie du block qui n'a pas de sens seule (ex: `__input`, `__title`)
**Modifier** = une variante d'état ou d'apparence (ex: `--loading`, `--disabled`)

```
.block                  → Le composant (ex: .search-bar)
.block__element         → Partie interne (ex: .search-bar__input)
.block--modifier        → Variante du bloc (ex: .search-bar--loading)
.block__element--modifier → Variante d'élément (ex: .search-bar__input--focused)
```

Exemple :

```css
.search-bar {
}
.search-bar__input {
}
.search-bar__button {
}
.search-bar--loading {
}
.search-bar__button--disabled {
}
```

### Le piège : l'imbrication infinie

**❌ ERREUR COURANTE** - imbriquer les éléments :

```css
/* NE PAS FAIRE - classes trop longues */
.search-bar__results__item__title__icon {
}
```

**Règle BEM : les éléments sont TOUJOURS rattachés au bloc, jamais à d'autres éléments.**

### Solution 1 : Aplatir la structure

Tous les éléments sont au même niveau, rattachés au bloc :

```css
.search-bar {
}
.search-bar__input {
}
.search-bar__results {
}
.search-bar__result-item {
} /* PAS __results__item */
.search-bar__result-title {
} /* PAS __results__item__title */
.search-bar__result-icon {
}
```

### Solution 2 : Créer un nouveau bloc

Si un élément devient complexe, il devient son propre bloc :

```css
/* Bloc principal */
.search-bar {
}
.search-bar__input {
}
.search-bar__results {
}

/* Nouveau bloc pour les items */
.result-card {
}
.result-card__title {
}
.result-card__icon {
}
.result-card--highlighted {
}
```

```html
<div class="search-bar">
  <input class="search-bar__input" />
  <div class="search-bar__results">
    <!-- result-card est un NOUVEAU bloc, pas un élément de search-bar -->
    <div class="result-card">
      <h3 class="result-card__title">Batman</h3>
      <span class="result-card__icon">🎬</span>
    </div>
  </div>
</div>
```

### Quand créer un nouveau bloc ?

- L'élément peut exister **indépendamment** du parent
- L'élément a **plusieurs sous-éléments** propres
- L'élément est **réutilisé ailleurs**

### Autres conventions (moins utilisées)

| Convention | Format                    | Usage                               |
| ---------- | ------------------------- | ----------------------------------- |
| **SMACSS** | `l-`, `m-`, `is-`         | `l-header`, `m-search`, `is-active` |
| **OOCSS**  | Séparation structure/skin | `.btn`, `.btn-primary`              |
| **Atomic** | Utility classes           | Tailwind, Tachyons                  |

### React + Tailwind : BEM devient inutile

Avec React, **les composants SONT les "blocks"** de BEM :

| BEM (CSS classique)    | React + Tailwind                                    |
| ---------------------- | --------------------------------------------------- |
| `.search-bar`          | `<SearchBar />`                                     |
| `.search-bar__input`   | `<input className="..." />` dans SearchBar          |
| `.search-bar--loading` | `isLoading && <Spinner />` ou classe conditionnelle |
| `.movie-card`          | `<MovieCard />`                                     |

**Pourquoi BEM n'est plus nécessaire ?**

1. **Isolation** : Chaque composant React encapsule son propre JSX/styles
2. **Réutilisabilité** : On importe le composant, pas une classe CSS
3. **Scoping** : Tailwind + composants = pas de collision de noms
4. **État** : Géré par React (`isLoading`), pas par classes (`--loading`)

**Exemple - Notre projet :**

```tsx
// Le composant React EST le "block"
function SearchBar() {
  return (
    <div className="relative flex gap-2">
      {" "}
      {/* Pas besoin de .search-bar */}
      <input className="rounded border px-4" />{" "}
      {/* Pas besoin de .search-bar__input */}
      {isLoading && <Spinner />} {/* Pas besoin de .search-bar--loading */}
    </div>
  );
}
```

**Conclusion** : Dans un projet React + Tailwind, tu n'as généralement pas besoin de classes BEM custom. Les composants React remplissent ce rôle.

---
