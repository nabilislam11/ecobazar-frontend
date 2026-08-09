import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/ecommerce/CartItem';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import toast from 'react-hot-toast';

export default function Cart() {
  const { items, subtotal, clearCart } = useCart();
  const [coupon, setCoupon] = useState('');
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5;
  const total = subtotal + shipping;

  if (!items.length) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title="Your cart is empty"
          description="Looks like you haven't added anything yet."
          action={<Button as={Link} to="/shop" className="mt-4">Continue Shopping</Button>}
        />
      </div>
    );
  }

  return (
    <div className="container-page grid grid-cols-1 gap-10 py-10 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">Shopping Cart</h1>
        {items.map((item) => <CartItem key={item.id} item={item} />)}
        <div className="mt-6 flex items-center justify-between">
          <Button as={Link} to="/shop" variant="border" size="sm">Continue Shopping</Button>
          <button onClick={clearCart} className="text-small text-error hover:underline">Clear Cart</button>
        </div>
      </div>
      <div className="h-fit rounded-lg border border-gray-100 p-6">
        <h2 className="mb-4 text-medium font-semibold text-gray-900">Order Summary</h2>
        <div className="mb-4 flex gap-2">
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Coupon code"
            className="flex-1 rounded border border-gray-100 px-3 py-2 text-small focus:border-success"
          />
          <button
            onClick={() => toast.success(coupon ? 'Coupon applied' : 'Enter a coupon code')}
            className="rounded bg-gray-900 px-4 text-small text-white"
          >
            Apply
          </button>
        </div>
        <div className="space-y-2 border-t border-gray-100 pt-4 text-small">
          <div className="flex justify-between text-gray-700"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-gray-700"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
          <div className="flex justify-between border-t border-gray-100 pt-2 text-medium font-semibold text-gray-900"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>
        <Button as={Link} to="/checkout" size="lg" className="mt-6 w-full">Proceed to Checkout</Button>
      </div>
    </div>
  );
}
