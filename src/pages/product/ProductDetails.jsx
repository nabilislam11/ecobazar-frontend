import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import * as productService from '../../services/productService';
import * as reviewService from '../../services/reviewService';
import Breadcrumb from '../../components/common/Breadcrumb';
import Rating from '../../components/ecommerce/Rating';
import ProductGallery from '../../components/ecommerce/ProductGallery';
import ProductGrid from '../../components/ecommerce/ProductGrid';
import ReviewCard from '../../components/ecommerce/ReviewCard';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();

  useEffect(() => {
    setProduct(null);
    productService.getProductBySlug(slug).then((p) => {
      setProduct(p);
      if (p) {
        productService.getRelatedProducts(p).then(setRelated);
        reviewService.getReviews(p.id).then(setReviews);
      }
    });
  }, [slug]);

  if (!product) return <Loader label="Loading product…" />;

  return (
    <div>
      <Breadcrumb items={[{ label: 'Shop', to: '/shop' }, { label: product.name }]} />
      <div className="container-page grid grid-cols-1 gap-10 py-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />
        <div>
          <h1 className="mb-2 text-2xl font-semibold text-gray-900">{product.name}</h1>
          <div className="mb-4 flex items-center gap-3">
            <Rating value={product.rating} count={product.reviewCount} />
            <span className="text-tiny text-gray-400">SKU: {product.sku}</span>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl font-semibold text-gray-900">${product.price.toFixed(2)}</span>
            {product.oldPrice && <span className="text-medium text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>}
            {product.discount > 0 && <span className="rounded bg-error/10 px-2 py-1 text-tiny font-medium text-error">-{product.discount}%</span>}
          </div>
          <p className="mb-6 text-small text-gray-700">{product.description}</p>
          <p className="mb-6 text-small text-gray-400">
            Stock: <span className={product.stock > 0 ? 'text-success' : 'text-error'}>{product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</span>
          </p>

          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-pill border border-gray-100 px-3 py-2">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus size={16} /></button>
              <span className="w-6 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}><Plus size={16} /></button>
            </div>
            <Button onClick={() => addItem(product, qty)} size="lg" className="flex-1 gap-2">
              <ShoppingBag size={18} /> Add to Cart
            </Button>
            <button
              onClick={() => toggleItem(product)}
              aria-label="Wishlist"
              className={`flex h-12 w-12 items-center justify-center rounded-full border ${isWishlisted(product.id) ? 'border-error text-error' : 'border-gray-100 text-gray-700'}`}
            >
              <Heart size={18} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
          <Button as={Link} to="/checkout" variant="border" size="lg" className="w-full" onClick={() => addItem(product, qty)}>
            Buy Now
          </Button>
        </div>
      </div>

      {/* Tabs: Description / Additional Info / Reviews */}
      <div className="container-page pb-14">
        <div className="mb-6 flex gap-8 border-b border-gray-100">
          {['description', 'additional', 'reviews'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`border-b-2 pb-3 text-small font-medium capitalize ${tab === t ? 'border-success text-success' : 'border-transparent text-gray-400'}`}
            >
              {t === 'additional' ? 'Additional Info' : t} {t === 'reviews' && `(${reviews.length})`}
            </button>
          ))}
        </div>
        {tab === 'description' && <p className="max-w-3xl text-small text-gray-700">{product.description}</p>}
        {tab === 'additional' && (
          <table className="w-full max-w-xl text-small">
            <tbody>
              {[['Brand', product.brand], ['Category', product.category], ['SKU', product.sku], ['Stock', product.stock]].map(([k, v]) => (
                <tr key={k} className="border-b border-gray-100">
                  <td className="w-40 py-3 text-gray-400">{k}</td>
                  <td className="py-3 text-gray-900">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === 'reviews' && (
          <div className="max-w-2xl">
            {reviews.length ? reviews.map((r) => <ReviewCard key={r.id} review={r} />) : <p className="text-small text-gray-400">No reviews yet.</p>}
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="container-page pb-16">
          <h2 className="mb-6 text-[22px] font-semibold text-gray-900">Related Products</h2>
          <ProductGrid products={related} columns={4} />
        </div>
      )}
    </div>
  );
}
