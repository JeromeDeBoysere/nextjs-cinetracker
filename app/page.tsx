import { getPopularMovies } from "@/lib/api/tmdb";
import Image from "next/image";

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
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
          >
            {/* Poster */}
            <div className="relative w-full aspect-[2/3] bg-gray-200">
              {movie.poster_path ? (
                <Image
                  src={`${TMDB_IMAGE_BASE}/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Pas d'image
                </div>
              )}
            </div>

            {/* Contenu */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {movie.title}
              </h2>

              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {movie.overview || "Pas de synopsis disponible"}
              </p>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="flex items-center gap-1 font-medium">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
