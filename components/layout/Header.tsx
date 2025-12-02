import { Navigation } from "@/components/layout/Navigation";

export function Header() {
  return (
    <header className="bg-header text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-5">
          <div>Logo</div>
          <Navigation />
        </div>
      </div>
    </header>
  );
}
