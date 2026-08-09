import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-100 disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`flex h-9 w-9 items-center justify-center rounded-full text-small ${
            p === page ? 'bg-success text-white' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-100 disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
