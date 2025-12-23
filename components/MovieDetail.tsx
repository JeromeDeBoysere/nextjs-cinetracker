"use client";

import Image from "next/image";

import { AddToFavorite } from "./AddToFavorite";

const TMDB_IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

interface Genre {
  id: number;
  name: string;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

interface MovieDetailProps {
  movie: {
    id: number;
    title: string;
    overview: string;
    tagline: string | null;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    runtime: number | null;
    vote_average: number;
    vote_count: number;
    genres: Genre[];
    credits: {
      cast: CastMember[];
    };
  };
}

/**
 * Format runtime from minutes to hours and minutes
 * @param minutes - Runtime in minutes
 * @returns Formatted string like "2h 15min"
 */
function formatRuntime(minutes: number | null): string {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}min`;
}

/**
 * Movie detail component displaying full movie information
 * @param movie - Movie detail object with extended information
 * @returns Movie detail UI with hero, synopsis and cast sections
 */
export function MovieDetail({ movie }: MovieDetailProps) {
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";
  const runtime = formatRuntime(movie.runtime);
  const cast = movie.credits.cast.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-details-cover relative mt-20 overflow-hidden">
        {/* Backdrop Image */}
        {movie.backdrop_path && (
          <div className="absolute inset-0 -z-10">
            <Image
              src={`${TMDB_IMAGE_BASE}/original${movie.backdrop_path}`}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
          </div>
        )}

        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Poster */}
            <div className="relative mx-auto w-64 shrink-0 md:mx-0 md:w-80">
              <div className="card relative aspect-[2/3] overflow-hidden">
                {movie.poster_path ? (
                  <Image
                    src={`${TMDB_IMAGE_BASE}/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gray-200 text-gray-400">
                    Pas d'image
                  </div>
                )}
                <AddToFavorite
                  movie={{
                    id: movie.id,
                    title: movie.title,
                    overview: movie.overview,
                    poster_path: movie.poster_path,
                    backdrop_path: movie.backdrop_path,
                    release_date: movie.release_date,
                    vote_average: movie.vote_average,
                    vote_count: movie.vote_count,
                    adult: false,
                    genre_ids: movie.genres.map((g) => g.id),
                    original_language: "",
                    original_title: movie.title,
                    popularity: 0,
                    video: false,
                  }}
                />
              </div>
            </div>

            {/* Movie Info */}
            <div className="flex flex-col justify-center">
              <h1 className="mb-2 text-3xl font-bold text-gray-100 md:text-4xl">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="mb-4 text-lg text-gray-400 italic">
                  {movie.tagline}
                </p>
              )}

              {/* Meta info */}
              <div className="mb-4 flex flex-wrap items-center gap-2 text-gray-400">
                {year && <span>{year}</span>}
                {year && runtime && <span>•</span>}
                {runtime && <span>{runtime}</span>}
                {(year || runtime) && <span>•</span>}
                <span className="flex items-center gap-1 text-yellow-500">
                  <span>★</span>
                  <span className="font-medium">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-white">
                    ({movie.vote_count.toLocaleString()} votes)
                  </span>
                </span>
              </div>

              {/* Genres */}
              {movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Synopsis Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Synopsis</h2>
        <p className="max-w-3xl leading-relaxed text-gray-700">
          {movie.overview || "Aucun synopsis disponible."}
        </p>
      </section>

      {/* Cast Section */}
      {cast.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Casting principal
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {cast.map((actor) => (
              <div key={actor.id} className="text-center">
                <div className="card relative mx-auto mb-2 aspect-[2/3] w-full overflow-hidden">
                  {actor.profile_path ? (
                    <Image
                      src={`${TMDB_IMAGE_BASE}/w185${actor.profile_path}`}
                      alt={actor.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gray-200 text-4xl text-gray-400">
                      👤
                    </div>
                  )}
                </div>
                <p className="font-medium text-gray-900">{actor.name}</p>
                <p className="text-sm text-gray-600">{actor.character}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
