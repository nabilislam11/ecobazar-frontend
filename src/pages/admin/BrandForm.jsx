import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as brandService from '../../services/brandService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function BrandForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: { status: 'active' } });

  useEffect(() => {
    if (mode === 'edit' && id) {
      brandService.getBrands().then((brands) => {
        const b = brands.find((x) => x.id === id);
        if (b) reset(b);
      });
    }
  }, [mode, id, reset]);

  const onSubmit = async (data) => {
    if (mode === 'edit') await brandService.updateBrand(id, data);
    else await brandService.createBrand(data);
    toast.success(mode === 'edit' ? 'Brand updated' : 'Brand created');
    navigate('/admin/brands');
  };

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">{mode === 'edit' ? 'Edit Brand' : 'Create Brand'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-lg border border-gray-100 bg-white p-6">
        <Input label="Brand Name" {...register('name', { required: true })} error={errors.name && 'Required'} />
        <Input label="Logo URL" {...register('logo')} />
        <div className="flex gap-3">
          <Button type="submit">Save</Button>
          <Button type="button" variant="border" onClick={() => navigate('/admin/brands')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
