import { categories as data } from '../data/categories';
import { resolveAfter } from './api';

let store = [...data];

export const getCategories = async () => resolveAfter(store);
export const getCategoryBySlug = async (slug) => resolveAfter(store.find((c) => c.slug === slug) ?? null);
export const createCategory = async (payload) => {
  const id = `cat-${String(store.length + 1).padStart(3, '0')}`;
  const cat = { id, status: 'active', ...payload };
  store = [...store, cat];
  return resolveAfter(cat);
};
export const updateCategory = async (id, payload) => {
  store = store.map((c) => (c.id === id ? { ...c, ...payload } : c));
  return resolveAfter(store.find((c) => c.id === id));
};
export const deleteCategory = async (id) => {
  store = store.filter((c) => c.id !== id);
  return resolveAfter({ success: true });
};
