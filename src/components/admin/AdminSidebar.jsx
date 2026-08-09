import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Package, FolderTree, Tag, ShoppingCart, Users,
  Star, FileText, Ticket, Bell, Settings, Leaf,
} from 'lucide-react';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: FolderTree },
  { to: '/admin/brands', label: 'Brands', icon: Tag },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/reviews', label: 'Reviews', icon: Star },
  { to: '/admin/blogs', label: 'Blogs', icon: FileText },
  { to: '/admin/coupons', label: 'Coupons', icon: Ticket },
  { to: '/admin/notifications', label: 'Notifications', icon: Bell },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-gray-100 bg-white lg:flex">
      <div className="flex items-center gap-2 border-b border-gray-100 px-6 py-6">
        <Leaf className="text-success" size={24} />
        <span className="text-lg font-semibold text-gray-900">Ecobazar Admin</span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-small ${
                isActive ? 'bg-success/10 text-success-dark font-medium' : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
