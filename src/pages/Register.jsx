import { useState } from 'react'; // 👈 useState ইম্পোর্ট করা হয়েছে
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react'; // 👈 আইকন ইম্পোর্ট করা হয়েছে

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

  // 🔥 Password Show/Hide এর জন্য State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await signUp(data);
      toast.success(response?.message || 'Account created successfully! Please verify your email.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 429) {
        toast.error(message || 'Too many registration attempts. Please try again later.');
        return;
      }
      if (status === 401) {
        toast.error(message || 'This email is already registered.');
        return;
      }
      if (status === 400) {
        toast.error(message || 'Please check your information and try again.');
        return;
      }
      toast.error(message || 'Registration failed. Please try again.');
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
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            {...register('firstName', {
              required: 'First name is required',
              minLength: { value: 2, message: 'First name must be at least 2 characters' },
            })}
            error={errors.firstName?.message}
          />

          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            {...register('lastName', {
              required: 'Last name is required',
              minLength: { value: 2, message: 'Last name must be at least 2 characters' },
            })}
            error={errors.lastName?.message}
          />

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

          {/* 🔥 Password Field with Show/Hide Toggle 🔥 */}
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'} // State অনুযায়ী type চেঞ্জ হবে
              placeholder="Enter your password"
              autoComplete="new-password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              error={errors.password?.message}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              style={{ marginTop: errors.password ? '-10px' : '0' }} // এরর মেসেজ থাকলে একটু উপরে উঠবে
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* 🔥 Confirm Password Field with Show/Hide Toggle 🔥 */}
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'} // State অনুযায়ী type চেঞ্জ হবে
              autoComplete="new-password"
              placeholder="Confirm your password"
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                validate: (value, formValues) =>
                  value === formValues.password || 'Passwords do not match',
              })}
              error={errors.confirmPassword?.message}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              style={{ marginTop: errors.confirmPassword ? '-10px' : '0' }} // এরর মেসেজ থাকলে একটু উপরে উঠবে
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
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