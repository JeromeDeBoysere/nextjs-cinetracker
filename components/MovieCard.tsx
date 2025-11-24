import Image from "next/image";
import { MovieType } from "@/lib/schemas/movie";

const TMDB_IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

interface MovieCardProps {
    movie: MovieType;
}

export function MovieCard({ movie }: MovieCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">

            <div className="relative w-full aspect-[2/3] bg-gray-200">
                {movie.poster_path ? (
                    <Image
                        src={`${TMDB_IMAGE_BASE}/w500${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Pas d'image
                    </div>
                )}
            </div>

            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {movie.title}
                </h2>

                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {movie.overview}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="flex items-center gap-1 font-medium">
                    Note: {movie.vote_average.toFixed(1)}
                  </span>
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
            </div>
        </div>
    );
}