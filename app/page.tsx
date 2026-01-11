import { Suspense } from "react";

import { HeroCarouselMovieSection } from "@/components/HeroCarouselMovieSection";
import { MovieSection } from "@/components/MovieSection";
import {
  PopularMoviesSection,
  TrendingHeroCarouselMoviesSection,
  TrendingMoviesSection,
  UpcomingMoviesSection,
} from "@/components/MovieSectionAsync";

export default function Home() {
  return (
    <>
      <section className="bg-carousel">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-4xl font-bold text-white">CineTracker</h1>
          <Suspense
            fallback={
              <HeroCarouselMovieSection
                title="A la une"
                isLoading={true}
                skeletonCount={5}
              />
            }
          >
            <TrendingHeroCarouselMoviesSection />
          </Suspense>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Suspense
          fallback={
            <MovieSection
              title="Films populaires"
              isLoading={true}
              skeletonCount={10}
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
              skeletonCount={10}
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
              skeletonCount={10}
            />
          }
        >
          <UpcomingMoviesSection />
        </Suspense>
      </div>
    </>
  );
}
