import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./components/context/AuthContext";
import CartProvider from "./components/context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
);
