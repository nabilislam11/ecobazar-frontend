
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

const WishlistContext = createContext(null);

function getStoredUserId() {
  try {
    const user = JSON.parse(
      localStorage.getItem("ecobazar_user") || "null"
    );

    return user?._id || user?.id || null;
  } catch {
    return null;
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load wishlist from MongoDB
  const refreshWishlist = useCallback(async () => {
    const userId = getStoredUserId();

    if (!userId) {
      setItems([]);
      return;
    }

    setLoading(true);

    try {
      const response = await api.get(
        `/auth/wishlist/${userId}`
      );

      const products = response.data?.data;

      setItems(
        Array.isArray(products) ? products : []
      );
    } catch (error) {
      console.error(
        "Load wishlist error:",
        error.response?.data || error
      );

      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshWishlist();

    // Login/logout-er por wishlist reload korar jonno
    const handleAuthChange = () => {
      refreshWishlist();
    };

    window.addEventListener(
      "ecobazar-auth-changed",
      handleAuthChange
    );

    return () => {
      window.removeEventListener(
        "ecobazar-auth-changed",
        handleAuthChange
      );
    };
  }, [refreshWishlist]);

  // Add or remove a product through the backend
  const toggleItem = async (product) => {
    const productId =
      typeof product === "string"
        ? product
        : product?._id || product?.id;

    const userId = getStoredUserId();

    if (!userId) {
      toast.error("Please login to use wishlist");
      return;
    }

    if (!productId) {
      toast.error("Invalid product");
      return;
    }

    try {
      const response = await api.post(
        "/auth/wishlist/toggle",
        {
          userId,
          productId,
        }
      );

      if (!response.data?.success) {
        toast.error(
          response.data?.message ||
          "Could not update wishlist"
        );
        return;
      }

      if (response.data.wishlisted) {
        // Add product without creating duplicates
        if (typeof product === "object" && product?._id) {
          setItems((previous) => {
            const alreadyExists = previous.some(
              (item) =>
                String(item._id) === String(productId)
            );

            return alreadyExists
              ? previous
              : [...previous, product];
          });
        } else {
          await refreshWishlist();
        }
      } else {
        // Remove product from local UI state
        setItems((previous) =>
          previous.filter(
            (item) =>
              String(item._id) !== String(productId)
          )
        );
      }

      toast.success(
        response.data.message ||
        (response.data.wishlisted
          ? "Added to wishlist"
          : "Removed from wishlist")
      );
    } catch (error) {
      console.error(
        "Toggle wishlist error:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to update wishlist"
      );
    }
  };

  const isWishlisted = (productId) =>
    items.some(
      (item) =>
        String(item._id) === String(productId)
    );

  const removeItem = async (productOrId) => {
    const productId =
      typeof productOrId === "string"
        ? productOrId
        : productOrId?._id || productOrId?.id;

    if (!productId || !isWishlisted(productId)) {
      return;
    }

    await toggleItem(
      items.find(
        (item) =>
          String(item._id) === String(productId)
      )
    );
  };

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      loading,
      toggleItem,
      isWishlisted,
      removeItem,
      refreshWishlist,
    }),
    [items, loading, refreshWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used within WishlistProvider"
    );
  }

  return context;
}
