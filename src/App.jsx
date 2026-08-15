import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AccountLayout from './layouts/AccountLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import Loader from './components/common/Loader';

// Customer pages
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/shop/Shop'));
const ProductDetails = lazy(() => import('./pages/product/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Verify = lazy(() => import('./pages/Verify'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Faqs = lazy(() => import('./pages/Faqs'));
const Search = lazy(() => import('./pages/Search'));
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Account pages
const Profile = lazy(() => import('./pages/account/Profile'));
const Orders = lazy(() => import('./pages/account/Orders'));
const OrderDetail = lazy(() => import('./pages/account/OrderDetail'));
const AccountWishlist = lazy(() => import('./pages/account/Wishlist'));
const Addresses = lazy(() => import('./pages/account/Addresses'));
const AccountSettings = lazy(() => import('./pages/account/Settings'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ProductsList = lazy(() => import('./pages/admin/ProductsList'));
const ProductForm = lazy(() => import('./pages/admin/ProductForm'));
const CategoriesList = lazy(() => import('./pages/admin/CategoriesList'));
const CategoryForm = lazy(() => import('./pages/admin/CategoryForm'));
const BrandsList = lazy(() => import('./pages/admin/BrandsList'));
const BrandForm = lazy(() => import('./pages/admin/BrandForm'));
const OrdersList = lazy(() => import('./pages/admin/OrdersList'));
const AdminOrderDetail = lazy(() => import('./pages/admin/OrderDetail'));
const CustomersList = lazy(() => import('./pages/admin/CustomersList'));
const CustomerDetail = lazy(() => import('./pages/admin/CustomerDetail'));
const Reviews = lazy(() => import('./pages/admin/Reviews'));
const BlogsList = lazy(() => import('./pages/admin/BlogsList'));
const BlogForm = lazy(() => import('./pages/admin/BlogForm'));
const Coupons = lazy(() => import('./pages/admin/Coupons'));
const AdminNotifications = lazy(() => import('./pages/admin/Notifications'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Customer-facing site */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/categories" element={<Shop />} />
          <Route path="/categories/:slug" element={<Shop />} />
          <Route path="/brands" element={<Shop />} />
          <Route path="/brand/:slug" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/verifyemail/:token" element={<Verify />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />

          {/* Customer account (protected) */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="wishlist" element={<AccountWishlist />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="settings" element={<AccountSettings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="products/create" element={<ProductForm mode="create" />} />
          <Route path="products/:id/edit" element={<ProductForm mode="edit" />} />
          <Route path="categories" element={<CategoriesList />} />
          <Route path="categories/create" element={<CategoryForm mode="create" />} />
          <Route path="categories/:id/edit" element={<CategoryForm mode="edit" />} />
          <Route path="brands" element={<BrandsList />} />
          <Route path="brands/create" element={<BrandForm mode="create" />} />
          <Route path="brands/:id/edit" element={<BrandForm mode="edit" />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="orders/:id" element={<AdminOrderDetail />} />
          <Route path="customers" element={<CustomersList />} />
          <Route path="customers/:id" element={<CustomerDetail />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="blogs" element={<BlogsList />} />
          <Route path="blogs/create" element={<BlogForm mode="create" />} />
          <Route path="blogs/:id/edit" element={<BlogForm mode="edit" />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
