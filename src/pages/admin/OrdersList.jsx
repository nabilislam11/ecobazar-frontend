import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import * as orderService from '../../services/orderService';
import AdminTable from '../../components/admin/AdminTable';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';
import Select from '../../components/common/Select';
import Loader from '../../components/common/Loader';

const statuses = ['Order received', 'Processing', 'On the way', 'Delivered', 'Cancelled'];

export default function OrdersList() {
  const [orders, setOrders] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => { orderService.getOrders({ status: status || undefined }).then(setOrders); }, [status]);
  if (!orders) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="!py-2 w-52">
          <option value="">All Statuses</option>
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </Select>
      </div>
      <AdminTable columns={['Order ID', 'Customer', 'Date', 'Total', 'Payment', 'Status', 'Actions']}>
        {orders.map((o) => (
          <tr key={o.id}>
            <td className="px-4 py-3 text-gray-900">{o.id}</td>
            <td className="px-4 py-3 text-gray-700">{o.customer}</td>
            <td className="px-4 py-3 text-gray-400">{new Date(o.date).toLocaleDateString()}</td>
            <td className="px-4 py-3 text-gray-700">${o.total.toFixed(2)}</td>
            <td className="px-4 py-3 text-gray-700">{o.paymentStatus}</td>
            <td className="px-4 py-3"><OrderStatusBadge status={o.status} /></td>
            <td className="px-4 py-3"><Link to={`/admin/orders/${o.id}`} className="text-gray-400 hover:text-success"><Eye size={16} /></Link></td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
