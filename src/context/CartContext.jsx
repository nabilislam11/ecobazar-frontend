import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { readCart, writeCart } from '../services/cartService';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readCart());

  useEffect(() => {
    writeCart(items);
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.images?.[0], quantity }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success('Product removed');
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, subtotal, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
