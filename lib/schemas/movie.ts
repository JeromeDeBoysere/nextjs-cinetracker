import { z } from "zod";

// z.object est un z.ZodSchema
export const movieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

// Schéma pour la réponse de l'API (liste de films)
export const moviesResponseSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export type MovieType = z.infer<typeof movieSchema>;
export type MoviesResponseType = z.infer<typeof moviesResponseSchema>;

// movieSchema est de type z.ZodSchema<MovieType>
// moviesResponseSchema est de type z.ZodSchema<MoviesResponseType>
