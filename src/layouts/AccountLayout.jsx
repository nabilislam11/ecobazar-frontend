import { NavLink, Outlet } from 'react-router-dom';
import { User, Package, Heart, MapPin, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const links = [
  { to: '/account/profile', label: 'Profile', icon: User },
  { to: '/account/orders', label: 'Orders', icon: Package },
  { to: '/account/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/account/addresses', label: 'Addresses', icon: MapPin },
  { to: '/account/settings', label: 'Settings', icon: Settings },
];

export default function AccountLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container-page grid grid-cols-1 gap-8 py-10 lg:grid-cols-[260px_1fr]">
      <aside className="rounded-lg border border-gray-100 p-4">
        <div className="mb-4 border-b border-gray-100 pb-4">
          <p className="text-small font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
          <p className="text-tiny text-gray-400">{user?.email}</p>
        </div>
        <nav className="flex flex-col gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded px-3 py-2.5 text-small ${
                  isActive ? 'bg-success/10 text-success-dark' : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-3 rounded px-3 py-2.5 text-left text-small text-error hover:bg-error/5"
          >
            <LogOut size={16} /> Logout
          </button>
        </nav>
      </aside>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
