import {
  getPopularMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "@/lib/api/tmdb";

import { MovieSection } from "./MovieSection";

export async function PopularMoviesSection() {
  const data = await getPopularMovies();
  return (
    <MovieSection title="Films populaires" movies={data.results.slice(0, 8)} />
  );
}

export async function TrendingMoviesSection() {
  const data = await getTrendingMovies();
  return (
    <MovieSection title="Films tendances" movies={data.results.slice(0, 8)} />
  );
}

export async function UpcomingMoviesSection() {
  const data = await getUpcomingMovies();
  return (
    <MovieSection title="Films à venir" movies={data.results.slice(0, 8)} />
  );
}
