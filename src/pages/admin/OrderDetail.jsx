import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as orderService from '../../services/orderService';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';
import Select from '../../components/common/Select';
import Loader from '../../components/common/Loader';

const statuses = ['Order received', 'Processing', 'On the way', 'Delivered', 'Cancelled'];

export default function AdminOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => { orderService.getOrderById(id).then(setOrder); }, [id]);

  const changeStatus = async (status) => {
    const updated = await orderService.updateOrderStatus(id, status);
    setOrder(updated);
    toast.success('Order status updated');
  };

  if (!order) return <Loader />;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{order.id}</h1>
          <p className="text-tiny text-gray-400">{new Date(order.date).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-3">
          <OrderStatusBadge status={order.status} />
          <Select value={order.status} onChange={(e) => changeStatus(e.target.value)} className="!py-2 w-44">
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
        </div>
      </div>
      <div className="rounded-lg border border-gray-100 bg-white p-6">
        <h2 className="mb-4 text-medium font-semibold text-gray-900">Items</h2>
        {order.items.map((item) => (
          <div key={item.productId} className="flex justify-between border-b border-gray-100 py-2 text-small">
            <span>{item.name} × {item.quantity}</span><span>${item.subtotal.toFixed(2)}</span>
          </div>
        ))}
        <div className="mt-3 flex justify-between text-medium font-semibold text-gray-900">
          <span>Total</span><span>${order.total.toFixed(2)}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-100 bg-white p-6">
          <h2 className="mb-2 text-medium font-semibold text-gray-900">Shipping</h2>
          <p className="text-small text-gray-700">{order.shipping.name}</p>
          <p className="text-small text-gray-400">{order.shipping.address}</p>
          <p className="text-small text-gray-400">{order.shipping.email}</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-white p-6">
          <h2 className="mb-2 text-medium font-semibold text-gray-900">Payment</h2>
          <p className="text-small text-gray-700">{order.paymentMethod}</p>
          <p className="text-small text-gray-400">Status: {order.paymentStatus}</p>
        </div>
      </div>
    </div>
  );
}
