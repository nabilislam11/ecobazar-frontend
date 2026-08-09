import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import * as customerService from '../../services/customerService';
import AdminTable from '../../components/admin/AdminTable';
import Badge from '../../components/common/Badge';
import Loader from '../../components/common/Loader';

export default function CustomersList() {
  const [customers, setCustomers] = useState(null);
  useEffect(() => { customerService.getCustomers().then(setCustomers); }, []);
  if (!customers) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
      <AdminTable columns={['Customer', 'Email', 'Phone', 'Orders', 'Total Spent', 'Status', 'Registered', 'Actions']}>
        {customers.map((c) => (
          <tr key={c.id}>
            <td className="px-4 py-3 text-gray-900">{c.name}</td>
            <td className="px-4 py-3 text-gray-700">{c.email}</td>
            <td className="px-4 py-3 text-gray-700">{c.phone}</td>
            <td className="px-4 py-3 text-gray-700">{c.orders}</td>
            <td className="px-4 py-3 text-gray-700">${c.totalSpent.toFixed(2)}</td>
            <td className="px-4 py-3"><Badge tone={c.status === 'active' ? 'success' : 'gray'}>{c.status}</Badge></td>
            <td className="px-4 py-3 text-gray-400">{new Date(c.registeredAt).toLocaleDateString()}</td>
            <td className="px-4 py-3"><Link to={`/admin/customers/${c.id}`} className="text-gray-400 hover:text-success"><Eye size={16} /></Link></td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
