const KEY = 'ecobazar_wishlist';

export const readWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
};

export const writeWishlist = (items) => {
  localStorage.setItem(KEY, JSON.stringify(items));
  return items;
};
