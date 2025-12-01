"use client";

import Image from "next/image";
import { MovieType } from "@/lib/schemas/movie";
import { Button } from "@/components/ui/button";
import { useFavoriteStore } from "@/lib/store/useFavoriteStore";

const TMDB_IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

interface MovieCardProps {
  movie: MovieType;
}

export function MovieCard({ movie }: MovieCardProps) {
  const { toggleFavorite, isFavorite } = useFavoriteStore();

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl">
      <div className="relative aspect-[2/3] w-full bg-gray-200">
        {movie.poster_path ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            Pas d'image
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="mb-2 line-clamp-2 flex justify-between gap-2 text-lg font-semibold text-gray-800">
          {movie.title}
          <Button onClick={() => toggleFavorite(movie.id)} variant="outline">
            {isFavorite(movie.id) ? "❤️" : "🤍"}
          </Button>
        </h2>

        <p className="mb-3 line-clamp-3 text-sm text-gray-600">
          {movie.overview}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1 font-medium">
            Note: {movie.vote_average.toFixed(1)}
          </span>
          <span>{new Date(movie.release_date).getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}
