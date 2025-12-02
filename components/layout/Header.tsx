import { Navigation } from "@/components/layout/Navigation";

export function Header() {
  return (
    <header className="bg-header fixed top-0 right-0 left-0 bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-5">
          <div>Logo</div>
          <Navigation />
        </div>
      </div>
    </header>
  );
}
