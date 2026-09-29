import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Search, Heart, ShoppingBag, ChevronDown, PhoneCall, MapPin, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { getCategories, getProductsByCategory } from '../../services/categoryService';

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { subtotal, count } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { isAuthenticated, user } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search');
  };
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategories()
        const categoryList = Array.isArray(response) ? response : response?.data || [];
        setCategories(categoryList)

      } catch (error) {
        console.error(error);

      }
    }
    loadCategories()
  }, [])
  const { id } = useParams()
  useEffect(() => {
    const loadProductsByCategory = async () => {
      try {
        const response = await getProductsByCategory(id)
        setProducts(response)
      } catch (error) {
        console.log(error);


      }
    }
    loadProductsByCategory()
  }, [id])

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
              <Link to="/account" className="hover:text-success">{user?.firstName || " My Account"}</Link>
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
          <div className="min-w-0 flex-1  overflow-hidden">
            <div className="flex items-center gap-7 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {categories.filter((category) => category.status === "active").map((category) => (
                <Link
                  key={category._id}
                  to={`/category/${category._id}`}
                  className="shrink-0 text-small font-medium text-gray-200 transition-colors duration-200 hover:text-white"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-small font-medium text-white">
            <PhoneCall size={20} />
            (219) 555-0114
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white shadow-lg lg:hidden">
          <div className="px-4 py-5">

            {/* Category title */}
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">
                Categories
              </h3>

              <span className="text-xs text-gray-400">
                {categories.filter(
                  (category) => category.status === "active"
                ).length}{" "}
                categories
              </span>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 gap-2">
              {categories
                .filter((category) => category.status === "active")
                .map((category) => (
                  <Link
                    key={category._id}
                    to={`/category/${category._id}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-[44px] items-center rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-gray-200 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <span className="truncate">
                      {category.name}
                    </span>
                  </Link>
                ))}
            </div>

            {/* Other links */}
            <div className="mt-4 border-t border-gray-100 pt-3">

              <Link
                to="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span>Wishlist</span>

                {wishlistCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-success-dark px-1.5 text-[10px] text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {!isAuthenticated && (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Sign In / Sign Up
                </Link>
              )}

            </div>
          </div>
        </div>
      )}
    </header>
  );
}
