import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import Rating from './Rating';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

// Matches Figma "Product 5N" card component: image, name, price/sale, rating,
// hover state reveals wishlist / quick-view / add-to-cart action icons.
export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group relative w-full border border-gray-100 bg-white transition-shadow hover:border-success hover:shadow-hover">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-50 p-3">
          {product.discount > 0 && (
            <span className="absolute left-3 top-3 z-10 rounded bg-error px-2 py-1 text-tiny text-white">
              Sale {product.discount}%
            </span>
          )}
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5 p-3">
          <p className="truncate text-small text-gray-700 group-hover:text-success">{product.name}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-medium font-medium text-gray-900">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-small text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>
          <Rating value={product.rating} />
        </div>
      </Link>

      <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          aria-label="Add to wishlist"
          onClick={() => toggleItem(product)}
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow ${wishlisted ? 'text-error' : 'text-gray-700'}`}
        >
          <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
        <button
          aria-label="Quick view"
          onClick={() => toast('Quick view coming soon')}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow"
        >
          <Eye size={18} />
        </button>
      </div>

      <button
        aria-label="Add to cart"
        onClick={() => addItem(product)}
        className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-success text-white shadow transition-transform hover:scale-105"
      >
        <ShoppingBag size={18} />
      </button>
    </div>
  );
}
