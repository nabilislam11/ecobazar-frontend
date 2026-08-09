import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as productService from '../../services/productService';
import * as categoryService from '../../services/categoryService';
import * as brandService from '../../services/brandService';
import { useState } from 'react';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';

export default function ProductForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { status: 'active', featured: false },
  });

  useEffect(() => {
    categoryService.getCategories().then(setCategories);
    brandService.getBrands().then(setBrands);
  }, []);

  useEffect(() => {
    if (mode === 'edit' && id) {
      productService.getProductById(id).then((p) => p && reset(p));
    }
  }, [mode, id, reset]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      price: Number(data.price),
      oldPrice: data.oldPrice ? Number(data.oldPrice) : null,
      stock: Number(data.stock),
      images: data.images ? [data.images] : [],
      slug: data.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    };
    if (mode === 'edit') {
      await productService.updateProduct(id, payload);
      toast.success('Product updated');
    } else {
      await productService.createProduct(payload);
      toast.success('Product created');
    }
    navigate('/admin/products');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">{mode === 'edit' ? 'Edit Product' : 'Create Product'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-lg border border-gray-100 bg-white p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Product Name" {...register('name', { required: true })} error={errors.name && 'Required'} />
          <Input label="SKU" {...register('sku', { required: true })} error={errors.sku && 'Required'} />
        </div>
        <label className="block">
          <span className="mb-2 block text-small text-gray-900">Description</span>
          <textarea rows={4} {...register('description', { required: true })} className="w-full rounded border border-gray-100 px-4 py-3 text-small focus:border-success" />
        </label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select label="Category" {...register('category', { required: true })}>
            {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </Select>
          <Select label="Brand" {...register('brand', { required: true })}>
            {brands.map((b) => <option key={b.id} value={b.name}>{b.name}</option>)}
          </Select>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input label="Price ($)" type="number" step="0.01" {...register('price', { required: true, min: 0 })} error={errors.price && 'Required'} />
          <Input label="Old Price ($)" type="number" step="0.01" {...register('oldPrice')} />
          <Input label="Stock" type="number" {...register('stock', { required: true, min: 0 })} error={errors.stock && 'Required'} />
        </div>
        <Input label="Product Image URL" {...register('images')} placeholder="/images/products/example.jpg" />
        <Input label="Tags (comma separated)" {...register('tags')} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select label="Status" {...register('status')}>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </Select>
          <label className="flex items-center gap-2 self-end pb-3 text-small text-gray-900">
            <input type="checkbox" {...register('featured')} className="accent-success" /> Featured Product
          </label>
        </div>
        <div className="flex gap-3">
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving…' : mode === 'edit' ? 'Save Changes' : 'Create Product'}</Button>
          <Button type="button" variant="border" onClick={() => navigate('/admin/products')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
