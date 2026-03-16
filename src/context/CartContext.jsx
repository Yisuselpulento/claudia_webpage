import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (pack) => {
    const exists = cartItems.find(item => item._id === pack._id);
    if (exists) {
      toast.error("Este pack ya está en el carrito");
      return;
    }
    setCartItems(prev => [...prev, pack]);
    toast.success("Pack agregado al carrito");
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  const cartTotal = cartItems.reduce((sum, item) => {
    const price = item.offer?.isActive ? item.offer.price : item.price;
    return sum + price;
  }, 0);

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartTotal, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};