"use client";

import { useState } from "react";

import { SearchResultItem } from "@/components/search/SearchResultItem";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useSearchMovies } from "@/lib/hooks/useMovies";

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { data, isLoading } = useSearchMovies(debouncedSearch);

  const results = data?.results.slice(0, 12) ?? [];
  const hasResults = results.length > 0;

  return (
    <Popover open={open && search.length > 0} onOpenChange={setOpen}>
      <Command
        shouldFilter={false}
        className="relative overflow-visible [&_[data-slot=command-input-wrapper]]:h-12 [&_[data-slot=command-input-wrapper]]:border-b-0 [&_[data-slot=command-input]]:h-12 [&_[data-slot=command-input]]:text-base"
      >
        <PopoverTrigger asChild>
          <div>
            <CommandInput
              placeholder="Rechercher un film..."
              value={search}
              onValueChange={(value) => {
                setSearch(value);
                if (value.length > 0) setOpen(true);
              }}
              onFocus={() => search.length > 0 && setOpen(true)}
            />
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)]"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <CommandList className="max-h-[calc(100vh-200px)]">
            {isLoading && <CommandEmpty>Recherche en cours...</CommandEmpty>}

            {!isLoading && debouncedSearch && results.length === 0 && (
              <CommandEmpty>
                Aucun résultat pour "{debouncedSearch}"
              </CommandEmpty>
            )}

            {!isLoading && hasResults && (
              <>
                <CommandGroup heading="Résultats">
                  <div className="grid grid-cols-3 gap-4">
                    {results.map((movie) => (
                      <CommandItem
                        key={movie.id}
                        value={String(movie.id)}
                        onSelect={() => {
                          setOpen(false);
                          window.location.href = `/movie/${movie.id}`;
                        }}
                        className="cursor-pointer"
                      >
                        <SearchResultItem movie={movie} />
                      </CommandItem>
                    ))}
                  </div>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      window.location.href = `/search?q=${debouncedSearch}`;
                    }}
                    className="cursor-pointer justify-center font-medium"
                  >
                    Voir tous les résultats ({data?.total_results})
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </PopoverContent>
      </Command>
    </Popover>
  );
}
