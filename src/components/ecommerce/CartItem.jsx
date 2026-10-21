import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  // Backend populate করা product
  const product = item.product || {};
  const productId = product._id;
  const cartItemId = item._id;

  const name = product.title || product.name || "Product";
  const slug = product.slug || productId;
  const price = Number(product.price) || 0;
  const quantity = Number(item.quantity) || 1;
  const fallbackImage = "https://via.placeholder.com/100?text=No+Image";
  const imagePath = product.images?.[0]?.url ||
    product.images?.[0] ||
    product.images ||
    fallbackImage
  const image = imagePath.startsWith("http") ? imagePath : `${API_BASE_URL}/${mainImage.url.replace(/\\/g, "/")
    .replace(/^\/+/, "")}`
  const lineTotal = Number(item.totalPrice) || price * quantity;

  return (
    <div className="flex items-center gap-4 border-b border-gray-100 py-4">
      <img
        src={image}
        alt={name}
        className="h-16 w-16 rounded bg-gray-50 object-cover"
      />

      <div className="flex-1">
        <Link
          to={`/product/${slug}`}
          className="text-small font-medium text-gray-900 hover:text-success"
        >
          {name}
        </Link>
        <p className="text-small text-gray-400">${price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-gray-100 px-2 py-1">
        <button
          type="button"
          onClick={() => updateQuantity(productId, "minus")}
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </button>

        <span className="w-6 text-center text-small">{quantity}</span>

        <button
          type="button"
          onClick={() => updateQuantity(productId, "plus")}
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>

      <p className="w-20 text-right text-small font-medium">
        ${lineTotal.toFixed(2)}
      </p>

      <button
        type="button"
        onClick={() => removeItem(cartItemId)}
        aria-label="Remove item"
        className="text-gray-400 hover:text-error"
      >
        <X size={18} />
      </button>
    </div>
  );
}