import { useState, useEffect } from 'react';

export default function ProductGallery({ images = [], name }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const mainIndex = images.findIndex(
      (image) => image?.isMain === true
    );

    setActive(mainIndex >= 0 ? mainIndex : 0);
  }, [images]);

  const getImageUrl = (image) => {
    if (!image?.url) return "";

    return image.url.startsWith("http")
      ? image.url
      : `http://localhost:5000/${image.url.replace(/\\/g, "/")}`;
  };
  return (
    <div>
      <div className="mb-4 aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
        <img src={getImageUrl(images[active])} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="flex gap-3">
        {images.map((image, i) => (
          <button
            key={image._id}
            onClick={() => setActive(i)}
            className={`h-16 w-16 overflow-hidden rounded border ${i === active ? 'border-success' : 'border-gray-100'}`}
          >
            <img src={getImageUrl(image)} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
