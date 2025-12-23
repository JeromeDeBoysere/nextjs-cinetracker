"use client";

import Autoplay from "embla-carousel-autoplay";

import { HeroCarouselMovieCardSkeleton } from "@/components/HeroCarouselMovieCardSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";
import { MovieType } from "@/lib/schemas/movie";

import { HeroCarouselMovieCard } from "./HeroCarouselMovieCard";

interface HeroCarouselMovieSectionProps {
  title: string;
  movies?: Array<MovieType>;
  isLoading?: boolean;
  skeletonCount?: number;
}

/**
 * Section displaying a list of movies
 * @param title - Section titlenonn, o
 * @param movies - Array of movies to display
 * @param isLoading - If date is being fetched
 * @param skeletonCount - Number of skeletons
 */
export function HeroCarouselMovieSection({
  title,
  movies,
  isLoading,
  skeletonCount,
}: HeroCarouselMovieSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-8 text-3xl font-bold text-gray-100">{title}</h2>

      <Carousel
        className="w-full"
        opts={{
          align: "center",
          loop: true,
          containScroll: "trimSnaps",
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: true,
          }),
        ]}
      >
        <CarouselContent className="pb-2 lg:-ml-4">
          {isLoading
            ? [...Array(skeletonCount)].map((_, i) => (
                <CarouselItem
                  key={i}
                  className="basis-full lg:basis-[75%] lg:pl-4 xl:basis-[70%]"
                >
                  <HeroCarouselMovieCardSkeleton />
                </CarouselItem>
              ))
            : movies?.map((movie) => (
                <CarouselItem
                  key={movie.id}
                  className="basis-full lg:basis-[75%] lg:pl-4 xl:basis-[70%]"
                >
                  <HeroCarouselMovieCard key={movie.id} movie={movie} />
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
    </section>
  );
}
