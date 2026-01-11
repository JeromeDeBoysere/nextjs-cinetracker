import Image from "next/image";

import { MovieType } from "@/lib/schemas/movie";

const TMDB_IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

/**
 * Presentational component for search results
 * Navigation is handled by parent CommandItem's onSelect
 */
export function SearchResultItem({ movie }: { movie: MovieType }) {
  return (
    <div className="flex w-full flex-row">
      <div className="relative aspect-[2/3] w-[120px] rounded bg-gray-200">
        {movie.poster_path ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w154${movie.poster_path}`}
            alt=""
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            N/A
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center px-3">
        <span className="text-foreground line-clamp-2 text-lg font-medium">
          {movie.title}
        </span>
        <span className="text-muted-foreground">
          {movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : "N/A"}{" "}
          • ⭐ {movie.vote_average.toFixed(1)}
        </span>
      </div>
    </div>
  );
}
