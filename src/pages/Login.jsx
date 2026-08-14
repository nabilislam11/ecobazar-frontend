import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation, replace, json } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      console.log(response.data);
      toast.success(response?.message, 'Welcome back!');
      navigate(location.state?.from?.pathname ?? '/account',
        { replace: true })
    } catch (error) {
      console.error('Login error:', error);

      toast.error(
        error.response?.data?.message ||
        'Login failed. Please check your email and password.'
      );
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
        <Button type="submit" size="lg" className="mt-6 w-full" disabled={loading}> {loading ? 'Signing In...' : 'Sign In'}</Button>
        <p className="mt-4 text-center text-small text-gray-400">
          No account? <Link to="/register" className="text-success">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
