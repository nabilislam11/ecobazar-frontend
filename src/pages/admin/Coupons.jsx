import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminTable from '../../components/admin/AdminTable';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const initialCoupons = [
  { id: 'cpn-001', code: 'ECO10', discount: 10, type: 'Percentage', minOrder: 30, expires: '2026-12-31', status: 'active' },
  { id: 'cpn-002', code: 'WELCOME5', discount: 5, type: 'Fixed', minOrder: 0, expires: '2026-09-30', status: 'active' },
];

export default function Coupons() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [form, setForm] = useState({ code: '', discount: '', type: 'Percentage', minOrder: '', expires: '' });

  const addCoupon = (e) => {
    e.preventDefault();
    setCoupons((prev) => [...prev, { id: `cpn-${prev.length + 1}`, status: 'active', ...form }]);
    setOpen(false);
    toast.success('Coupon created');
  };
  const remove = () => {
    setCoupons((prev) => prev.filter((c) => c.id !== toDelete.id));
    setToDelete(null);
    toast.success('Coupon deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Coupons</h1>
        <button onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-pill bg-success px-5 py-2.5 text-small font-semibold text-white">
          <Plus size={16} /> Add Coupon
        </button>
      </div>
      <AdminTable columns={['Code', 'Discount', 'Type', 'Min. Order', 'Expires', 'Status', 'Actions']}>
        {coupons.map((c) => (
          <tr key={c.id}>
            <td className="px-4 py-3 font-medium text-gray-900">{c.code}</td>
            <td className="px-4 py-3 text-gray-700">{c.discount}{c.type === 'Percentage' ? '%' : '$'}</td>
            <td className="px-4 py-3 text-gray-700">{c.type}</td>
            <td className="px-4 py-3 text-gray-700">${c.minOrder}</td>
            <td className="px-4 py-3 text-gray-400">{c.expires}</td>
            <td className="px-4 py-3"><Badge tone="success">{c.status}</Badge></td>
            <td className="px-4 py-3">
              <div className="flex gap-3 text-gray-400">
                <Pencil size={16} />
                <button onClick={() => setToDelete(c)} className="hover:text-error"><Trash2 size={16} /></button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Coupon">
        <form onSubmit={addCoupon} className="space-y-3">
          <Input label="Coupon Code" required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
          <Input label="Discount" type="number" required value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} />
          <Select label="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option>Percentage</option>
            <option>Fixed</option>
          </Select>
          <Input label="Minimum Order ($)" type="number" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: e.target.value })} />
          <Input label="Expiration Date" type="date" value={form.expires} onChange={(e) => setForm({ ...form, expires: e.target.value })} />
          <Button type="submit" className="w-full">Create Coupon</Button>
        </form>
      </Modal>
      <ConfirmDialog open={!!toDelete} onClose={() => setToDelete(null)} onConfirm={remove} description={`Delete coupon "${toDelete?.code}"?`} />
    </div>
  );
}
