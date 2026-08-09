import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as blogService from '../../services/blogService';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';

export default function BlogForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: { status: 'draft', author: 'Admin' } });

  useEffect(() => {
    if (mode === 'edit' && id) {
      blogService.getBlogs().then((blogs) => {
        const b = blogs.find((x) => x.id === id);
        if (b) reset(b);
      });
    }
  }, [mode, id, reset]);

  const onSubmit = async (data) => {
    const payload = { ...data, slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') };
    if (mode === 'edit') await blogService.updateBlog(id, payload);
    else await blogService.createBlog(payload);
    toast.success(mode === 'edit' ? 'Blog updated' : 'Blog created');
    navigate('/admin/blogs');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">{mode === 'edit' ? 'Edit Blog' : 'Create Blog'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-lg border border-gray-100 bg-white p-6">
        <Input label="Title" {...register('title', { required: true })} error={errors.title && 'Required'} />
        <Input label="Featured Image URL" {...register('featuredImage')} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Category" {...register('category', { required: true })} error={errors.category && 'Required'} />
          <Input label="Author" {...register('author')} />
        </div>
        <label className="block">
          <span className="mb-2 block text-small text-gray-900">Content</span>
          <textarea rows={6} {...register('content', { required: true })} className="w-full rounded border border-gray-100 px-4 py-3 text-small focus:border-success" />
        </label>
        <Select label="Status" {...register('status')}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </Select>
        <div className="flex gap-3">
          <Button type="submit">Save</Button>
          <Button type="button" variant="border" onClick={() => navigate('/admin/blogs')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
