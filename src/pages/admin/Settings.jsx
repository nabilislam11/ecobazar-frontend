import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function AdminSettings() {
  const { register, handleSubmit } = useForm({
    defaultValues: { storeName: 'Ecobazar', storeEmail: 'proxy@gmail.com', storePhone: '(219) 555-0114', currency: 'USD' },
  });
  const onSubmit = () => toast.success('Settings saved');

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-lg border border-gray-100 bg-white p-6">
        <Input label="Store Name" {...register('storeName')} />
        <Input label="Store Email" {...register('storeEmail')} />
        <Input label="Store Phone" {...register('storePhone')} />
        <Input label="Currency" {...register('currency')} />
        <Button type="submit">Save Settings</Button>
      </form>
    </div>
  );
}
