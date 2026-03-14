import { useState } from "react";
import { CartDrawer } from "./components/CartDrawer";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import { getBestsellers, getNewArrivals } from "./data/booksData";
import { AdminPage } from "./pages/AdminPage";
import { BookDetailPage } from "./pages/BookDetailPage";
import { CatalogPage } from "./pages/CatalogPage";
import { CheckoutCancelPage } from "./pages/CheckoutCancelPage";
import { CheckoutSuccessPage } from "./pages/CheckoutSuccessPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";

type Page =
  | "home"
  | "catalog"
  | "bestsellers"
  | "new-arrivals"
  | "book"
  | "contact"
  | "admin"
  | "checkout-success"
  | "checkout-cancel";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedBookId, setSelectedBookId] = useState<string>("");
  const [catalogSearch, setCatalogSearch] = useState("");

  const navigate = (p: string) => {
    setPage(p as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectBook = (id: string) => {
    setSelectedBookId(id);
    setPage("book");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (q: string) => {
    setCatalogSearch(q);
    setPage("catalog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    if (page === "home")
      return <HomePage onNavigate={navigate} onSelectBook={selectBook} />;
    if (page === "catalog")
      return (
        <CatalogPage initialSearch={catalogSearch} onSelectBook={selectBook} />
      );
    if (page === "bestsellers") {
      return (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="font-serif text-3xl font-bold text-stone-800 mb-6">
            Bestsellers
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {getBestsellers().map((b, i) => (
              <div key={b.id}>
                <CatalogBookCard book={b} onSelect={selectBook} index={i + 1} />
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (page === "new-arrivals") {
      return (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="font-serif text-3xl font-bold text-stone-800 mb-6">
            New Arrivals
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {getNewArrivals().map((b, i) => (
              <div key={b.id}>
                <CatalogBookCard book={b} onSelect={selectBook} index={i + 1} />
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (page === "book")
      return (
        <BookDetailPage
          bookId={selectedBookId}
          onNavigate={navigate}
          onSelectBook={selectBook}
        />
      );
    if (page === "contact") return <ContactPage />;
    if (page === "admin") return <AdminPage />;
    if (page === "checkout-success")
      return <CheckoutSuccessPage onNavigate={navigate} />;
    if (page === "checkout-cancel")
      return <CheckoutCancelPage onNavigate={navigate} />;
    return <HomePage onNavigate={navigate} onSelectBook={selectBook} />;
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#F5ECD7] flex flex-col">
        <Navbar
          currentPage={page}
          onNavigate={navigate}
          onSearch={handleSearch}
        />
        <main className="flex-1">{renderPage()}</main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

import { BookCard } from "./components/BookCard";
import type { Book } from "./data/booksData";
function CatalogBookCard({
  book,
  onSelect,
  index,
}: { book: Book; onSelect: (id: string) => void; index: number }) {
  return <BookCard book={book} onSelect={onSelect} index={index} />;
}
