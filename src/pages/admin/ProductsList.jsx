import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import * as categoryService from '../../services/categoryService';
import * as productService from '../../services/productService';
import AdminTable from '../../components/admin/AdminTable';
import Badge from '../../components/common/Badge';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Loader from '../../components/common/Loader';

export default function ProductsList() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState();
  const [search, setSearch] = useState('');
  const [toDelete, setToDelete] = useState(null);

  // =========================
  // LOAD PRODUCTS
  // =========================
  const load = async () => {
    try {
      const response = await productService.getProducts({
        pageSize: 100,
        search: search || undefined,
      });

      console.log('Products response:', response);

      // তোমার backend যদি data return করে
      setProducts(response?.data || []);

    } catch (error) {
      console.error('Load products error:', error);

      toast.error(
        error.response?.data?.message ||
        'Failed to load products'
      );

      setProducts([]);
    }
  };
  const loadCategories = async () => {
    try {
      const response = await categoryService.getCategories();

      console.log('Categories response:', response);

      if (response?.success) {
        setCategories(response.data || []);
      }
    } catch (error) {
      console.error('Load categories error:', error);
    }
  };

  useEffect(() => {
    load();
    loadCategories();
  }, [search]);

  // =========================
  // DELETE PRODUCT
  // =========================
  const handleDelete = async () => {
    if (!toDelete) return;

    try {
      await productService.deleteProduct(
        toDelete._id
      );

      toast.success('Product deleted');

      setToDelete(null);

      load();

    } catch (error) {
      console.error('Delete product error:', error);

      toast.error(
        error.response?.data?.message ||
        'Failed to delete product'
      );
    }
  };

  if (!products) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

        <h1 className="text-2xl font-semibold text-gray-900">
          Products
        </h1>

        <Link
          to="/admin/products/create"
          className="flex items-center gap-2 rounded-pill bg-success px-5 py-2.5 text-small font-semibold text-white"
        >
          <Plus size={16} />
          Add Product
        </Link>

      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-2 rounded border border-gray-100 bg-white px-3 py-2 sm:w-80">

        <Search
          size={16}
          className="text-gray-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full text-small focus:outline-none"
        />

      </div>

      {/* PRODUCTS TABLE */}
      <AdminTable
        columns={[
          'Product',
          'Category',
          'Price',
          'Stock',
          'Status',
          'Created',
          'Actions',
        ]}
      >

        {products.map((p) => (

          <tr key={p._id}>

            {/* PRODUCT */}
            <td className="flex items-center gap-3 px-4 py-3">

              <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-gray-50">

                {p.images?.length > 0 ? (
                  <img
                    src={`http://localhost:5000/${p.images[0]?.url}`}
                    alt={p.title}
                    className="h-full w-full object-cover"
                  />
                ) : null}

              </div>

              <span className="text-gray-900">
                {p.title}
              </span>

            </td>

            {/* CATEGORY */}
            <td className="px-4 py-3 text-gray-700">
              {p.category || 'N/A'}
            </td>

            {/* PRICE */}
            <td className="px-4 py-3 text-gray-700">
              ${Number(p.price || 0).toFixed(2)}
            </td>

            {/* STOCK */}
            <td className="px-4 py-3 text-gray-700">
              {p.stock ?? 0}
            </td>

            {/* STATUS */}
            <td className="px-4 py-3">

              <Badge
                tone={
                  p.status === 'active'
                    ? 'success'
                    : 'gray'
                }
              >
                {p.status}
              </Badge>

            </td>

            {/* CREATED DATE */}
            <td className="px-4 py-3 text-gray-400">

              {p.createdAt
                ? new Date(
                  p.createdAt
                ).toLocaleDateString()
                : 'N/A'}

            </td>

            {/* ACTIONS */}
            <td className="px-4 py-3">

              <div className="flex items-center gap-3 text-gray-400">

                <Link
                  to={`/product/${p._id}`}
                  target="_blank"
                  aria-label="View"
                >
                  <Eye size={16} />
                </Link>

                <Link
                  to={`/admin/products/${p._id}/edit`}
                  aria-label="Edit"
                >
                  <Pencil size={16} />
                </Link>

                <button
                  onClick={() => setToDelete(p)}
                  aria-label="Delete"
                  className="hover:text-error"
                >
                  <Trash2 size={16} />
                </button>

              </div>

            </td>

          </tr>

        ))}

      </AdminTable>

      {/* DELETE CONFIRM */}
      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={handleDelete}
        title="Delete product?"
        description={`This will permanently remove "${toDelete?.title || ''
          }".`}
      />

    </div>
  );
}