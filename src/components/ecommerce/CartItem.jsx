import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center gap-4 border-b border-gray-100 py-4">
      <img src={item.image} alt={item.name} className="h-16 w-16 rounded bg-gray-50 object-cover" />
      <div className="flex-1">
        <Link to={`/product/${item.slug}`} className="text-small font-medium text-gray-900 hover:text-success">
          {item.name}
        </Link>
        <p className="text-small text-gray-400">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-gray-100 px-2 py-1">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
          <Minus size={14} />
        </button>
        <span className="w-6 text-center text-small">{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
          <Plus size={14} />
        </button>
      </div>
      <p className="w-20 text-right text-small font-medium">${(item.price * item.quantity).toFixed(2)}</p>
      <button onClick={() => removeItem(item.id)} aria-label="Remove item" className="text-gray-400 hover:text-error">
        <X size={18} />
      </button>
    </div>
  );
}
