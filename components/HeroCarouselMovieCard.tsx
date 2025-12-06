"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MovieType } from "@/lib/schemas/movie";
import { useFavoritesStore } from "@/lib/store/useFavoritesStore";

const TMDB_IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

interface MovieCardProps {
  movie: MovieType;
}

export function HeroCarouselMovieCard({ movie }: MovieCardProps) {
  const [mounted, setMounted] = useState(false);
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isLiked = mounted && isFavorite(movie.id);

  return (
    <Card className="card py-0">
      <CardContent className="flex flex-col items-stretch p-0 lg:flex-row">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-gray-200 lg:flex-[2] lg:rounded-xl lg:rounded-e-none">
          {movie.backdrop_path ? (
            <Image
              src={`${TMDB_IMAGE_BASE}/original${movie.backdrop_path}`}
              alt={movie.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              Pas d'image
            </div>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => toggleFavorite(movie.id)}
                variant="outline"
                className="absolute top-2 right-2"
              >
                {isLiked ? "❤️" : "🤍"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {isLiked ? "Retirer de mes favoris" : "Ajouter à mes favoris"}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="card flex flex-col rounded-b-xl bg-white shadow-none lg:flex-[1] lg:rounded-xl">
          <div className="p-4">
            <h2 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-800">
              {movie.title}
            </h2>

            <p className="mb-3 line-clamp-3 text-gray-600">{movie.overview}</p>

            <div className="flex items-center justify-between text-gray-500">
              <span className="flex items-center gap-1 font-medium">
                Note: {movie.vote_average.toFixed(1)}
              </span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
