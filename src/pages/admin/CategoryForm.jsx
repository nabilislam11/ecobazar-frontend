import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as categoryService from '../../services/categoryService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function CategoryForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (mode === 'edit' && id) {
      categoryService.getCategories().then((cats) => {
        const c = cats.find((x) => x.id === id);
        if (c) reset(c);
      });
    }
  }, [mode, id, reset]);

  const onSubmit = async (data) => {
    const payload = { ...data, slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') };
    if (mode === 'edit') await categoryService.updateCategory(id, payload);
    else await categoryService.createCategory(payload);
    toast.success(mode === 'edit' ? 'Category updated' : 'Category created');
    navigate('/admin/categories');
  };

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">{mode === 'edit' ? 'Edit Category' : 'Create Category'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-lg border border-gray-100 bg-white p-6">
        <Input label="Category Name" {...register('name', { required: true })} error={errors.name && 'Required'} />
        <Input label="Product Count" type="number" {...register('productCount')} defaultValue={0} />
        <div className="flex gap-3">
          <Button type="submit">Save</Button>
          <Button type="button" variant="border" onClick={() => navigate('/admin/categories')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
