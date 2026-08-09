import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function AccountSettings() {
  const { register, handleSubmit } = useForm();
  const onSubmit = () => toast.success('Password updated');

  return (
    <div className="rounded-lg border border-gray-100 p-6">
      <h1 className="mb-6 text-xl font-semibold text-gray-900">Account Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm space-y-4">
        <Input label="Current Password" type="password" {...register('current')} />
        <Input label="New Password" type="password" {...register('new')} />
        <Input label="Confirm New Password" type="password" {...register('confirm')} />
        <Button type="submit">Change Password</Button>
      </form>
    </div>
  );
}
