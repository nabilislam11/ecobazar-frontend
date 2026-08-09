import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const onSubmit = () => toast.success('Reset link sent (dummy)');
  return (
    <div className="container-page flex justify-center py-16">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-lg border border-gray-100 p-8">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">Forgot Password</h1>
        <p className="mb-6 text-small text-gray-400">Enter your email and we'll send a reset link.</p>
        <Input label="Email" type="email" {...register('email', { required: true })} />
        <Button type="submit" size="lg" className="mt-6 w-full">Send Reset Link</Button>
      </form>
    </div>
  );
}
