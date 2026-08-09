import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Leaf } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function AdminLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: 'admin@ecobazar.com', password: 'admin123' },
  });
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate('/admin/dashboard');
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm rounded-lg border border-gray-100 bg-white p-8">
        <div className="mb-6 flex items-center justify-center gap-2">
          <Leaf className="text-success" size={28} />
          <span className="text-lg font-semibold text-gray-900">Ecobazar Admin</span>
        </div>
        <div className="space-y-4">
          <Input label="Email" {...register('email', { required: true })} error={errors.email && 'Required'} />
          <Input label="Password" type="password" {...register('password', { required: true })} error={errors.password && 'Required'} />
        </div>
        <Button type="submit" size="lg" className="mt-6 w-full">Sign In</Button>
        <p className="mt-4 text-center text-tiny text-gray-400">Demo: admin@ecobazar.com / admin123</p>
      </form>
    </div>
  );
}
