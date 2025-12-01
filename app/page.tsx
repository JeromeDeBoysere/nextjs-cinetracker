import Link from "next/link";

import { MovieSection } from "@/components/MovieSection";
import {
  getPopularMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "@/lib/api/tmdb";

export default async function Home() {
  const popularMovies = await getPopularMovies();
  const trendingMovies = await getTrendingMovies();
  const upcomingMovies = await getUpcomingMovies();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">CineTracker</h1>

      <ul>
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <Link href="/favorites">Mes favoris</Link>
        </li>
      </ul>

      <MovieSection
        title="Films populaires"
        movies={popularMovies.results.slice(0, 8)}
      />
      <MovieSection
        title="Films tendances"
        movies={trendingMovies.results.slice(0, 8)}
      />
      <MovieSection
        title="Films à venir"
        movies={upcomingMovies.results.slice(0, 8)}
      />
    </main>
  );
}
