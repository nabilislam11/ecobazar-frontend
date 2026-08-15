import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { forgotPassword } from '../services/authService';
import { useState } from 'react';

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      console.log('Forgot password email:', data.email);

      const response = await forgotPassword(data.email);

      console.log('Forgot password response:', response);

      toast.success(
        response?.message || 'Reset link sent. Please check your email.'
      );
    } catch (error) {
      console.error('Forgot password error:', error);

      toast.error(
        error.response?.data?.message ||
        'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-page flex justify-center py-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg border border-gray-100 p-8"
      >
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">
          Forgot Password
        </h1>

        <p className="mb-6 text-small text-gray-400">
          Enter your email and we'll send a reset link.
        </p>

        <Input
          label="Email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Enter a valid email',
            },
          })}
          error={errors.email?.message}
        />

        <Button
          type="submit"
          size="lg"
          className="mt-6 w-full"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
    </div>
  );
}