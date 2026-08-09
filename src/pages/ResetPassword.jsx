import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function ResetPassword() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = () => { toast.success('Password reset (dummy)'); navigate('/login'); };
  return (
    <div className="container-page flex justify-center py-16">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-lg border border-gray-100 p-8">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">Reset Password</h1>
        <Input label="New Password" type="password" {...register('password', { required: true, minLength: 6 })} />
        <Button type="submit" size="lg" className="mt-6 w-full">Reset Password</Button>
      </form>
    </div>
  );
}
