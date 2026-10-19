import { useState, useEffect } from 'react';

export default function ProductGallery({ images = [], name }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const mainIndex = images.findIndex(
      (image) => image?.isMain === true
    );

    setActive(mainIndex >= 0 ? mainIndex : 0);
  }, [images]);

  const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:5000"
  ).replace(/\/+$/, "");

  const getImageUrl = (image) => {
    if (!image?.url) return "";

    const url = image.url.replace(/\\/g, "/");

    // Cloudinary ba onno complete URL hole direct use korbe
    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    // Relative image path hole backend URL add korbe
    return `${API_BASE_URL}/${url.replace(/^\/+/, "")}`;
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
