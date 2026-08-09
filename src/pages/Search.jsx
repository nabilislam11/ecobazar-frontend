import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as productService from '../services/productService';
import ProductGrid from '../components/ecommerce/ProductGrid';

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    productService.getProducts({ search: q, pageSize: 24 }).then((res) => {
      setProducts(res.items);
      setLoading(false);
    });
  }, [q]);

  return (
    <div className="container-page py-10">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Search results for “{q}”</h1>
      <ProductGrid products={products} loading={loading} columns={4} />
    </div>
  );
}
