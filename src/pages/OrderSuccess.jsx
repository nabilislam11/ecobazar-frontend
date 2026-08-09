import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Button from '../components/common/Button';

export default function OrderSuccess() {
  const { state } = useLocation();
  return (
    <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
      <CheckCircle2 className="text-success" size={64} />
      <h1 className="text-2xl font-semibold text-gray-900">Order Placed Successfully!</h1>
      {state?.orderId && <p className="text-small text-gray-400">Order ID: {state.orderId}</p>}
      <p className="max-w-sm text-small text-gray-700">Thanks for shopping with EcoBazar. You'll receive a confirmation shortly.</p>
      <div className="mt-4 flex gap-3">
        <Button as={Link} to="/account/orders" variant="border">View Orders</Button>
        <Button as={Link} to="/shop">Continue Shopping</Button>
      </div>
    </div>
  );
}
