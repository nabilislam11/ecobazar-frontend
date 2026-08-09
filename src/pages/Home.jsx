import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Headphones, ShieldCheck, PackageCheck } from 'lucide-react';
import * as productService from '../services/productService';
import * as categoryService from '../services/categoryService';
import * as blogService from '../services/blogService';
import ProductGrid from '../components/ecommerce/ProductGrid';
import CategoryCard from '../components/ecommerce/CategoryCard';
import Button from '../components/common/Button';

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'Free shipping on all your order' },
  { icon: Headphones, title: 'Customer Support 24/7', desc: 'Instant access to Support' },
  { icon: ShieldCheck, title: '100% Secure Payment', desc: 'We ensure your money is save' },
  { icon: PackageCheck, title: 'Money-Back Guarantee', desc: '30 Days Money-Back Guarantee' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [popular, setPopular] = useState([]);
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      productService.getFeaturedProducts(),
      productService.getProducts({ pageSize: 10, sort: 'rating' }),
      categoryService.getCategories(),
      blogService.getBlogs(),
    ]).then(([feat, pop, cats, blogList]) => {
      setFeatured(feat.slice(0, 5));
      setPopular(pop.items);
      setCategories(cats);
      setBlogs(blogList.slice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {/* Hero banners */}
      <section className="container-page py-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="relative flex flex-col justify-center overflow-hidden rounded-lg bg-success/10 p-10 lg:col-span-2">
            <p className="mb-3 text-small font-medium text-success-dark">100% Organic Vegetables</p>
            <h1 className="mb-4 max-w-md text-4xl font-semibold leading-tight text-gray-900">
              Fresh &amp; Healthy Organic Food
            </h1>
            <p className="mb-6 max-w-sm text-small text-gray-700">
              Sale up to 30% off on your first order. Farm-fresh produce delivered to your door.
            </p>
            <Button as={Link} to="/shop" size="lg" className="w-fit">
              Shop Now
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex-1 rounded-lg bg-gray-50 p-6">
              <p className="text-small font-medium text-gray-900">Fresh Fruit Bundles</p>
              <p className="mt-1 text-tiny text-gray-400">Starting at $9.99</p>
              <Link to="/shop/fresh-fruit" className="mt-3 inline-block text-small font-medium text-success">Shop Now →</Link>
            </div>
            <div className="flex-1 rounded-lg bg-gray-50 p-6">
              <p className="text-small font-medium text-gray-900">Cooking Essentials</p>
              <p className="mt-1 text-tiny text-gray-400">Up to 25% off</p>
              <Link to="/shop/cooking" className="mt-3 inline-block text-small font-medium text-success">Shop Now →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-y border-gray-100">
        <div className="container-page grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4">
              <Icon className="text-success" size={32} />
              <div>
                <p className="text-small font-medium text-gray-900">{title}</p>
                <p className="text-tiny text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="container-page py-12">
        <SectionHeading title="Popular Categories" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      {/* Hot Deals */}
      <section className="container-page py-6">
        <SectionHeading title="Hot Deals" />
        <ProductGrid products={popular.slice(0, 5)} loading={loading} columns={5} />
      </section>

      {/* Discount banner */}
      <section className="container-page py-6">
        <div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-success-dark px-10 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-small font-medium text-white/80">Limited Time Offer</p>
            <h3 className="text-2xl font-semibold text-white">Get 30% Off Your First Order</h3>
          </div>
          <Button as={Link} to="/shop" variant="border" size="lg" className="!border-white !text-white shrink-0">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Popular Products */}
      <section className="bg-gray-50 py-12">
        <div className="container-page">
          <SectionHeading title="Popular Products" />
          <ProductGrid products={popular.slice(0, 10)} loading={loading} columns={5} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-page py-12">
        <SectionHeading title="Featured Products" />
        <ProductGrid products={featured} loading={loading} columns={5} />
      </section>

      {/* Latest News */}
      <section className="container-page py-12">
        <SectionHeading title="Latest News" center />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((b) => (
            <Link key={b.id} to={`/blog/${b.slug}`} className="group rounded-lg border border-gray-100 overflow-hidden">
              <div className="aspect-[16/10] bg-gray-50" />
              <div className="p-5">
                <p className="mb-2 text-tiny font-medium text-success">{b.category}</p>
                <p className="line-clamp-2 text-small font-medium text-gray-900 group-hover:text-success">{b.title}</p>
                <p className="mt-2 text-tiny text-gray-400">{new Date(b.publishDate).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-12">
        <div className="container-page">
          <SectionHeading title="Client Testimonials" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-gray-100 bg-white p-6">
                <p className="mb-4 text-small text-gray-700">
                  “Fresh produce every time, delivered fast. EcoBazar has become our weekly go-to for groceries.”
                </p>
                <p className="text-small font-medium text-gray-900">Jane Cooper</p>
                <p className="text-tiny text-gray-400">Verified Buyer</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({ title, center }) {
  return (
    <div className={`mb-8 flex items-center ${center ? 'justify-center' : 'justify-between'}`}>
      <h2 className="text-[26px] font-semibold text-gray-900">{title}</h2>
    </div>
  );
}
