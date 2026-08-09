import { ChevronDown } from 'lucide-react';

export default function Select({ label, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-small text-gray-900">{label}</span>}
      <div className="relative">
        <select
          className={`w-full appearance-none rounded border border-gray-100 bg-white px-4 py-3 text-small text-gray-900 focus:border-success ${className}`}
          {...props}
        />
        <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </label>
  );
}
