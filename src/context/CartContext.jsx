// src/context/CartContext.jsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import api from "../services/api";

const CartContext = createContext(null);

function getStoredUserId() {
  try {
    const user = JSON.parse(localStorage.getItem("ecobazar_user") || "null");
    return user?._id || user?.id || null;
  } catch {
    return null;
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===== Get Cart — backend: { cart, totalPrice, success } =====
  const refreshCart = useCallback(async () => {
    const userId = getStoredUserId();

    if (!userId) {
      setItems([]);
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(`/auth/get-cart/${userId}`);

      // 🔥 backend "cart" পাঠায়, "data" না
      const cartItems = response.data?.cart;

      setItems(Array.isArray(cartItems) ? cartItems : []);
    } catch (error) {
      console.error("Load cart error:", error.response?.data || error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();

    const handleAuthChange = () => refreshCart();
    window.addEventListener("ecobazar-auth-changed", handleAuthChange);

    return () => {
      window.removeEventListener("ecobazar-auth-changed", handleAuthChange);
    };
  }, [refreshCart]);

  // ===== Add to Cart =====
  const addItem = async (product, quantity = 1) => {
    const userId = getStoredUserId();
    const proId =
      typeof product === "string" ? product : product?._id || product?.id;

    if (!userId) {
      toast.error("Please login first to add to cart!");
      return;
    }
    if (!proId) {
      toast.error("Invalid product");
      return;
    }

    const qty = Number(quantity) || 1;
    if (!Number.isInteger(qty) || qty < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    try {
      const response = await api.post("/auth/create/cart", {
        userId,
        proId,
        quantity: qty,
      });

      if (!response.data?.success) {
        toast.error(response.data?.message || "Could not add to cart");
        return;
      }

      await refreshCart();
      toast.success(response.data.message || "Product added to cart");
    } catch (error) {
      console.error("Add to cart error:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || "Failed to add product to cart"
      );
    }
  };

  // ===== Quantity + / -  (backend: product id + type + userId) =====
  const updateQuantity = async (productId, type) => {
    const userId = getStoredUserId();
    if (!userId || !productId) return;

    try {
      // route ঠিক করে নাও — উদাহরণ:
      // PUT /auth/update-cart/:id   body: { type, userId }
      const response = await api.put(`/auth/cart-update/${productId}`, {
        type, // "plus" | "minus"
        userId,
      });

      if (!response.data?.success) {
        toast.error(response.data?.message || "Could not update quantity");
        return;
      }

      await refreshCart();
    } catch (error) {
      console.error("Update quantity error:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || "Failed to update quantity"
      );
    }
  };

  // ===== Delete — backend cart item _id দিয়ে delete করে =====
  const removeItem = async (cartItemId) => {
    if (!cartItemId) return;

    try {
      const response = await api.delete(`/auth/cart-delete/${cartItemId}`);

      if (!response.data?.success) {
        toast.error(response.data?.message || "Could not remove item");
        return;
      }

      // local থেকেও সরাও
      setItems((prev) =>
        prev.filter((item) => String(item._id) !== String(cartItemId))
      );

      toast.success("Removed from cart");
    } catch (error) {
      console.error("Remove cart error:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || "Failed to remove item"
      );
      await refreshCart();
    }
  };

  // ===== Clear (শুধু local — চাইলে backend loop করে delete করতে পারো) =====
  const clearCart = async () => {
    try {
      // প্রতিটা item delete করতে চাইলে:
      // await Promise.all(items.map((item) => api.delete(`/auth/delete-cart/${item._id}`)));
      setItems([]);
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Clear cart error:", error);
      await refreshCart();
    }
  };

  const count = items.reduce(
    (sum, item) => sum + (Number(item.product) || 1),
    0
  );

  const subtotal = items.reduce(
    (sum, item) => sum + (Number(item.totalPrice) || 0),
    0
  );

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      total: subtotal,
      totalPrice: subtotal,
      loading,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      refreshCart,
    }),
    [items, loading, refreshCart]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}