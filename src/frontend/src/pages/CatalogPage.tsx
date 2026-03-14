import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { BookCard } from "../components/BookCard";
import { AUTHORS, BOOKS, GENRES } from "../data/booksData";

interface CatalogPageProps {
  initialSearch?: string;
  onSelectBook: (id: string) => void;
}

export function CatalogPage({
  initialSearch = "",
  onSelectBook,
}: CatalogPageProps) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [sortBy, setSortBy] = useState<
    "title" | "price-asc" | "price-desc" | "rating"
  >("rating");
  const [showFilters, setShowFilters] = useState(false);
  const ITEMS_PER_PAGE = 20;
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...BOOKS];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.penName?.toLowerCase().includes(q) ||
          b.genre.toLowerCase().includes(q),
      );
    }
    if (selectedGenre) result = result.filter((b) => b.genre === selectedGenre);
    if (selectedAuthor)
      result = result.filter((b) => b.author === selectedAuthor);

    if (sortBy === "title")
      result.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [search, selectedGenre, selectedAuthor, sortBy]);

  const paginated = filtered.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  const clearFilters = () => {
    setSearch("");
    setSelectedGenre("");
    setSelectedAuthor("");
    setSortBy("rating");
    setPage(1);
  };

  const activeFilterCount = [selectedGenre, selectedAuthor].filter(
    Boolean,
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" data-ocid="catalog.page">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-stone-800 mb-1">
          Our Collection
        </h1>
        <p className="text-stone-500 text-sm">{filtered.length} books found</p>
      </div>

      {/* Search + Filter bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-52">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            placeholder="Search by title, author or genre..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 bg-white border border-amber-200 rounded-full text-sm focus:outline-none focus:border-amber-500 text-stone-700"
            data-ocid="catalog.search_input"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="border border-amber-200 rounded-full px-4 py-2 text-sm bg-white text-stone-700 focus:outline-none"
          data-ocid="catalog.sort_select"
        >
          <option value="rating">Top Rated</option>
          <option value="title">Title A-Z</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-colors ${
            activeFilterCount > 0
              ? "bg-amber-700 text-white border-amber-700"
              : "border-amber-200 bg-white text-stone-700 hover:bg-amber-50"
          }`}
          data-ocid="catalog.filter.toggle"
        >
          <SlidersHorizontal size={14} />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
        {(activeFilterCount > 0 || search) && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-2 rounded-full text-xs border border-red-200 text-red-600 hover:bg-red-50"
            data-ocid="catalog.clear_filters_button"
          >
            <X size={12} /> Clear
          </button>
        )}
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div
          className="flex flex-wrap gap-6 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6"
          data-ocid="catalog.filters_panel"
        >
          <div>
            <p className="text-xs font-semibold text-stone-600 mb-2 uppercase tracking-wide">
              Genre
            </p>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => {
                    setSelectedGenre(selectedGenre === g ? "" : g);
                    setPage(1);
                  }}
                  className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                    selectedGenre === g
                      ? "bg-amber-700 text-white border-amber-700"
                      : "border-amber-300 text-stone-700 hover:bg-amber-100"
                  }`}
                  data-ocid={`catalog.genre_filter.${g.toLowerCase().replace(/\s+/g, "_")}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-600 mb-2 uppercase tracking-wide">
              Author
            </p>
            <select
              value={selectedAuthor}
              onChange={(e) => {
                setSelectedAuthor(e.target.value);
                setPage(1);
              }}
              className="border border-amber-200 rounded-lg px-3 py-1.5 text-sm bg-white text-stone-700 focus:outline-none"
              data-ocid="catalog.filter.select"
            >
              <option value="">All Authors</option>
              {AUTHORS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 gap-3 text-stone-400"
          data-ocid="catalog.empty_state"
        >
          <Search size={40} className="opacity-30" />
          <p className="font-serif text-xl">No books found</p>
          <button
            type="button"
            onClick={clearFilters}
            className="text-amber-700 hover:underline text-sm"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {paginated.map((book, i) => (
              <BookCard
                key={book.id}
                book={book}
                onSelect={onSelectBook}
                index={i + 1}
              />
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                className="px-6 py-2 bg-amber-800 hover:bg-amber-700 text-amber-50 rounded-full font-serif transition-colors"
                data-ocid="catalog.pagination_next"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
