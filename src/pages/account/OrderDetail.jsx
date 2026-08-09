import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as orderService from '../../services/orderService';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';
import Loader from '../../components/common/Loader';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => { orderService.getOrderById(id).then(setOrder); }, [id]);
  if (!order) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-lg border border-gray-100 p-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{order.id}</h1>
          <p className="text-tiny text-gray-400">{new Date(order.date).toLocaleDateString()}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      <div className="rounded-lg border border-gray-100 p-6">
        <h2 className="mb-4 text-medium font-semibold text-gray-900">Items</h2>
        {order.items.map((item) => (
          <div key={item.productId} className="flex justify-between border-b border-gray-100 py-2 text-small">
            <span>{item.name} × {item.quantity}</span>
            <span>${item.subtotal.toFixed(2)}</span>
          </div>
        ))}
        <div className="mt-3 flex justify-between text-medium font-semibold text-gray-900">
          <span>Total</span><span>${order.total.toFixed(2)}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-100 p-6">
          <h2 className="mb-2 text-medium font-semibold text-gray-900">Shipping</h2>
          <p className="text-small text-gray-700">{order.shipping.name}</p>
          <p className="text-small text-gray-400">{order.shipping.address}</p>
        </div>
        <div className="rounded-lg border border-gray-100 p-6">
          <h2 className="mb-2 text-medium font-semibold text-gray-900">Payment</h2>
          <p className="text-small text-gray-700">{order.paymentMethod}</p>
          <p className="text-small text-gray-400">Status: {order.paymentStatus}</p>
        </div>
      </div>
    </div>
  );
}
