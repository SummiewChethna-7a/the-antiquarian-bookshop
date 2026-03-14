import { BookOpen, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1A0F06] border-t border-amber-900/40 text-amber-200/70 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={20} className="text-amber-500" />
              <span className="font-serif text-amber-200 font-bold">
                The Antiquarian Bookshop
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              A curated collection of timeless tales and modern masterpieces.
              Where every page tells a story.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-amber-300 font-semibold mb-3">
              Collections
            </h4>
            <ul className="space-y-1 text-sm">
              <li>Fantasy & Adventure</li>
              <li>Mystery & Thriller</li>
              <li>Dark Romance</li>
              <li>Historical Fiction</li>
              <li>Gothic Horror</li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-amber-300 font-semibold mb-3">
              Authors
            </h4>
            <ul className="space-y-1 text-sm">
              <li>J.K. Rowling</li>
              <li>Dan Brown</li>
              <li>C.S. Lewis</li>
              <li>Ashwin Sanghi</li>
              <li>Rina Kent &amp; more</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-amber-900/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} The Antiquarian Bookshop. All
            rights reserved.
          </p>
          <p className="text-xs flex items-center gap-1">
            Made with <Heart size={12} className="text-amber-500" /> for book
            lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
