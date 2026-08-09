import { brands as data } from '../data/brands';
import { resolveAfter } from './api';

let store = [...data];

export const getBrands = async () => resolveAfter(store);
export const createBrand = async (payload) => {
  const id = `brand-${String(store.length + 1).padStart(3, '0')}`;
  const brand = { id, status: 'active', ...payload };
  store = [...store, brand];
  return resolveAfter(brand);
};
export const updateBrand = async (id, payload) => {
  store = store.map((b) => (b.id === id ? { ...b, ...payload } : b));
  return resolveAfter(store.find((b) => b.id === id));
};
export const deleteBrand = async (id) => {
  store = store.filter((b) => b.id !== id);
  return resolveAfter({ success: true });
};
