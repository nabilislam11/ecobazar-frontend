# EcoBazar — Frontend

A complete, frontend-only React implementation of the EcoBazar organic e-commerce
site, built from the real Figma design file (component library + assembled pages).
Ships with dummy data, works entirely offline via `localStorage`, and is structured
so a real backend can be plugged in later with minimal changes.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Demo credentials

- **Customer**: any email/password (dummy auth accepts anything non-empty)
- **Admin**: `admin@ecobazar.com` / `admin123` at `/admin/login`

## What's implemented

**Customer site**: Home, Shop (filter/sort/paginate), Product Details, Cart,
Wishlist, Checkout, Order Success, Sign In/Up, Forgot/Reset Password, Account
(Profile, Orders, Order Detail, Wishlist, Addresses, Settings), About, Contact,
FAQs, Blog List/Detail, Search, 404.

**Admin dashboard**: Login (protected via `AdminProtectedRoute`), Dashboard
with live stats, Product CRUD (list/create/edit/delete), Category CRUD, Brand
CRUD, Order management + status updates, Customer list/detail, Review
moderation, Blog CRUD, Coupons, Notifications, Settings.

## Architecture — connecting your real backend later

Only `src/services/*.js` should need to change. Every service currently
resolves dummy data from `src/data/*.js` with a simulated network delay; each
function's signature already matches what a real REST call would return.

```js
// src/services/productService.js — today
export const getProducts = async (params) => {
  // filters src/data/products.js in memory
  return resolveAfter({ items, total, page, totalPages });
};

// tomorrow — same signature, same consumers, zero UI changes
export const getProducts = async (params) => {
  const { data } = await api.get('/products', { params });
  return data;
};
```

`src/services/api.js` has a commented-out Axios instance with an auth
interceptor ready to uncomment once you have a real API.

## Folder structure

```
src/
├── data/          # dummy datasets (swap source here or in services)
├── services/      # the ONLY layer that should change for a real backend
├── context/       # AuthContext, AdminAuthContext, CartContext, WishlistContext
├── components/
│   ├── common/    # Button, Input, Modal, Pagination, Header, Footer, etc.
│   ├── ecommerce/ # ProductCard, ProductGrid, Rating, CartItem, etc.
│   └── admin/     # AdminSidebar, AdminTable, AdminStatsCard, etc.
├── layouts/       # MainLayout, AccountLayout, AdminLayout
└── pages/         # route-level pages, mirrors the route table in App.jsx
```

## Design tokens (pulled from the Figma file)

- Success: `#00B207` / Success Dark: `#2C742F`
- Error: `#EA4B48` · Warning: `#FF8A00`
- Gray scale: `#1A1A1A / #4D4D4D / #999999 / #CCCCCC / #E5E5E5 / #F2F2F2`
- Font: Poppins (400/500/600)

## Known gaps / next steps

- Product images point to `/public/images/...` placeholder paths — drop real
  images in `public/images/` matching the filenames in `src/data/products.js`,
  or swap `productService.getProducts` for a real API that returns hosted URLs.
- Coupon logic in Cart/Checkout is UI-only (no real discount calculation yet).
- A few secondary pages (Categories, Brands index pages) currently reuse the
  Shop page filtered by param — fine for a frontend-only build, but flag if
  you want dedicated layouts once the Figma pages for those are available.
