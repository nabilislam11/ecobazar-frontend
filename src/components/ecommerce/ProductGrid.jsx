import ProductCard from './ProductCard';
import Skeleton from '../common/Skeleton';
import EmptyState from '../common/EmptyState';

export default function ProductGrid({ products, loading, columns = 4 }) {
  const colClass = {
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
    5: 'sm:grid-cols-2 lg:grid-cols-5',
  }[columns];

  if (loading) {
    return (
      <div className={`grid grid-cols-1 gap-5 ${colClass}`}>
        {Array.from({ length: columns * 2 }).map((_, i) => (
          <Skeleton key={i} className="h-[327px] w-full" />
        ))}
      </div>
    );
  }

  if (!products?.length) {
    return <EmptyState title="No products found" description="Try adjusting your filters or search terms." />;
  }

  return (
    <div className={`grid grid-cols-1 gap-5 ${colClass}`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
