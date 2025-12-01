"use client";

import { useEffect, useState } from "react";

import { MovieCard } from "@/components/MovieCard";
import { SpinnerCustom } from "@/components/ui/spinner";
import { getMovieDetails } from "@/lib/api/tmdb";
import { MovieType } from "@/lib/schemas/movie";
import { useFavoritesStore } from "@/lib/store/useFavoritesStore";

export default function FavoritesPage() {
  const { favorites } = useFavoritesStore();

  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      if (favorites.length === 0) {
        setMovies([]);
        setIsLoading(false);
        return;
      }

      console.log("favorites", favorites);
      setIsLoading(true);
      const moviePromises = favorites.map((id) => getMovieDetails(id));
      const results = await Promise.all(moviePromises);
      setMovies(results);
      setIsLoading(false);
    }

    fetchFavorites();
  }, [favorites]);

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Mes Favoris</h1>
        <SpinnerCustom />
      </main>
    );
  }

  if (favorites.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Mes Favoris</h1>
        <p className="text-gray-500">
          Aucun favori pour le moment. Cliquez sur le cœur d'un film pour
          l'ajouter !
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Mes Favoris</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
