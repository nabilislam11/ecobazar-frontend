// Cart persists to localStorage; shaped so a future backend cart endpoint
// (GET/POST /api/cart) can replace the storage calls without touching the UI.
const KEY = 'ecobazar_cart';

export const readCart = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
};

export const writeCart = (items) => {
  localStorage.setItem(KEY, JSON.stringify(items));
  return items;
};
