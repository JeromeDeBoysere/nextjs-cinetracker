import { MovieType } from "@/lib/schemas/movie";

import { MovieCard } from "./MovieCard";

interface MovieSectionProps {
  title: string;
  movies: Array<MovieType>;
}

/**
 * Section displaying a list of movies in a responsive grid
 * @param title - Section title
 * @param movies - Array of movies to display
 */
export function MovieSection({ title, movies }: MovieSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">{title}</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie: MovieType) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
