import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import EmptyState from '../../components/common/EmptyState';

export default function AccountWishlist() {
  const { items } = useWishlist();
  if (!items.length) return <EmptyState title="Your wishlist is empty" />;
  return (
    <div className="rounded-lg border border-gray-100 divide-y divide-gray-100">
      {items.map((i) => (
        <Link key={i.id} to={`/product/${i.slug}`} className="flex items-center gap-4 p-4 hover:bg-gray-50">
          <img src={i.image} alt={i.name} className="h-12 w-12 rounded bg-gray-50 object-cover" />
          <span className="text-small text-gray-900">{i.name}</span>
        </Link>
      ))}
    </div>
  );
}
