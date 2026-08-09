import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate(location.state?.from?.pathname ?? '/account');
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="container-page flex justify-center py-16">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-lg border border-gray-100 p-8">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">Sign In</h1>
        <div className="space-y-4">
          <Input label="Email" type="email" {...register('email', { required: true })} error={errors.email && 'Email is required'} />
          <Input label="Password" type="password" {...register('password', { required: true })} error={errors.password && 'Password is required'} />
        </div>
        <div className="mt-2 text-right">
          <Link to="/forgot-password" className="text-tiny text-success">Forgot password?</Link>
        </div>
        <Button type="submit" size="lg" className="mt-6 w-full">Sign In</Button>
        <p className="mt-4 text-center text-small text-gray-400">
          No account? <Link to="/register" className="text-success">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
