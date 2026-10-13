import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Truck,
  Headphones,
  ShieldCheck,
  PackageCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { getImageUrl, getMainImage } from '../utils/imageUtils';
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
  const [todaysDeal, setTodaysDeal] = useState([]);
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderProducts, setSliderProducts] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    if (!sliderProducts.length) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderProducts.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [sliderProducts.length]);
  const activeProduct = sliderProducts[activeSlide];
  useEffect(() => {
    Promise.all([
      productService.getProductsByParams({
        pageSize: 5,
        section: "slider",
      }),

      productService.getProductsByParams({
        pageSize: 10,
        section: "populerDeals",
      }),

      productService.getProductsByParams({
        pageSize: 10,
        section: "todaysDeal",
      }),

      productService.getProductsByParams({
        pageSize: 10,
        section: "featuredProducts",
      }),

      categoryService.getCategories(),
      blogService.getBlogs(),
    ])
      .then(([sliderRes, popularRes, dealsRes, featuredRes, cats, blogList]) => {
        const toArray = (response) =>
          Array.isArray(response)
            ? response
            : response?.items || response?.data || [];

        setSliderProducts(toArray(sliderRes));
        setPopular(toArray(popularRes));
        setTodaysDeal(toArray(dealsRes));
        setFeatured(toArray(featuredRes));

        setCategories(Array.isArray(cats) ? cats : cats?.data || []);
        setBlogs(Array.isArray(blogList) ? blogList.slice(0, 3) : []);

        setActiveSlide(0);
      })
      .catch((error) => {
        console.error("Homepage data load failed:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Hero Product Slider + Advertisements */}
      <section className="container-page py-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Product Slider */}
          <div className="relative overflow-hidden rounded-lg bg-success/10 lg:col-span-2">

            {activeProduct ? (
              <>
                <Link
                  to={`/product/${activeProduct.slug}`}
                  className="grid min-h-[400px] grid-cols-1 items-center gap-6 p-8 sm:grid-cols-2 sm:p-10"
                >
                  {/* Product Info */}
                  <div>
                    <p className="mb-3 text-small font-medium text-success-dark">
                      Featured Product
                    </p>

                    <h1 className="mb-4 max-w-md text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl">
                      {activeProduct.title}
                    </h1>

                    <p className="mb-6 max-w-sm text-small text-gray-700">
                      {activeProduct.shortDescription ||
                        activeProduct.description?.slice(0, 100)}
                    </p>

                    <span className="inline-block rounded bg-success px-5 py-3 text-small font-medium text-white">
                      Shop Now
                    </span>

                    <p className="mt-4 text-2xl font-semibold text-gray-900">
                      ${Number(activeProduct.price).toFixed(2)}
                    </p>
                  </div>

                  {/* Product Image */}
                  <div className="flex h-[300px] items-center justify-center">
                    {activeProduct.images?.length > 0 ? (
                      <img
                        src={getImageUrl(getMainImage(activeProduct.images))}
                        alt={activeProduct.title}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="text-gray-400">
                        No image available
                      </div>
                    )}
                  </div>
                </Link>

                {/* Previous */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlide(
                      (prev) =>
                        (prev - 1 + sliderProducts.length) % sliderProducts.length
                    )
                  }
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Next */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlide(
                      (prev) => (prev + 1) % sliderProducts.length
                    )
                  }
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
                  {sliderProducts.map((product, index) => (
                    <button
                      key={product._id || index}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 w-2.5 rounded-full ${activeSlide === index
                        ? 'bg-success'
                        : 'bg-gray-300'
                        }`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex min-h-[400px] items-center justify-center text-gray-400">
                Loading products...
              </div>
            )}

          </div>

          {/* Advertisement Cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">

            {/* Advertisement 1 */}
            <Link
              to="/shop"
              className="flex min-h-[190px] flex-col justify-center rounded-lg bg-gray-50 p-6 transition hover:shadow-md"
            >
              <p className="mb-2 text-tiny font-medium text-success">
                Fresh & Healthy
              </p>

              <h3 className="text-xl font-semibold text-gray-900">
                Fresh Fruit
                <br />
                Collections
              </h3>

              <p className="mt-2 text-tiny text-gray-400">
                Starting from $9.99
              </p>

              <span className="mt-4 text-small font-medium text-success">
                Shop Now →
              </span>
            </Link>

            {/* Advertisement 2 */}
            <Link
              to="/shop"
              className="flex min-h-[190px] flex-col justify-center rounded-lg bg-gray-50 p-6 transition hover:shadow-md"
            >
              <p className="mb-2 text-tiny font-medium text-success">
                Special Offer
              </p>

              <h3 className="text-xl font-semibold text-gray-900">
                Cooking
                <br />
                Essentials
              </h3>

              <p className="mt-2 text-tiny text-gray-400">
                Up to 25% off
              </p>

              <span className="mt-4 text-small font-medium text-success">
                Shop Now →
              </span>
            </Link>

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
        <ProductGrid products={todaysDeal.slice(0, 5)} loading={loading} columns={5} />
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
        <ProductGrid products={featured.slice(0, 10)} loading={loading} columns={5} />
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
