import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton loader for HeroCarouselMovieCard
 * Matches the exact structure and layout of the actual movie card
 */
export function HeroCarouselMovieCardSkeleton() {
  return (
    <Card className="card py-0">
      <CardContent className="flex flex-col items-stretch p-0 lg:flex-row">
        {/* Image skeleton */}
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-gray-200 lg:flex-[2] lg:rounded-xl lg:rounded-e-none">
          <Skeleton className="absolute inset-0 h-full w-full" />

          {/* Favorite button skeleton */}
          <div className="absolute top-2 right-2">
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </div>

        <div className="card flex flex-col rounded-xl bg-white shadow-none lg:flex-[1] lg:rounded-xl">
          <div className="p-4">
            {/* Title skeleton */}
            <Skeleton className="mb-2 h-6 w-full" />
            <Skeleton className="mb-3 h-6 w-3/4" />

            {/* Overview skeleton */}
            <Skeleton className="mb-1 h-4 w-full" />
            <Skeleton className="mb-1 h-4 w-full" />
            <Skeleton className="mb-4 h-4 w-2/3" />

            {/* Footer skeleton */}
            <div className="flex items-center justify-between text-gray-500">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
