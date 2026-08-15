import { Link, useParams } from 'react-router-dom';
import { MailCheck, LoaderCircle, XCircle } from 'lucide-react';
import Button from '../components/common/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Verify() {
  const { token } = useParams();

  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Verification token is missing.');
        return;
      }

      try {
        console.log('Verifying token:', token);

        const response = await axios.post(
          `http://localhost:5000/api/v1/auth/verifyemail/${token}`
        );

        console.log('Verification response:', response.data);

        setStatus('success');
        setMessage(
          response.data?.message ||
          'Your email has been verified successfully.'
        );
      } catch (error) {
        console.error('Email verification error:', error);

        setStatus('error');
        setMessage(
          error.response?.data?.message ||
          'Email verification failed.'
        );
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="container-page flex flex-col items-center gap-4 py-24 text-center">

      {status === 'verifying' && (
        <>
          <LoaderCircle
            className="animate-spin text-success"
            size={56}
          />

          <h1 className="text-2xl font-semibold text-gray-900">
            Verifying Your Email...
          </h1>

          <p className="max-w-sm text-small text-gray-400">
            Please wait while we verify your email address.
          </p>
        </>
      )}

      {status === 'success' && (
        <>
          <MailCheck className="text-success" size={56} />

          <h1 className="text-2xl font-semibold text-gray-900">
            Email Verified Successfully
          </h1>

          <p className="max-w-sm text-small text-gray-400">
            {message}
          </p>

          <Button
            as={Link}
            to="/login"
            className="mt-2"
          >
            Back to Sign In
          </Button>
        </>
      )}

      {status === 'error' && (
        <>
          <XCircle className="text-error" size={56} />

          <h1 className="text-2xl font-semibold text-gray-900">
            Verification Failed
          </h1>

          <p className="max-w-sm text-small text-gray-400">
            {message}
          </p>

          <Button
            as={Link}
            to="/login"
            className="mt-2"
          >
            Back to Sign In
          </Button>
        </>
      )}

    </div>
  );
}