import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesStore {
  favorites: number[];
  toggleFavorite: (movieId: number) => void;
  isFavorite: (moviedId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (movieId: number) => {
        const state = get();
        const favorites = state.favorites; // Array of movie ids

        if (favorites.includes(movieId)) {
          set({ favorites: favorites.filter((id) => id !== movieId) });
        } else {
          // IMMUTABILITY RULES
          //
          // React/Zustand only re-renders when it sees a NEW object/array.
          // It compares memory addresses, not the actual content inside.
          //
          // WRONG: array.push(item)
          //    React/Zustand think nothing changed and will not update anything (because same array, same address).
          //
          // CORRECT: [...array, item] (use spread operator)
          //    React/Zustand see the change (because new array, new address) and will update.
          const newFavorites = [...favorites, movieId];
          set({ favorites: newFavorites });
        }
      },
      isFavorite: (movieId: number) => {
        const state = get();
        const favorites = state.favorites;
        return favorites.includes(movieId);
      },
    }),
    {
      name: "cinetracker-favorites",
    }
  )
);
