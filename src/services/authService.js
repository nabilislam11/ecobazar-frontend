// Frontend-only customer auth. Swap the body of login()/register() for real
// JWT calls later — AuthContext and every consuming component stay the same.
const DUMMY_USER = { id: 'user-001', firstName: 'Dennis', lastName: 'Nzioki', email: 'dennis@example.com' };

export const login = async (email, password) => {
  await new Promise((r) => setTimeout(r, 300));
  if (!email || !password) throw new Error('Email and password are required');
  return { user: DUMMY_USER, token: 'dummy-customer-token' };
};

export const register = async (payload) => {
  await new Promise((r) => setTimeout(r, 300));
  return { user: { ...DUMMY_USER, ...payload }, token: 'dummy-customer-token' };
};
