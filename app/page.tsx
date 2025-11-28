import {
  getPopularMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "@/lib/api/tmdb";
import { MovieSection } from "@/components/MovieSection";

export default async function Home() {
  const popularMovies = await getPopularMovies();
  const trendingMovies = await getTrendingMovies();
  const upcomingMovies = await getUpcomingMovies();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-8 text-4xl font-bold text-gray-900">Main title</h1>

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
