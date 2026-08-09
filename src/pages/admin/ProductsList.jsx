import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Eye, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import * as productService from '../../services/productService';
import AdminTable from '../../components/admin/AdminTable';
import Badge from '../../components/common/Badge';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Loader from '../../components/common/Loader';

export default function ProductsList() {
  const [products, setProducts] = useState(null);
  const [search, setSearch] = useState('');
  const [toDelete, setToDelete] = useState(null);

  const load = () => productService.getProducts({ pageSize: 100, search: search || undefined }).then((r) => setProducts(r.items));
  useEffect(() => { load(); }, [search]);

  const handleDelete = async () => {
    await productService.deleteProduct(toDelete.id);
    toast.success('Product deleted');
    setToDelete(null);
    load();
  };

  if (!products) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <Link to="/admin/products/create" className="flex items-center gap-2 rounded-pill bg-success px-5 py-2.5 text-small font-semibold text-white">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="flex items-center gap-2 rounded border border-gray-100 bg-white px-3 py-2 sm:w-80">
        <Search size={16} className="text-gray-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products…" className="w-full text-small focus:outline-none" />
      </div>

      <AdminTable columns={['Product', 'Category', 'Price', 'Stock', 'Status', 'Created', 'Actions']}>
        {products.map((p) => (
          <tr key={p.id}>
            <td className="flex items-center gap-3 px-4 py-3">
              <div className="h-10 w-10 shrink-0 rounded bg-gray-50" />
              <span className="text-gray-900">{p.name}</span>
            </td>
            <td className="px-4 py-3 text-gray-700">{p.category}</td>
            <td className="px-4 py-3 text-gray-700">${p.price.toFixed(2)}</td>
            <td className="px-4 py-3 text-gray-700">{p.stock}</td>
            <td className="px-4 py-3"><Badge tone={p.status === 'active' ? 'success' : 'gray'}>{p.status}</Badge></td>
            <td className="px-4 py-3 text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Link to={`/product/${p.slug}`} target="_blank" aria-label="View"><Eye size={16} /></Link>
                <Link to={`/admin/products/${p.id}/edit`} aria-label="Edit"><Pencil size={16} /></Link>
                <button onClick={() => setToDelete(p)} aria-label="Delete" className="hover:text-error"><Trash2 size={16} /></button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={handleDelete}
        title="Delete product?"
        description={`This will permanently remove "${toDelete?.name}".`}
      />
    </div>
  );
}
