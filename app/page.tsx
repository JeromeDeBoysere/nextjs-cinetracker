import Image from "next/image";
import { Suspense } from "react";

import { MovieSection } from "@/components/MovieSection";
import {
  PopularMoviesSection,
  TrendingMoviesSection,
  UpcomingMoviesSection,
} from "@/components/MovieSectionAsync";

const TMDB_IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">CineTracker</h1>

      <div className="relative min-h-96">
        <Image
          src={`${TMDB_IMAGE_BASE}/original/iJQIbOPm81fPEGKt5BPuZmfnA54.jpg`}
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <Suspense
        fallback={
          <MovieSection
            title="Films populaires"
            isLoading={true}
            skeletonCount={4}
          />
        }
      >
        <PopularMoviesSection />
      </Suspense>

      <Suspense
        fallback={
          <MovieSection
            title="Films tendances"
            isLoading={true}
            skeletonCount={4}
          />
        }
      >
        <TrendingMoviesSection />
      </Suspense>

      <Suspense
        fallback={
          <MovieSection
            title="Films à venir"
            isLoading={true}
            skeletonCount={4}
          />
        }
      >
        <UpcomingMoviesSection />
      </Suspense>
    </main>
  );
}
