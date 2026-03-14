import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import type { Book } from "../data/booksData";
import { StarRating } from "./StarRating";

interface BookCardProps {
  book: Book;
  onSelect: (id: string) => void;
  index?: number;
}

export function BookCard({ book, onSelect, index = 1 }: BookCardProps) {
  const { addToCart } = useCart();

  return (
    <article
      className="book-card group relative flex flex-col bg-[#FAF3E0] border border-amber-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      data-ocid={`catalog.book.item.${index}`}
    >
      {/* Badge */}
      {(book.isBestseller || book.isFeatured || book.isNewArrival) && (
        <div className="absolute top-2 left-2 z-10">
          {book.isBestseller && (
            <span className="bg-amber-700 text-amber-50 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              Bestseller
            </span>
          )}
          {book.isNewArrival && !book.isBestseller && (
            <span className="bg-emerald-700 text-emerald-50 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              New
            </span>
          )}
        </div>
      )}

      {/* Cover - clickable area */}
      <button
        type="button"
        className="relative overflow-hidden h-56 bg-stone-200 w-full text-left"
        onClick={() => onSelect(book.id)}
        aria-label={`View ${book.title}`}
      >
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      {/* Info */}
      <div className="flex flex-col flex-1 p-3 gap-1">
        <p className="text-xs text-amber-700 font-medium uppercase tracking-wide">
          {book.penName ? `${book.author} (as ${book.penName})` : book.author}
        </p>
        <button
          type="button"
          className="font-serif text-sm font-semibold text-stone-800 leading-tight line-clamp-2 text-left hover:text-amber-800"
          onClick={() => onSelect(book.id)}
        >
          {book.title}
        </button>
        {book.series && (
          <p className="text-xs text-stone-500 italic">
            {book.series}
            {book.seriesNumber ? ` #${book.seriesNumber}` : ""}
          </p>
        )}
        <StarRating rating={book.rating} reviewCount={book.reviewCount} />
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-serif text-base font-bold text-amber-900">
            ${book.price.toFixed(2)}
          </span>
          <button
            type="button"
            className="flex items-center gap-1 bg-amber-800 hover:bg-amber-700 text-amber-50 text-xs px-3 py-1.5 rounded-full transition-colors duration-200"
            onClick={() => addToCart(book)}
            data-ocid={`catalog.add_cart_button.${index}`}
          >
            <ShoppingCart size={12} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
