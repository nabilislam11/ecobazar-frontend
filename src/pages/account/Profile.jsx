import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function Profile() {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm({ defaultValues: user });
  const onSubmit = () => toast.success('Profile updated');

  return (
    <div className="rounded-lg border border-gray-100 p-6">
      <h1 className="mb-6 text-xl font-semibold text-gray-900">Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="First Name" {...register('firstName')} />
        <Input label="Last Name" {...register('lastName')} />
        <Input label="Email" type="email" {...register('email')} />
        <Input label="Phone" {...register('phone')} />
        <Button type="submit" className="sm:col-span-2 w-fit">Save Changes</Button>
      </form>
    </div>
  );
}
