import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/shop/${category.slug}`}
      className="group flex flex-col items-center gap-3 rounded-lg border border-gray-100 p-6 text-center transition-colors hover:border-success"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-2xl">
        {category.name.charAt(0)}
      </div>
      <div>
        <p className="text-small font-medium text-gray-900 group-hover:text-success">{category.name}</p>
        <p className="text-tiny text-gray-400">{category.productCount} Products</p>
      </div>
    </Link>
  );
}
