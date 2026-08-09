import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { readWishlist, writeWishlist } from '../services/wishlistService';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => readWishlist());

  useEffect(() => {
    writeWishlist(items);
  }, [items]);

  const toggleItem = (product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        toast.success(`${product.name} removed from wishlist`);
        return prev.filter((i) => i.id !== product.id);
      }
      toast.success(`${product.name} added to wishlist`);
      return [...prev, { id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.images?.[0] }];
    });
  };

  const isWishlisted = (id) => items.some((i) => i.id === id);
  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <WishlistContext.Provider value={{ items, toggleItem, isWishlisted, removeItem, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
