import { MovieCardSkeleton } from "@/components/MovieCardSkeleton";
import { MovieType } from "@/lib/schemas/movie";

import { MovieCard } from "./MovieCard";

interface MovieSectionProps {
  title: string;
  movies?: Array<MovieType>;
  isLoading?: boolean;
  skeletonCount?: number;
}

/**
 * Section displaying a list of movies
 * @param title - Section titlenonn, o
 * @param movies - Array of movies to display
 * @param isLoading - If date is being fetched
 * @param skeletonCount - Number of skeletons
 */
export function MovieSection({
  title,
  movies,
  isLoading,
  skeletonCount,
}: MovieSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">{title}</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading
          ? [...Array(skeletonCount)].map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))
          : movies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </section>
  );
}
