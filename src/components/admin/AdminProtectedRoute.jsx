import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAdminAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
}
