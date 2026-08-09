import { products as data } from '../data/products';
import { resolveAfter } from './api';

let store = [...data];

export const getProducts = async (params = {}) => {
  let result = [...store];
  const { category, brand, minPrice, maxPrice, minRating, search, sort, page = 1, pageSize = 12 } = params;

  if (category) result = result.filter((p) => p.category === category);
  if (brand) result = result.filter((p) => p.brand === brand);
  if (minPrice != null) result = result.filter((p) => p.price >= minPrice);
  if (maxPrice != null) result = result.filter((p) => p.price <= maxPrice);
  if (minRating != null) result = result.filter((p) => p.rating >= minRating);
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
  }
  if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
  if (sort === 'latest') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);

  const total = result.length;
  const start = (page - 1) * pageSize;
  const paged = result.slice(start, start + pageSize);

  return resolveAfter({ items: paged, total, page, pageSize, totalPages: Math.ceil(total / pageSize) });
};

export const getFeaturedProducts = async () => resolveAfter(store.filter((p) => p.featured));
export const getProductBySlug = async (slug) => resolveAfter(store.find((p) => p.slug === slug) ?? null);
export const getProductById = async (id) => resolveAfter(store.find((p) => p.id === id) ?? null);
export const getRelatedProducts = async (product, limit = 4) =>
  resolveAfter(store.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit));

// Admin CRUD — writes to the in-memory store (swap for POST/PUT/DELETE later)
export const createProduct = async (payload) => {
  const id = `product-${String(store.length + 1).padStart(3, '0')}`;
  const newProduct = { id, status: 'active', createdAt: new Date().toISOString(), ...payload };
  store = [newProduct, ...store];
  return resolveAfter(newProduct);
};
export const updateProduct = async (id, payload) => {
  store = store.map((p) => (p.id === id ? { ...p, ...payload } : p));
  return resolveAfter(store.find((p) => p.id === id));
};
export const deleteProduct = async (id) => {
  store = store.filter((p) => p.id !== id);
  return resolveAfter({ success: true });
};
