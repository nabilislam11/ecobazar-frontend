import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { updateProfile } from '../../services/authService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function Profile() {
  const { user, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: user,
  });

  const onSubmit = async (data) => {
    try {
      console.log('USER:', user);
      console.log('USER ID:', user?._id);
      console.log('FORM DATA:', data);
      const response = await updateProfile(user._id, data);

      console.log('Updated user:', response);

      // Update React state
      setUser(response.userData);

      // Update localStorage
      localStorage.setItem(
        'ecobazar_user',
        JSON.stringify(response.userData)
      );

      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Profile update error:', error);

      console.log(
        'UPDATE URL:',
        error.config?.baseURL + error.config?.url
      );

      console.log('STATUS:', error.response?.status);

      console.log(
        'SERVER RESPONSE:',
        error.response?.data
      );

      toast.error(
        error.response?.data?.message ||
        'Failed to update profile'
      );
    }
  };

  return (
    <div className="rounded-lg border border-gray-100 p-6">
      <h1 className="mb-6 text-xl font-semibold text-gray-900">
        Profile
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <Input
          label="First Name"
          {...register('firstName')}
        />

        <Input
          label="Last Name"
          {...register('lastName')}
        />

        <Input
          label="Email"
          type="email"
          {...register('email')}
          disabled
        />

        <Input
          label="Phone"
          {...register('phoneNumber')}
        />

        <Input
          label="Country"
          {...register('country')}
        />

        <Input
          label="State"
          {...register('state')}
        />

        <Input
          label="City"
          {...register('city')}
        />

        <Input
          label="Postal Code"
          {...register('postalCode')}
        />

        <div className="sm:col-span-2">
          <Input
            label="Address"
            {...register('address')}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="sm:col-span-2 w-fit"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
}