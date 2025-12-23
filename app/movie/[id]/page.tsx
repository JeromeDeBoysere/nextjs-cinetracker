import { Metadata } from "next";
import { notFound } from "next/navigation";

import { MovieDetail } from "@/components/MovieDetail";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const TMDB_IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Fetch movie details from TMDB API with credits
 * @param movieId - Movie ID
 * @returns Movie detail data
 */
async function getMovieDetails(movieId: number) {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR&append_to_response=credits`;

  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

/**
 * Generate metadata for SEO
 * @param params - Route params containing movie ID
 * @returns Metadata object with title, description and Open Graph
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetails(Number(id));

  if (!movie) {
    return {
      title: "Film non trouvé | CineTracker",
    };
  }

  return {
    title: `${movie.title} | CineTracker`,
    description: movie.overview,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: movie.poster_path
        ? [`${TMDB_IMAGE_BASE}/w500${movie.poster_path}`]
        : [],
    },
  };
}

/**
 * Movie detail page component
 * @param params - Route params containing movie ID
 * @returns Movie detail page with full information
 */
export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params;
  const movie = await getMovieDetails(Number(id));

  if (!movie) {
    notFound();
  }

  return <MovieDetail movie={movie} />;
}
