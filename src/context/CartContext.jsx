import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Cargar carrito desde localStorage si existe
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Error parsing cartItems from localStorage", err);
      return [];
    }
  });

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (pack) => {
    const exists = cartItems.find((item) => item._id === pack._id);
    if (exists) {
      toast.error("Este pack ya está en el carrito");
      return;
    }
    setCartItems((prev) => [...prev, pack]);
    toast.success("Pack agregado al carrito");
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
    toast.success("Pack eliminado del carrito");
  };

  const cartTotal = cartItems.reduce((sum, item) => {
    const price = item.offer?.isActive ? item.offer.price : item.price;
    return sum + price;
  }, 0);

  const clearCart = () => {
    setCartItems([]);
    toast.success("Carrito vaciado");
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, cartTotal, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};