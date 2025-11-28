import {
  moviesResponseSchema,
  type MoviesResponseType,
} from "@/lib/schemas/movie";
import { z } from "zod";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

// Fonction helper pour fetch avec validation Zod
async function fetchTMDB<Type>(
  endpoint: string,
  schema: z.ZodSchema<Type>
): Promise<Type> {
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=fr-FR`;

  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Cache pendant 1h
    // Next mettra en cache la réponse. Si le cache n'a pas expiré, Next renverra le cache. Si le cache a expiré, Next renverra le cache et fera une nouvelle requête en arrière plan qui mettra à jour le cache. Cette stratégieu s'apelle ISR (Incremental Static Regeneration)
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.statusText}`);
  }

  const data = await response.json();
  return schema.parse(data); // Validation Zod + typage automatique
}

// Récupérer les films populaires
export async function getPopularMovies(): Promise<MoviesResponseType> {
  return fetchTMDB("/movie/popular", moviesResponseSchema);
}

// Récupérer les films tendance (de la semaine)
export async function getTrendingMovies(): Promise<MoviesResponseType> {
  return fetchTMDB("/trending/movie/week", moviesResponseSchema);
}

// Récupérer les films à venir
export async function getUpcomingMovies(): Promise<MoviesResponseType> {
  return fetchTMDB("/movie/upcoming", moviesResponseSchema);
}
