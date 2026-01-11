# CineTracker - Session d'apprentissage

> Fichier de suivi pour maintenir le contexte entre les sessions Claude Code.
>
> **Objectif** : Maîtriser la stack Next.js 16 / React 19 avant le 20 janvier 2025.

---

## Contexte

- **Deadline** : 20 janvier 2025 (fin de contrat)
- **Mode** : Pair programming avec explications pour préparer les entretiens
- **Niveau actuel** : Base solide (app fonctionnelle déployée sur Vercel)

---

## Progression Roadmap

### Features

| #   | Feature                               | Statut      | Date  | Notes                                   |
| --- | ------------------------------------- | ----------- | ----- | --------------------------------------- |
| 1   | Recherche avec debounce               | 🔄 En cours | 09/01 | Dropdown + SearchResultItem à finaliser |
| 2   | **Réorganisation features/**          | ⏳ À faire  | -     | Après recherche dropdown                |
| 3   | Filtrage par genre                    | ⏳ À faire  | -     | -                                       |
| 4   | Pagination                            | ⏳ À faire  | -     | -                                       |
| 5   | ISR (Incremental Static Regeneration) | ⏳ À faire  | -     | -                                       |
| 6   | SEO metadata                          | ⏳ À faire  | -     | -                                       |

### Testing & CI/CD

| #   | Feature                              | Statut     | Date | Notes |
| --- | ------------------------------------ | ---------- | ---- | ----- |
| 1   | Setup Vitest + React Testing Library | ⏳ À faire | -    | -     |
| 2   | Tests unitaires (utils)              | ⏳ À faire | -    | -     |
| 3   | Tests composants (MovieCard, etc.)   | ⏳ À faire | -    | -     |
| 4   | GitHub Actions CI                    | ⏳ À faire | -    | -     |

**Légende** : ✅ Terminé | 🔄 En cours | ⏳ À faire

---

## Session actuelle : Recherche avec debounce

### Objectifs d'apprentissage

- [ ] Comprendre le pattern debounce (pourquoi, quand l'utiliser)
- [ ] Créer un custom hook `useDebounce`
- [ ] Intégrer l'API TMDB `/search/movie`
- [ ] Gérer les états de chargement avec TanStack Query
- [ ] Questions d'entretien typiques sur ce sujet

### Plan d'implémentation

1. **Schema Zod** : Réutiliser `moviesResponseSchema` (même structure)
2. **API** : Ajouter `searchMovies()` dans `lib/api/tmdb.ts`
3. **Hook debounce** : Créer `useDebounce.ts` dans `lib/hooks/`
4. **Hook query** : Ajouter `useSearchMovies()` dans `lib/hooks/useMovies.ts`
5. **UI** : Créer `SearchBar.tsx` + page `/search`
6. **Intégration** : Ajouter dans le Header

### Fichiers à créer/modifier

- [ ] `lib/hooks/useDebounce.ts` (nouveau)
- [ ] `lib/api/tmdb.ts` (ajouter searchMovies)
- [ ] `lib/hooks/useMovies.ts` (ajouter useSearchMovies)
- [ ] `components/SearchBar.tsx` (nouveau)
- [ ] `app/search/page.tsx` (nouveau)
- [ ] `components/layout/Header.tsx` (modifier)

---

## Patterns du projet (référence rapide)

### API (`lib/api/tmdb.ts`)

```typescript
async function fetchTMDB<Type>(
  endpoint: string,
  schema: z.ZodSchema<Type>
): Promise<Type>;
```

### Schemas (`lib/schemas/movie.ts`)

- Naming : `camelCaseSchema` + `PascalCaseType`
- Types via `z.infer<typeof schema>`

### Hooks (`lib/hooks/useMovies.ts`)

- Query keys : `["movies", "category", params]`
- staleTime : 5 minutes

### Composants

- Client components : `"use client"`
- Props typées avec interfaces
- Images : `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL`

---

## Notes pour les entretiens

### Questions probables sur la recherche

- "Pourquoi utiliser un debounce ?" → Éviter les appels API à chaque frappe
- "Quel délai de debounce ?" → 300-500ms est standard
- "Comment gérer le loading ?" → TanStack Query `isLoading` / `isFetching`
- "Et si l'utilisateur tape vite puis efface ?" → Le debounce annule les appels précédents

---

## Historique des sessions

### Session 1 - 09/01/2025

- Analyse des patterns existants du projet
- Planification de la feature recherche
- Création de ce fichier de suivi
- **Feature recherche complétée :**
  - `lib/hooks/useDebounce.ts` - custom hook debounce
  - `lib/api/tmdb.ts` - ajout `searchMovies()`
  - `lib/hooks/useMovies.ts` - ajout `useSearchMovies()`
  - `components/SearchBar.tsx` - composant de recherche
  - `app/search/page.tsx` - page /search
  - `components/layout/Navigation.tsx` - lien ajouté
- **Concepts appris :**
  - Debounce pattern (setTimeout + clearTimeout)
  - useState ne réinitialise pas comme en JS (slots mémoire React)
  - Server Components vs Client Components (frontière "use client")
  - ISR avec `next: { revalidate }`
  - TanStack Query avec `enabled` pour queries conditionnelles

---

_Dernière mise à jour : 09/01/2025_
