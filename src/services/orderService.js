import { orders as data } from '../data/orders';
import { resolveAfter } from './api';

let store = [...data];

export const getOrders = async (params = {}) => {
  let result = [...store];
  if (params.status) result = result.filter((o) => o.status === params.status);
  return resolveAfter(result);
};
export const getOrderById = async (id) => resolveAfter(store.find((o) => o.id === id) ?? null);
export const createOrder = async (payload) => {
  const id = `ORD-${4100 + store.length}`;
  const order = { id, date: new Date().toISOString(), status: 'Order received', paymentStatus: 'Pending', ...payload };
  store = [order, ...store];
  return resolveAfter(order);
};
export const updateOrderStatus = async (id, status) => {
  store = store.map((o) => (o.id === id ? { ...o, status } : o));
  return resolveAfter(store.find((o) => o.id === id));
};
