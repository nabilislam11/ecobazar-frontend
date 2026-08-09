import { users } from '../data/users';
import { resolveAfter } from './api';

export const getCurrentUser = async () => resolveAfter(users[0]);
export const updateUser = async (id, payload) => resolveAfter({ ...users[0], ...payload });
