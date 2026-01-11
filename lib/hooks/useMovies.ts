import { useQuery } from "@tanstack/react-query";

import {
  getPopularMovies,
  getTrendingMovies,
  getUpcomingMovies,
  searchMovies,
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

/**
 * Search movies with TanStack Query
 * @param query - Search term (debounced value recommended)
 * @returns Query result with data, isLoading, error, etc.
 */
export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: ["search", "movie", query], // Unique key
    queryFn: () => searchMovies(query), // Function to call
    enabled: query.length > 0, // Do not fetch if query is empty
    staleTime: 5 * 60 * 1000, // Cache duration
  });
}
