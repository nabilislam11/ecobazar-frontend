import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="border-b border-gray-100 bg-gray-50">
      <div className="container-page flex items-center gap-2 py-6 text-small text-gray-400">
        <Link to="/" className="flex items-center gap-1 hover:text-success">
          <Home size={14} /> Home
        </Link>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            <ChevronRight size={14} />
            {item.to ? (
              <Link to={item.to} className="hover:text-success">{item.label}</Link>
            ) : (
              <span className="text-gray-900">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}
