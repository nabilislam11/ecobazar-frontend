import { customers as data } from '../data/customers';
import { resolveAfter } from './api';

let store = [...data];
export const getCustomers = async () => resolveAfter(store);
export const getCustomerById = async (id) => resolveAfter(store.find((c) => c.id === id) ?? null);
