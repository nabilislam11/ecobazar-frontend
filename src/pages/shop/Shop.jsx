import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import * as productService from '../../services/productService';
import * as categoryService from '../../services/categoryService';
import * as brandService from '../../services/brandService';
import ProductGrid from '../../components/ecommerce/ProductGrid';
import Pagination from '../../components/common/Pagination';
import Breadcrumb from '../../components/common/Breadcrumb';
import Select from '../../components/common/Select';

export default function Shop() {
  const { category: categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('latest');
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(100);
  const [minRating, setMinRating] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    categoryService.getCategories().then(setCategories);
    brandService.getBrands().then(setBrands);
  }, []);

  useEffect(() => {
    if (!categorySlug) return;
    categoryService.getCategoryBySlug(categorySlug).then((c) => c && setCategory(c.name));
  }, [categorySlug]);

  useEffect(() => {
    setLoading(true);
    const search = searchParams.get('q') || undefined;
    productService
      .getProducts({ category: category || undefined, maxPrice, minRating: minRating || undefined, sort, page, pageSize: 12, search })
      .then((res) => {
        setProducts(res.items);
        setTotalPages(res.totalPages);
        setLoading(false);
      });
  }, [category, maxPrice, minRating, sort, page, searchParams]);

  return (
    <div>
      <Breadcrumb items={[{ label: 'Shop' }]} />
      <div className="container-page grid grid-cols-1 gap-8 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-8">
          <div>
            <p className="mb-3 text-small font-semibold text-gray-900">Category</p>
            <div className="flex flex-col gap-2 text-small text-gray-700">
              <button onClick={() => { setCategory(''); setPage(1); }} className={!category ? 'text-success font-medium' : ''}>All</button>
              {categories.map((c) => (
                <button key={c.id} onClick={() => { setCategory(c.name); setPage(1); }} className={category === c.name ? 'text-success font-medium text-left' : 'text-left'}>
                  {c.name} ({c.productCount})
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-small font-semibold text-gray-900">Price: up to ${maxPrice}</p>
            <input type="range" min={5} max={100} value={maxPrice} onChange={(e) => { setMaxPrice(Number(e.target.value)); setPage(1); }} className="w-full accent-success" />
          </div>
          <div>
            <p className="mb-3 text-small font-semibold text-gray-900">Rating</p>
            <div className="flex flex-col gap-2 text-small text-gray-700">
              {[4, 3, 2, 0].map((r) => (
                <button key={r} onClick={() => { setMinRating(r); setPage(1); }} className={minRating === r ? 'text-success font-medium text-left' : 'text-left'}>
                  {r > 0 ? `${r}+ Stars` : 'All ratings'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-small font-semibold text-gray-900">Brands</p>
            <div className="flex flex-col gap-2 text-small text-gray-700">
              {brands.map((b) => <span key={b.id}>{b.name}</span>)}
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-small text-gray-400">{products.length} products</p>
            <Select value={sort} onChange={(e) => setSort(e.target.value)} className="!py-2 w-48">
              <option value="latest">Latest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </Select>
          </div>
          <ProductGrid products={products} loading={loading} columns={4} />
          <div className="mt-10">
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
