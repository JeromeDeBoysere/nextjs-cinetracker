"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useFavoritesStore } from "@/lib/store/useFavoritesStore";

/**
 * Main navigation menu
 * @returns Navigation menu with links to main pages
 */
export function Navigation() {
  const { favorites } = useFavoritesStore();
  const navLinks = [
    { href: "/favorites", label: "Mes favoris (" + favorites.length + ") ❤️" },
  ] as const;

  const pathname = usePathname();

  return (
    <nav className="font-heading text-sm font-semibold uppercase">
      <ul className="flex gap-6">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`rounded-lg px-2 py-2 transition-colors ${
                pathname === link.href
                  ? "bg-white text-gray-900"
                  : "text-white hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
