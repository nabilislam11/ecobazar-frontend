import { Link } from 'react-router-dom';
import { X, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';

export default function Wishlist() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  if (!items.length) {
    return (
      <div className="container-page py-16">
        <EmptyState title="Your wishlist is empty" description="Save products you love to buy them later." action={<Button as={Link} to="/shop" className="mt-4">Browse Products</Button>} />
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Wishlist ({items.length})</h1>
      <div className="divide-y divide-gray-100 rounded-lg border border-gray-100">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4">
            <img src={item.image} alt={item.name} className="h-16 w-16 rounded bg-gray-50 object-cover" />
            <div className="flex-1">
              <Link to={`/product/${item.slug}`} className="text-small font-medium text-gray-900 hover:text-success">{item.name}</Link>
              <p className="text-small text-gray-400">${item.price.toFixed(2)}</p>
            </div>
            <button onClick={() => { addItem(item); removeItem(item.id); }} className="flex items-center gap-2 rounded-pill bg-success px-4 py-2 text-tiny text-white">
              <ShoppingBag size={14} /> Move to Cart
            </button>
            <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-error"><X size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
