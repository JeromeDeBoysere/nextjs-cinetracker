import {
  getPopularMovies,
  getTrendingMovies,
  getTrendingMoviesDay,
  getUpcomingMovies,
} from "@/lib/api/tmdb";

import { HeroCarouselMovieSection } from "./HeroCarouselMovieSection";
import { MovieSection } from "./MovieSection";

export async function TrendingHeroCarouselMoviesSection() {
  const data = await getTrendingMoviesDay();
  return (
    <HeroCarouselMovieSection
      title="Films à la Une"
      movies={data.results.slice(0, 5)}
    />
  );
}
export async function PopularMoviesSection() {
  const data = await getPopularMovies();
  return (
    <MovieSection title="Films populaires" movies={data.results.slice(0, 10)} />
  );
}

export async function TrendingMoviesSection() {
  const data = await getTrendingMovies();
  return (
    <MovieSection title="Films tendances" movies={data.results.slice(0, 10)} />
  );
}

export async function UpcomingMoviesSection() {
  const data = await getUpcomingMovies();
  return (
    <MovieSection title="Films à venir" movies={data.results.slice(0, 10)} />
  );
}
