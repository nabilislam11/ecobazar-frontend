import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import * as categoryService from '../../services/categoryService';
import AdminTable from '../../components/admin/AdminTable';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Loader from '../../components/common/Loader';

export default function CategoriesList() {
  const [categories, setCategories] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const load = () => categoryService.getCategories().then(setCategories);
  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    await categoryService.deleteCategory(toDelete.id);
    toast.success('Category deleted');
    setToDelete(null);
    load();
  };

  if (!categories) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
        <Link to="/admin/categories/create" className="flex items-center gap-2 rounded-pill bg-success px-5 py-2.5 text-small font-semibold text-white">
          <Plus size={16} /> Add Category
        </Link>
      </div>
      <AdminTable columns={['Category', 'Products', 'Status', 'Actions']}>
        {categories.map((c) => (
          <tr key={c.id}>
            <td className="px-4 py-3 text-gray-900">{c.name}</td>
            <td className="px-4 py-3 text-gray-700">{c.productCount}</td>
            <td className="px-4 py-3 text-gray-700">{c.status ?? 'active'}</td>
            <td className="px-4 py-3">
              <div className="flex gap-3 text-gray-400">
                <Link to={`/admin/categories/${c.id}/edit`}><Pencil size={16} /></Link>
                <button onClick={() => setToDelete(c)} className="hover:text-error"><Trash2 size={16} /></button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
      <ConfirmDialog open={!!toDelete} onClose={() => setToDelete(null)} onConfirm={handleDelete} description={`Delete "${toDelete?.name}"?`} />
    </div>
  );
}
