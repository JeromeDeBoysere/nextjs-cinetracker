/**
 * Section displaying a list of movies in a responsive grid
 * @param title - Section title
 * @param movies - Array of movies to display
 */
export function MovieSection({ title, movies }: MovieSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-4xl font-bold mb-8 text-gray-900">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
