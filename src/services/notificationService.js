import { notifications as data } from '../data/notifications';
import { resolveAfter } from './api';

let store = [...data];
export const getNotifications = async () => resolveAfter(store);
export const markAsRead = async (id) => {
  store = store.map((n) => (n.id === id ? { ...n, read: true } : n));
  return resolveAfter(store);
};
