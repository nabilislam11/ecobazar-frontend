import { useState } from 'react';

export default function ProductGallery({ images = [], name }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="mb-4 aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
        <img src={images[active]} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-16 w-16 overflow-hidden rounded border ${i === active ? 'border-success' : 'border-gray-100'}`}
          >
            <img src={img} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
