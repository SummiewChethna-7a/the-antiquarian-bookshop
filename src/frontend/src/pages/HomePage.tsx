import { BookOpen, ChevronRight, Sparkles, Star } from "lucide-react";
import { BookCard } from "../components/BookCard";
import {
  AUTHORS,
  getBestsellers,
  getFeaturedBooks,
  getNewArrivals,
} from "../data/booksData";

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSelectBook: (id: string) => void;
}

function SectionHeader({
  title,
  subtitle,
  onViewAll,
}: { title: string; subtitle?: string; onViewAll?: () => void }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-800">
          {title}
        </h2>
        {subtitle && <p className="text-stone-500 text-sm mt-1">{subtitle}</p>}
      </div>
      {onViewAll && (
        <button
          type="button"
          onClick={onViewAll}
          className="flex items-center gap-1 text-amber-700 hover:text-amber-900 text-sm font-medium transition-colors"
        >
          View all <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

export function HomePage({ onNavigate, onSelectBook }: HomePageProps) {
  const featured = getFeaturedBooks().slice(0, 8);
  const bestsellers = getBestsellers().slice(0, 8);
  const newArrivals = getNewArrivals().slice(0, 6);

  const authorSpotlights = [
    {
      name: "J.K. Rowling",
      genre: "Fantasy",
      books: "10 books",
      emoji: "\u2728",
    },
    {
      name: "Dan Brown",
      genre: "Thriller",
      books: "7 books",
      emoji: "\uD83D\uDD12",
    },
    {
      name: "C.S. Lewis",
      genre: "Fantasy",
      books: "7 books",
      emoji: "\uD83E\uDD81",
    },
    {
      name: "Ashwin Sanghi",
      genre: "Historical",
      books: "5 books",
      emoji: "\uD83D\uDCD5",
    },
    {
      name: "James Patterson",
      genre: "Mystery",
      books: "6 books",
      emoji: "\uD83D\uDD0D",
    },
    {
      name: "Mary Shelley",
      genre: "Gothic Horror",
      books: "4 books",
      emoji: "\u26A1",
    },
    {
      name: "Rina Kent",
      genre: "Dark Romance",
      books: "8 books",
      emoji: "\u2764",
    },
    {
      name: "More coming",
      genre: "All Genres",
      books: "Explore all",
      emoji: "\uD83D\uDCDA",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <div
        className="relative h-[480px] md:h-[580px] flex items-center justify-center overflow-hidden"
        data-ocid="home.hero_section"
      >
        <img
          src="/assets/generated/hero-bookshop-autumn.dim_1200x500.jpg"
          alt="The Antiquarian Bookshop"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0F06]/90 via-[#1A0F06]/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={20} className="text-amber-400" />
              <span className="text-amber-400 text-sm font-medium tracking-widest uppercase font-serif">
                Est. 2024
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-amber-50 leading-tight mb-4">
              The Antiquarian
              <span className="block text-amber-400">Bookshop</span>
            </h1>
            <p className="text-amber-200/80 text-lg mb-6 font-serif italic">
              Where Every Page Tells a Story
            </p>
            <p className="text-stone-300 text-sm mb-8 leading-relaxed max-w-md">
              Lose yourself in worlds of mystery, magic, and wonder. Curated
              collections from the finest authors, delivered to your door.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="bg-amber-700 hover:bg-amber-600 text-amber-50 px-6 py-3 rounded-full font-serif font-semibold transition-colors shadow-lg"
                onClick={() => onNavigate("catalog")}
                data-ocid="home.browse_button"
              >
                Browse Collection
              </button>
              <button
                type="button"
                className="border border-amber-400/60 text-amber-300 hover:bg-amber-400/10 px-6 py-3 rounded-full font-serif transition-colors"
                onClick={() => onNavigate("bestsellers")}
                data-ocid="home.bestsellers_button"
              >
                Bestsellers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="bg-amber-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-16">
          {[
            { icon: <BookOpen size={16} />, label: "Books", value: "60+" },
            {
              icon: <Star size={16} />,
              label: "Authors",
              value: AUTHORS.length.toString(),
            },
            { icon: <Sparkles size={16} />, label: "Genres", value: "8+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 text-amber-100"
            >
              {stat.icon}
              <span className="font-serif text-xl font-bold">{stat.value}</span>
              <span className="text-amber-300 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Featured */}
        <section className="mb-12" data-ocid="home.featured_section">
          <SectionHeader
            title="Featured Books"
            subtitle="Handpicked by our curators just for you"
            onViewAll={() => onNavigate("catalog")}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {featured.map((book, i) => (
              <BookCard
                key={book.id}
                book={book}
                onSelect={onSelectBook}
                index={i + 1}
              />
            ))}
          </div>
        </section>

        {/* Autumn divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-amber-200" />
          <span className="text-amber-400 text-lg">&#127810;</span>
          <div className="flex-1 h-px bg-amber-200" />
        </div>

        {/* Bestsellers */}
        <section className="mb-12" data-ocid="home.bestsellers_section">
          <SectionHeader
            title="Bestsellers"
            subtitle="The books everyone is talking about"
            onViewAll={() => onNavigate("bestsellers")}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {bestsellers.map((book, i) => (
              <BookCard
                key={book.id}
                book={book}
                onSelect={onSelectBook}
                index={i + 1}
              />
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        {newArrivals.length > 0 && (
          <section className="mb-12" data-ocid="home.new_arrivals_section">
            <SectionHeader
              title="New Arrivals"
              subtitle="Fresh titles just arrived on our shelves"
              onViewAll={() => onNavigate("new-arrivals")}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {newArrivals.map((book, i) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onSelect={onSelectBook}
                  index={i + 1}
                />
              ))}
            </div>
          </section>
        )}

        {/* Author spotlight */}
        <section
          className="mb-4 bg-amber-900/10 border border-amber-200 rounded-2xl p-6 md:p-10"
          data-ocid="home.authors_section"
        >
          <SectionHeader
            title="Beloved Authors"
            subtitle="Masters of their craft, waiting to transport you"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {authorSpotlights.map((author, i) => (
              <button
                key={author.name}
                type="button"
                onClick={() => onNavigate("catalog")}
                data-ocid={`home.author_card.${i + 1}`}
                className="flex flex-col items-center text-center p-4 bg-white/60 hover:bg-amber-50 border border-amber-200 rounded-xl transition-colors cursor-pointer group"
              >
                <span className="text-2xl mb-2">{author.emoji}</span>
                <p className="font-serif text-sm font-semibold text-stone-800 group-hover:text-amber-800">
                  {author.name}
                </p>
                <p className="text-xs text-amber-600 mt-0.5">{author.genre}</p>
                <p className="text-xs text-stone-400 mt-0.5">{author.books}</p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
