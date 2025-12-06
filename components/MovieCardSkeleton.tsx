import { Skeleton } from "@/components/ui/skeleton";

export function MovieCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      {/* Image skeleton */}
      <Skeleton className="aspect-[2/3] w-full" />

      <div className="p-4">
        {/* Title skeleton  */}
        <Skeleton className="mb-2 h-6 w-full" />
        <Skeleton className="mb-2 h-6 w-3/4" />

        {/* Overview skeleton */}
        <Skeleton className="mb-1 h-4 w-full" />
        <Skeleton className="mb-1 h-4 w-full" />
        <Skeleton className="mb-3 h-4 w-2/3" />

        {/* Footer skeletone */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
}
