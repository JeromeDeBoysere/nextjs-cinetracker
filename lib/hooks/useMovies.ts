import { useQuery } from "@tanstack/react-query";

import {
  getPopularMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "@/lib/api/tmdb";

export function usePopularMovies() {
  return useQuery({
    queryKey: ["movies", "popular"],
    queryFn: getPopularMovies,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useTrendingMovies() {
  return useQuery({
    queryKey: ["movies", "trending"],
    queryFn: getTrendingMovies,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUpcomingMovies() {
  return useQuery({
    queryKey: ["movies", "upcoming"],
    queryFn: getUpcomingMovies,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
