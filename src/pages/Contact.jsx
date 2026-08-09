import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MapPin, Phone, Mail } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = () => { toast.success('Message sent!'); reset(); };

  return (
    <div className="container-page grid grid-cols-1 gap-10 py-16 lg:grid-cols-2">
      <div>
        <h1 className="mb-6 text-3xl font-semibold text-gray-900">Contact Us</h1>
        <div className="space-y-4 text-small text-gray-700">
          <p className="flex items-center gap-3"><MapPin size={18} className="text-success" /> Lincoln- 344, Illinois, Chicago, USA</p>
          <p className="flex items-center gap-3"><Phone size={18} className="text-success" /> (219) 555-0114</p>
          <p className="flex items-center gap-3"><Mail size={18} className="text-success" /> proxy@gmail.com</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Name" {...register('name', { required: true })} />
        <Input label="Email" type="email" {...register('email', { required: true })} />
        <label className="block">
          <span className="mb-2 block text-small text-gray-900">Message</span>
          <textarea rows={5} {...register('message', { required: true })} className="w-full rounded border border-gray-100 px-4 py-3 text-small focus:border-success" />
        </label>
        <Button type="submit" size="lg">Send Message</Button>
      </form>
    </div>
  );
}
