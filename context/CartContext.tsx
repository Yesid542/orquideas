// context/CartContext.tsx
"use client";
import { createContext, useContext, useState } from "react";

export type CartItem = { 
  name: string; 
  price: number; 
  quantity?: number; // opcional
};

interface CartContextType {
  isOpenCart: boolean;
  setIsOpenCart: (value: boolean) => void;
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  return (
    <CartContext.Provider value={{ isOpenCart, setIsOpenCart, items, setItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
