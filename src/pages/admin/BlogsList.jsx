import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import * as blogService from '../../services/blogService';
import AdminTable from '../../components/admin/AdminTable';
import Badge from '../../components/common/Badge';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Loader from '../../components/common/Loader';

export default function BlogsList() {
  const [blogs, setBlogs] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const load = () => blogService.getBlogs().then(setBlogs);
  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    await blogService.deleteBlog(toDelete.id);
    toast.success('Blog deleted');
    setToDelete(null);
    load();
  };

  if (!blogs) return <Loader />;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Blogs</h1>
        <Link to="/admin/blogs/create" className="flex items-center gap-2 rounded-pill bg-success px-5 py-2.5 text-small font-semibold text-white">
          <Plus size={16} /> Add Blog
        </Link>
      </div>
      <AdminTable columns={['Title', 'Category', 'Author', 'Status', 'Publish Date', 'Actions']}>
        {blogs.map((b) => (
          <tr key={b.id}>
            <td className="max-w-xs truncate px-4 py-3 text-gray-900">{b.title}</td>
            <td className="px-4 py-3 text-gray-700">{b.category}</td>
            <td className="px-4 py-3 text-gray-700">{b.author}</td>
            <td className="px-4 py-3"><Badge tone={b.status === 'published' ? 'success' : 'gray'}>{b.status}</Badge></td>
            <td className="px-4 py-3 text-gray-400">{new Date(b.publishDate).toLocaleDateString()}</td>
            <td className="px-4 py-3">
              <div className="flex gap-3 text-gray-400">
                <Link to={`/admin/blogs/${b.id}/edit`}><Pencil size={16} /></Link>
                <button onClick={() => setToDelete(b)} className="hover:text-error"><Trash2 size={16} /></button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
      <ConfirmDialog open={!!toDelete} onClose={() => setToDelete(null)} onConfirm={handleDelete} description={`Delete "${toDelete?.title}"?`} />
    </div>
  );
}
