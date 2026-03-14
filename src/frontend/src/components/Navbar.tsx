import { BookOpen, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onSearch: (q: string) => void;
}

export function Navbar({ currentPage, onNavigate, onSearch }: NavbarProps) {
  const { totalItems, setIsOpen } = useCart();
  const { identity, login, clear } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navLinks = [
    { label: "Home", page: "home" },
    { label: "Catalog", page: "catalog" },
    { label: "Bestsellers", page: "bestsellers" },
    { label: "New Arrivals", page: "new-arrivals" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <nav className="bg-[#2C1A0E] sticky top-0 z-30 shadow-lg border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-2 group"
            onClick={() => onNavigate("home")}
            data-ocid="nav.home_link"
          >
            <BookOpen
              size={24}
              className="text-amber-400 group-hover:text-amber-300 transition-colors"
            />
            <div className="hidden sm:block">
              <p className="font-serif text-amber-100 font-bold leading-none text-base">
                The Antiquarian
              </p>
              <p className="font-serif text-amber-400 text-xs leading-none">
                Bookshop
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.page}
                type="button"
                onClick={() => onNavigate(link.page)}
                data-ocid={`nav.${link.page}_link`}
                className={`font-serif text-sm transition-colors ${
                  currentPage === link.page
                    ? "text-amber-400 border-b border-amber-400"
                    : "text-amber-200 hover:text-amber-400"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            {showSearch ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books..."
                  className="bg-amber-900/40 text-amber-100 placeholder-amber-400/60 border border-amber-700 rounded-full px-3 py-1 text-sm focus:outline-none focus:border-amber-400 w-44"
                  data-ocid="nav.search_input"
                />
                <button
                  type="submit"
                  className="text-amber-300 hover:text-amber-100"
                >
                  <Search size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setShowSearch(false)}
                  className="text-amber-400"
                >
                  <X size={16} />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setShowSearch(true)}
                className="text-amber-300 hover:text-amber-100 p-1"
                data-ocid="nav.search_button"
              >
                <Search size={20} />
              </button>
            )}

            {/* Cart */}
            <button
              type="button"
              className="relative text-amber-300 hover:text-amber-100 p-1"
              onClick={() => setIsOpen(true)}
              data-ocid="nav.cart_button"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate("admin")}
                  className="text-amber-300 hover:text-amber-100 p-1"
                  data-ocid="nav.admin_link"
                >
                  <User size={20} />
                </button>
                <button
                  type="button"
                  onClick={clear}
                  className="text-xs text-amber-400 hover:text-amber-200 font-serif"
                  data-ocid="nav.logout_button"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={login}
                className="text-xs bg-amber-700 hover:bg-amber-600 text-amber-50 px-3 py-1.5 rounded-full font-serif transition-colors"
                data-ocid="nav.login_button"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu */}
            <button
              type="button"
              className="md:hidden text-amber-300 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-amber-900/50 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.page}
                type="button"
                onClick={() => {
                  onNavigate(link.page);
                  setMenuOpen(false);
                }}
                className={`font-serif text-sm text-left px-2 py-1 ${
                  currentPage === link.page
                    ? "text-amber-400"
                    : "text-amber-200"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
