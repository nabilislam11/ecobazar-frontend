import { blogs as data } from '../data/blogs';
import { resolveAfter } from './api';

let store = [...data];
export const getBlogs = async () => resolveAfter(store);
export const getBlogBySlug = async (slug) => resolveAfter(store.find((b) => b.slug === slug) ?? null);
export const createBlog = async (payload) => {
  const id = `blog-${store.length + 1}`;
  const blog = { id, status: 'draft', publishDate: new Date().toISOString(), commentCount: 0, ...payload };
  store = [blog, ...store];
  return resolveAfter(blog);
};
export const updateBlog = async (id, payload) => {
  store = store.map((b) => (b.id === id ? { ...b, ...payload } : b));
  return resolveAfter(store.find((b) => b.id === id));
};
export const deleteBlog = async (id) => {
  store = store.filter((b) => b.id !== id);
  return resolveAfter({ success: true });
};
