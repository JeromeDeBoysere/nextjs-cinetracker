/**
 * Footer component with copyright information
 * @returns Footer with black background matching header
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm text-gray-400">
          &copy; {currentYear} CineTracker. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
