import { Link } from 'react-router-dom';
import { MailCheck } from 'lucide-react';
import Button from '../components/common/Button';

export default function Verify() {
  return (
    <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
      <MailCheck className="text-success" size={56} />
      <h1 className="text-2xl font-semibold text-gray-900">Verify Your Email</h1>
      <p className="max-w-sm text-small text-gray-400">We've sent a verification link to your email address.</p>
      <Button as={Link} to="/login" className="mt-2">Back to Sign In</Button>
    </div>
  );
}
