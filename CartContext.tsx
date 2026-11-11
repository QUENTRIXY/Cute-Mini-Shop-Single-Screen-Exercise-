
import React, { createContext, useState } from 'react';

export type Product = {
  id: string;
  productName: string;
  description: string;
  price: number;
  category: string;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  const removeFromCart = (id: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
