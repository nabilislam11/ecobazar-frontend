import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
  });

  const { register: signUp } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Data received from the form
      console.log('Registration data:', data);

      // Register user
      await signUp(data);

      // Success message
      toast.success('Account created successfully!');

      // Redirect to account page
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);

      toast.error(
        error?.message || 'Registration failed. Please try again.'
      );
    }
  };

  return (
    <div className="container-page flex justify-center py-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full max-w-md rounded-lg border border-gray-100 p-8"
      >
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">
          Create Account
        </h1>

        <div className="space-y-4">
          {/* First Name */}
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            {...register('firstName', {
              required: 'First name is required',
              minLength: {
                value: 2,
                message: 'First name must be at least 2 characters',
              },
            })}
            error={errors.firstName?.message}
          />

          {/* Last Name */}
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            {...register('lastName', {
              required: 'Last name is required',
              minLength: {
                value: 2,
                message: 'Last name must be at least 2 characters',
              },
            })}
            error={errors.lastName?.message}
          />

          {/* Email */}
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            })}
            error={errors.email?.message}
          />

          {/* Password */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={errors.password?.message}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="mt-6 w-full"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>

        {/* Login Link */}
        <p className="mt-4 text-center text-small text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-success">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}