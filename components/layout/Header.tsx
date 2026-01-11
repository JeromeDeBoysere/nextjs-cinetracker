import { Navigation } from "@/components/layout/Navigation";
import { SearchBar } from "@/components/search/SearchBar";

export function Header() {
  return (
    <header className="bg-header flex-cent fixed top-0 right-0 left-0 flex h-20 flex-col justify-center text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-5">
          <div>Projet 2 : CineTracker</div>
          <SearchBar />
          <Navigation />
        </div>
      </div>
    </header>
  );
}
