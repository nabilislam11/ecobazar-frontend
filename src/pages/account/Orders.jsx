import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as orderService from '../../services/orderService';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';
import EmptyState from '../../components/common/EmptyState';
import Loader from '../../components/common/Loader';

export default function Orders() {
  const [orders, setOrders] = useState(null);
  useEffect(() => { orderService.getOrders().then(setOrders); }, []);
  if (!orders) return <Loader />;
  if (!orders.length) return <EmptyState title="No orders yet" description="Your past orders will show up here." />;

  return (
    <div className="rounded-lg border border-gray-100">
      <h1 className="border-b border-gray-100 p-6 text-xl font-semibold text-gray-900">Order History</h1>
      <div className="divide-y divide-gray-100">
        {orders.map((o) => (
          <Link key={o.id} to={`/account/orders/${o.id}`} className="flex items-center justify-between p-4 hover:bg-gray-50">
            <div>
              <p className="text-small font-medium text-gray-900">{o.id}</p>
              <p className="text-tiny text-gray-400">{new Date(o.date).toLocaleDateString()}</p>
            </div>
            <OrderStatusBadge status={o.status} />
            <p className="text-small font-medium text-gray-900">${o.total.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
