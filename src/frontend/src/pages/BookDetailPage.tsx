import { ArrowLeft, BookOpen, Heart, ShoppingCart } from "lucide-react";
import { BookCard } from "../components/BookCard";
import { StarRating } from "../components/StarRating";
import { useCart } from "../context/CartContext";
import { BOOKS, getBookById } from "../data/booksData";

interface BookDetailPageProps {
  bookId: string;
  onNavigate: (page: string) => void;
  onSelectBook: (id: string) => void;
}

export function BookDetailPage({
  bookId,
  onNavigate,
  onSelectBook,
}: BookDetailPageProps) {
  const book = getBookById(bookId);
  const { addToCart } = useCart();

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="font-serif text-2xl text-stone-600">Book not found</p>
        <button
          type="button"
          onClick={() => onNavigate("catalog")}
          className="mt-4 text-amber-700 hover:underline"
        >
          Back to catalog
        </button>
      </div>
    );
  }

  const related = BOOKS.filter(
    (b) =>
      b.id !== book.id && (b.author === book.author || b.genre === book.genre),
  ).slice(0, 5);

  const metaItems = [
    {
      icon: <BookOpen size={14} />,
      label: "Pages",
      value: book.pages.toString(),
    },
    { icon: null, label: "Published", value: book.publishedYear.toString() },
    { icon: null, label: "ISBN", value: book.isbn },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" data-ocid="book.detail_page">
      {/* Breadcrumb */}
      <button
        type="button"
        onClick={() => onNavigate("catalog")}
        className="flex items-center gap-1 text-amber-700 hover:text-amber-900 text-sm mb-6 font-medium"
        data-ocid="book.back_button"
      >
        <ArrowLeft size={14} /> Back to Catalog
      </button>

      <div className="grid md:grid-cols-[300px_1fr] gap-10">
        {/* Cover */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full object-cover"
            />
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full bg-amber-800 hover:bg-amber-700 text-amber-50 py-3 rounded-full font-serif font-semibold transition-colors shadow-lg"
            onClick={() => addToCart(book)}
            data-ocid="book.add_to_cart_button"
          >
            <ShoppingCart size={18} />
            Add to Cart &#8212; ${book.price.toFixed(2)}
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full border border-amber-400 text-amber-700 hover:bg-amber-50 py-3 rounded-full font-serif transition-colors"
            data-ocid="book.wishlist_button"
          >
            <Heart size={16} /> Add to Wishlist
          </button>
        </div>

        {/* Details */}
        <div>
          <div className="mb-1">
            <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              {book.genre}
            </span>
            {book.subgenre && (
              <span className="ml-2 text-xs text-stone-500">
                {book.subgenre}
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mt-3 leading-tight">
            {book.title}
          </h1>

          <p className="text-amber-700 font-medium mt-2">
            {book.author}
            {book.penName && (
              <span className="text-stone-500 font-normal text-sm ml-2">
                (pen name: {book.penName})
              </span>
            )}
          </p>

          {book.series && (
            <p className="text-stone-500 text-sm italic mt-1">
              {book.series}
              {book.seriesNumber ? ` \u2014 Book ${book.seriesNumber}` : ""}
            </p>
          )}

          <div className="flex items-center gap-3 mt-3">
            <StarRating
              rating={book.rating}
              reviewCount={book.reviewCount}
              size="md"
            />
            <span className="text-stone-500 text-sm">
              {book.rating.toFixed(1)} / 5.0
            </span>
          </div>

          <p className="font-serif text-3xl font-bold text-amber-900 mt-4">
            ${book.price.toFixed(2)}
          </p>

          <div className="border-t border-b border-amber-100 py-5 mt-5">
            <h3 className="font-serif text-lg font-semibold text-stone-700 mb-2">
              About this book
            </h3>
            <p className="text-stone-600 leading-relaxed">{book.description}</p>
          </div>

          {/* Book metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">
            {metaItems.map((meta) => (
              <div
                key={meta.label}
                className="bg-amber-50 border border-amber-100 rounded-lg p-3"
              >
                <p className="text-xs text-stone-400 uppercase tracking-wide">
                  {meta.label}
                </p>
                <p className="font-medium text-stone-700 text-sm mt-0.5">
                  {meta.value}
                </p>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-5">
            {book.isFeatured && (
              <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-medium">
                Featured
              </span>
            )}
            {book.isBestseller && (
              <span className="bg-amber-700 text-amber-50 text-xs px-3 py-1 rounded-full font-medium">
                Bestseller
              </span>
            )}
            {book.isNewArrival && (
              <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-medium">
                New Arrival
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Related Books */}
      {related.length > 0 && (
        <div className="mt-16" data-ocid="book.related_section">
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-6">
            You might also enjoy
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {related.map((b, i) => (
              <BookCard
                key={b.id}
                book={b}
                onSelect={onSelectBook}
                index={i + 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
