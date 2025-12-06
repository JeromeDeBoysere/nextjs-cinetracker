# CineTracker

A movie discovery application built with Next.js 16 and the TMDB API.

## 🚀 Live Demo

**[View Live Demo →](https://nextjs-cinetracker-p5opgvf32-jerome-de-boyseres-projects.vercel.app/)**

## Overview

CineTracker allows users to browse popular, trending, and upcoming movies. Users can save favorites locally and explore movie details.

## Tech Stack

| Category         | Technologies                          |
| ---------------- | ------------------------------------- |
| Framework        | Next.js 16, React 19, TypeScript 5    |
| State Management | Zustand, TanStack Query               |
| Validation       | Zod                                   |
| UI Components    | shadcn/ui (Radix UI), Lucide React    |
| Styling          | Tailwind CSS v4, CVA, Google Fonts    |
| Utilities        | date-fns, clsx, tailwind-merge        |
| Code Quality     | ESLint 9, Prettier, Husky, Commitlint |

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- TMDB API key ([request here](https://www.themoviedb.org/settings/api))

### Installation

```bash
git clone https://github.com/jeromedeboysere/nextjs-cinetracker.git
cd nextjs-cinetracker
pnpm install
```

### Configuration

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_api_key
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

### Development

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
app/              Next.js App Router pages
components/       React components
lib/api/          API integration layer
lib/schemas/      Zod validation schemas
lib/store/        Zustand state management
lib/hooks/        Custom React hooks
```

## Scripts

| Command       | Description               |
| ------------- | ------------------------- |
| `pnpm dev`    | Start development server  |
| `pnpm build`  | Build for production      |
| `pnpm lint`   | Run ESLint                |
| `pnpm format` | Format code with Prettier |

## Features

### Implemented

- ✅ Home page with popular, trending, and upcoming movies
- ✅ TMDB API integration with Zod validation
- ✅ Optimized images with Next.js Image component
- ✅ Favorites system with Zustand (localStorage persistence)
- ✅ Favorites page with skeleton loading states
- ✅ Skeleton loading components for better UX
- ✅ TanStack Query setup
- ✅ Responsive design
- ✅ shadcn/ui components (Button, Tooltip, Skeleton, Spinner, Carousel)
- ✅ Hero carousel with Embla (autoplay, dots navigation, peek effect)
- ✅ Blurred poster background on movie cards
- ✅ Header with navigation and gradient design
- ✅ Footer component
- ✅ Custom typography (Inter, Outfit fonts)
- ✅ ESLint + Prettier + Husky + Commitlint
- ✅ Deployment on Vercel

### Roadmap

- [ ] Suspense and streaming for progressive loading
- [ ] Movie search with debounce
- [ ] Genre filtering
- [ ] Pagination
- [ ] Movie detail page (`/movie/[id]`)
- [ ] ISR (Incremental Static Regeneration)
- [ ] SEO metadata

## Credits

This product uses the [TMDB API](https://www.themoviedb.org/) but is not endorsed or certified by TMDB.

## License

MIT
