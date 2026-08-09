import { Star } from 'lucide-react';

export default function Rating({ value = 0, count, size = 14 }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={i < Math.round(value) ? 'fill-warning text-warning' : 'fill-gray-100 text-gray-100'}
          />
        ))}
      </div>
      {count != null && <span className="text-tiny text-gray-400">({count})</span>}
    </div>
  );
}
