import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MovieType } from "@/lib/schemas/movie";
import { useFavoritesStore } from "@/lib/store/useFavoritesStore";

interface AddToFavoriteProps {
  movie: MovieType;
}
export function AddToFavorite({ movie }: AddToFavoriteProps) {
  const [mounted, setMounted] = useState(false);
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isLiked = mounted && isFavorite(movie.id);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => toggleFavorite(movie.id)}
          variant="default"
          className={`absolute top-2 right-2 cursor-pointer ${
            isLiked
              ? "bg-[#d23a3a57] hover:bg-[#d23a3a6e]"
              : "bg-[#d7d7d757] hover:bg-[#d7d7d76e]"
          }`}
        >
          {isLiked ? "❤️" : "🤍"}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isLiked ? "Retirer de mes favoris" : "Ajouter à mes favoris"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
