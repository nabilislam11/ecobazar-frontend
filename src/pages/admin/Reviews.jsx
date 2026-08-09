import { useEffect, useState } from 'react';
import { Check, X, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import * as reviewService from '../../services/reviewService';
import AdminTable from '../../components/admin/AdminTable';
import Badge from '../../components/common/Badge';
import Rating from '../../components/ecommerce/Rating';
import Loader from '../../components/common/Loader';

export default function Reviews() {
  const [reviews, setReviews] = useState(null);
  const load = () => reviewService.getReviews().then(setReviews);
  useEffect(() => { load(); }, []);
  if (!reviews) return <Loader />;

  const setStatus = async (id, status) => {
    await reviewService.updateReviewStatus(id, status);
    toast.success(`Review ${status}`);
    load();
  };
  const remove = async (id) => {
    await reviewService.deleteReview(id);
    toast.success('Review deleted');
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Reviews</h1>
      <AdminTable columns={['Product', 'Customer', 'Rating', 'Review', 'Date', 'Status', 'Actions']}>
        {reviews.map((r) => (
          <tr key={r.id}>
            <td className="px-4 py-3 text-gray-900">{r.productName}</td>
            <td className="px-4 py-3 text-gray-700">{r.customer}</td>
            <td className="px-4 py-3"><Rating value={r.rating} /></td>
            <td className="max-w-xs truncate px-4 py-3 text-gray-700">{r.comment}</td>
            <td className="px-4 py-3 text-gray-400">{new Date(r.date).toLocaleDateString()}</td>
            <td className="px-4 py-3"><Badge tone={r.status === 'approved' ? 'success' : 'warning'}>{r.status}</Badge></td>
            <td className="px-4 py-3">
              <div className="flex gap-3 text-gray-400">
                <button onClick={() => setStatus(r.id, 'approved')} className="hover:text-success" aria-label="Approve"><Check size={16} /></button>
                <button onClick={() => setStatus(r.id, 'rejected')} className="hover:text-warning" aria-label="Reject"><X size={16} /></button>
                <button onClick={() => remove(r.id)} className="hover:text-error" aria-label="Delete"><Trash2 size={16} /></button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
