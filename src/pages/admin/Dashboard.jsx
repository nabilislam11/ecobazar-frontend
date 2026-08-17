import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, ShoppingCart, Package, Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { dashboardStats } from '../../data/dashboardStats';
import * as orderService from '../../services/orderService';
import * as customerService from '../../services/customerService';
import AdminStatsCard from '../../components/admin/AdminStatsCard';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';

export default function Dashboard() {

  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    orderService.getOrders().then((o) => setOrders(o.slice(0, 5)));
    customerService.getCustomers().then((c) => setCustomers(c.slice(0, 5)));
  }, []);

  const maxRevenue = Math.max(...dashboardStats.revenueByMonth.map((m) => m.revenue));

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatsCard label="Total Revenue" value={`$${dashboardStats.totalRevenue.toLocaleString()}`} icon={DollarSign} />
        <AdminStatsCard label="Total Orders" value={dashboardStats.totalOrders} icon={ShoppingCart} />
        <AdminStatsCard label="Total Products" value={dashboardStats.totalProducts} icon={Package} />
        <AdminStatsCard label="Total Customers" value={dashboardStats.totalCustomers} icon={Users} />
        <AdminStatsCard label="Pending Orders" value={dashboardStats.pendingOrders} icon={Clock} tone="warning" />
        <AdminStatsCard label="Completed Orders" value={dashboardStats.completedOrders} icon={CheckCircle} />
        <AdminStatsCard label="Low Stock Products" value={dashboardStats.lowStockProducts} icon={AlertTriangle} tone="error" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-lg border border-gray-100 bg-white p-6">
          <h2 className="mb-6 text-medium font-semibold text-gray-900">Sales Overview</h2>
          <div className="flex items-end gap-4" style={{ height: 200 }}>
            {dashboardStats.revenueByMonth.map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t bg-success/80"
                  style={{ height: `${(m.revenue / maxRevenue) * 160}px` }}
                />
                <span className="text-tiny text-gray-400">{m.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-gray-100 bg-white p-6">
          <h2 className="mb-4 text-medium font-semibold text-gray-900">Recent Customers</h2>
          <div className="space-y-3">
            {customers.map((c) => (
              <div key={c.id} className="flex items-center justify-between text-small">
                <span className="text-gray-900">{c.name}</span>
                <span className="text-gray-400">{c.orders} orders</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-100 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-medium font-semibold text-gray-900">Recent Orders</h2>
          <Link to="/admin/orders" className="text-small text-success">View all</Link>
        </div>
        <table className="w-full text-left text-small">
          <thead className="text-tiny uppercase text-gray-400">
            <tr><th className="pb-3">Order ID</th><th className="pb-3">Customer</th><th className="pb-3">Total</th><th className="pb-3">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="py-3">{o.id}</td>
                <td className="py-3">{o.customer}</td>
                <td className="py-3">${o.total.toFixed(2)}</td>
                <td className="py-3"><OrderStatusBadge status={o.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
