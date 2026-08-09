import { reviews as data } from '../data/reviews';
import { resolveAfter } from './api';

let store = [...data];
export const getReviews = async (productId) => resolveAfter(productId ? store.filter((r) => r.productId === productId) : store);
export const updateReviewStatus = async (id, status) => {
  store = store.map((r) => (r.id === id ? { ...r, status } : r));
  return resolveAfter(store.find((r) => r.id === id));
};
export const deleteReview = async (id) => {
  store = store.filter((r) => r.id !== id);
  return resolveAfter({ success: true });
};
