import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const isAlreadyInCart = prevCart.some((item) => item.id === product.id);
      if (isAlreadyInCart) return prevCart; // Avoid duplicates
      return [...prevCart, product];
    });
  };

  const addAllToCart = (products) => {
    setCart((prevCart) => {
      const newProducts = products.filter(
        (product) => !prevCart.some((item) => item.id === product.id)
      );
      return [...prevCart, ...newProducts];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, addAllToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
