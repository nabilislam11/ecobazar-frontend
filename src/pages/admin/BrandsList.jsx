import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import * as brandService from '../../services/brandService';
import AdminTable from '../../components/admin/AdminTable';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Loader from '../../components/common/Loader';

export default function BrandsList() {
  const [brands, setBrands] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const load = () => brandService.getBrands().then(setBrands);
  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    await brandService.deleteBrand(toDelete.id);
    toast.success('Brand deleted');
    setToDelete(null);
    load();
  };

  if (!brands) return <Loader />;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Brands</h1>
        <Link to="/admin/brands/create" className="flex items-center gap-2 rounded-pill bg-success px-5 py-2.5 text-small font-semibold text-white">
          <Plus size={16} /> Add Brand
        </Link>
      </div>
      <AdminTable columns={['Brand', 'Status', 'Actions']}>
        {brands.map((b) => (
          <tr key={b.id}>
            <td className="px-4 py-3 text-gray-900">{b.name}</td>
            <td className="px-4 py-3 text-gray-700">{b.status}</td>
            <td className="px-4 py-3">
              <div className="flex gap-3 text-gray-400">
                <Link to={`/admin/brands/${b.id}/edit`}><Pencil size={16} /></Link>
                <button onClick={() => setToDelete(b)} className="hover:text-error"><Trash2 size={16} /></button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
      <ConfirmDialog open={!!toDelete} onClose={() => setToDelete(null)} onConfirm={handleDelete} description={`Delete "${toDelete?.name}"?`} />
    </div>
  );
}
