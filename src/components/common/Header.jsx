import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, ChevronDown, PhoneCall, MapPin, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Pages', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];

export default function Header() {
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { subtotal, count } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search');
  };

  return (
    <header className="w-full bg-white">
      {/* Top bar */}
      <div className="hidden border-b border-gray-100 lg:block">
        <div className="container-page flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-tiny text-gray-600">
            <MapPin size={14} />
            <span>Store Location: Lincoln- 344, Illinois, Chicago, USA</span>
          </div>
          <div className="flex items-center gap-5 text-tiny text-gray-600">
            <span className="flex items-center gap-1">Eng <ChevronDown size={10} /></span>
            <span className="flex items-center gap-1">USD <ChevronDown size={10} /></span>
            <span className="h-4 w-px bg-gray-100" />
            {isAuthenticated ? (
              <Link to="/account" className="hover:text-success">My Account</Link>
            ) : (
              <span className="flex gap-1">
                <Link to="/login" className="hover:text-success">Sign In</Link>/
                <Link to="/register" className="hover:text-success">Sign Up</Link>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Logo / Search / Cart */}
      <div className="container-page flex items-center justify-between gap-6 py-6">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="text-2xl">🌱</span>
          <span className="text-[32px] font-medium tracking-tight text-[#002603]">Ecobazar</span>
        </Link>

        <form onSubmit={handleSearch} className="hidden max-w-[400px] flex-1 items-center rounded-md border border-gray-100 lg:flex">
          <div className="flex flex-1 items-center gap-2 py-3 pl-4 pr-2">
            <Search size={20} className="text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full text-small text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          <button type="submit" className="rounded-r-md bg-success px-6 py-3.5 text-small font-semibold text-white hover:bg-success-dark">
            Search
          </button>
        </form>

        <div className="flex items-center gap-4">
          <Link to="/wishlist" className="relative hidden lg:block" aria-label="Wishlist">
            <Heart size={24} className="text-gray-700" />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-success-dark text-[10px] text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <span className="hidden h-6 w-px bg-gray-100 lg:block" />
          <Link to="/cart" className="flex items-center gap-3">
            <span className="relative">
              <ShoppingBag size={28} className="text-gray-700" />
              <span className="absolute -right-1 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-white bg-success-dark text-[10px] text-white">
                {count}
              </span>
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-[11px] text-gray-700">Shopping cart:</span>
              <span className="text-small font-medium text-gray-900">${subtotal.toFixed(2)}</span>
            </span>
          </Link>
          <button className="lg:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Nav links bar */}
      <nav className="hidden bg-[#333333] lg:block">
        <div className="container-page flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-small font-medium text-gray-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2 text-small font-medium text-white">
            <PhoneCall size={20} />
            (219) 555-0114
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="rounded px-3 py-2 text-small text-gray-700 hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="rounded px-3 py-2 text-small text-gray-700 hover:bg-gray-50">
              Wishlist ({wishlistCount})
            </Link>
            {!isAuthenticated && (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="rounded px-3 py-2 text-small text-gray-700 hover:bg-gray-50">
                Sign In / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
