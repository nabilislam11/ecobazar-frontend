import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-success">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900">Oops! Page not found</h2>
      <p className="max-w-sm text-small text-gray-400">The page you're looking for doesn't exist or has been moved.</p>
      <Button as={Link} to="/" className="mt-4">Back to Home</Button>
    </div>
  );
}
