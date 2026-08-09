import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

const accountLinks = [
  { label: 'My Account', to: '/account' },
  { label: 'Order History', to: '/account/orders' },
  { label: 'Shoping Cart', to: '/cart' },
  { label: 'Wishlist', to: '/wishlist' },
];
const helpLinks = [
  { label: 'Contact', to: '/contact' },
  { label: 'Faqs', to: '/faqs' },
  { label: 'Terms & Condition', to: '/terms' },
  { label: 'Privacy Policy', to: '/privacy' },
];
const proxyLinks = [
  { label: 'About', to: '/about' },
  { label: 'Shop', to: '/shop' },
  { label: 'Product', to: '/shop' },
  { label: 'Track Order', to: '/account/orders' },
];
const categoryLinks = [
  { label: 'Fruit & Vegetables', to: '/shop/vegetables' },
  { label: 'Meat & Fish', to: '/shop/meat-fish' },
  { label: 'Bread & Bakery', to: '/shop/bread-bakery' },
  { label: 'Beauty & Health', to: '/shop/beauty-health' },
];

export default function Footer() {
  return (
    <footer>
      {/* Newsletter band */}
      <div className="bg-gray-50">
        <div className="container-page flex flex-col items-start gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[24px] font-semibold text-gray-900">Subcribe our Newsletter</p>
            <p className="max-w-md text-small text-gray-400">
              Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success('Subscribed!');
              e.target.reset();
            }}
            className="flex w-full max-w-xl items-center justify-between rounded-pill border border-gray-100 bg-white pl-6 pr-2 py-2 lg:w-auto"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="w-full text-medium text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
            <button type="submit" className="shrink-0 rounded-pill bg-success px-10 py-4 text-medium font-semibold text-white hover:bg-success-dark">
              Subscribe
            </button>
          </form>
          <div className="flex gap-2">
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-success text-white hover:bg-success-dark">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Dark footer */}
      <div className="bg-gray-900 pt-14 text-gray-200">
        <div className="container-page grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              <span className="text-[32px] font-medium tracking-tight text-white">Ecobazar</span>
            </Link>
            <p className="mt-4 max-w-xs text-small text-gray-400">
              Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui, eget bibendum magna congue nec.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-small font-medium text-white">
              <span className="flex items-center gap-2 border-b-2 border-success pb-1"><Phone size={14} /> (219) 555-0114</span>
              <span className="text-gray-400">or</span>
              <span className="flex items-center gap-2 border-b-2 border-success pb-1 underline"><Mail size={14} /> Proxy@gmail.com</span>
            </div>
          </div>

          <FooterCol title="My Account" links={accountLinks} />
          <FooterCol title="Helps" links={helpLinks} />
          <FooterCol title="Proxy" links={proxyLinks} />
          <FooterCol title="Categories" links={categoryLinks} />
        </div>

        <div className="container-page mt-14 flex flex-col items-center gap-4 border-t border-gray-800 py-6 sm:flex-row sm:justify-between">
          <p className="text-small text-gray-400">Ecobazar eCommerce © 2026. All Rights Reserved</p>
          <div className="flex items-center gap-2">
            {['Apple Pay', 'Visa', 'Discover', 'Mastercard'].map((m) => (
              <span key={m} className="rounded border border-gray-700 px-2 py-1.5 text-[10px] text-gray-300">
                {m}
              </span>
            ))}
            <span className="rounded border border-gray-700 px-2 py-1.5 text-[10px] text-gray-300">🔒 Secure Payment</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <p className="mb-5 text-medium font-medium text-white">{title}</p>
      <div className="flex flex-col gap-3 text-small text-gray-400">
        {links.map((l) => (
          <Link key={l.label} to={l.to} className="hover:text-success">{l.label}</Link>
        ))}
      </div>
    </div>
  );
}
