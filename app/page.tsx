import { getPopularMovies } from "@/lib/api/tmdb";
import Image from "next/image";
import {MovieCard} from "@/components/MovieCard";

const TMDB_IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

export default async function Home() {
  const movies = await getPopularMovies();

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Films populaires
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.results.slice(0, 12).map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </main>
  );
}
