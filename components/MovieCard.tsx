"use client";

import Image from "next/image";

import { MovieType } from "@/lib/schemas/movie";

import { AddToFavorite } from "./AddToFavorite";

const TMDB_IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

interface MovieCardProps {
  movie: MovieType;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="card relative flex flex-col overflow-hidden">
      <div className="relative aspect-[2/3] w-full bg-gray-200">
        <a href={`/movie/${movie.id}`}>
          {movie.poster_path ? (
            <Image
              src={`${TMDB_IMAGE_BASE}/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              Pas d'image
            </div>
          )}
        </a>

        <AddToFavorite movie={movie} />
      </div>

      <div className="relative z-0 flex-1 p-4">
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

        <Image
          src={`${TMDB_IMAGE_BASE}/w45${movie.poster_path}`}
          alt={movie.title}
          fill
          className="absolute inset-0 -z-10 scale-[2_-2] object-cover object-bottom opacity-25 blur-xl"
        />
      </div>
    </div>
  );
}
