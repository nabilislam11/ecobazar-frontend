import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { resetPassword } from '../services/authService';
import { useState } from 'react';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch('newPassword');

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      console.log('RESET TOKEN:', token);
      console.log('RESET DATA:', data);

      const response = await resetPassword(token, {
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      console.log('RESET RESPONSE:', response);

      toast.success(
        response?.message || 'Password updated successfully'
      );

      navigate('/login');

    } catch (error) {
      console.error('Reset password error:', error);

      toast.error(
        error.response?.data?.message ||
        'Unable to reset password'
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
          Reset Password
        </h1>

        <p className="mb-6 text-small text-gray-400">
          Enter your new password below.
        </p>

        <div className="space-y-4">

          <Input
            label="New Password"
            type="password"
            {...register('newPassword', {
              required: 'New password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={errors.newPassword?.message}
          />

          <Input
            label="Confirm Password"
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === newPassword || 'Passwords do not match',
            })}
            error={errors.confirmPassword?.message}
          />

        </div>

        <Button
          type="submit"
          size="lg"
          className="mt-6 w-full"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Reset Password'}
        </Button>
      </form>
    </div>
  );
}