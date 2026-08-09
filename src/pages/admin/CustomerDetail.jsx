import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as customerService from '../../services/customerService';
import Loader from '../../components/common/Loader';

export default function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  useEffect(() => { customerService.getCustomerById(id).then(setCustomer); }, [id]);
  if (!customer) return <Loader />;

  return (
    <div className="max-w-xl space-y-4 rounded-lg border border-gray-100 bg-white p-6">
      <h1 className="text-xl font-semibold text-gray-900">{customer.name}</h1>
      <div className="grid grid-cols-2 gap-4 text-small">
        <div><p className="text-gray-400">Email</p><p className="text-gray-900">{customer.email}</p></div>
        <div><p className="text-gray-400">Phone</p><p className="text-gray-900">{customer.phone}</p></div>
        <div><p className="text-gray-400">Orders</p><p className="text-gray-900">{customer.orders}</p></div>
        <div><p className="text-gray-400">Total Spent</p><p className="text-gray-900">${customer.totalSpent.toFixed(2)}</p></div>
        <div><p className="text-gray-400">Status</p><p className="text-gray-900">{customer.status}</p></div>
        <div><p className="text-gray-400">Registered</p><p className="text-gray-900">{new Date(customer.registeredAt).toLocaleDateString()}</p></div>
      </div>
    </div>
  );
}
