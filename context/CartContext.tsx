// context/CartContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";
import {useEffect} from "react";
export type CartItem = { 
  name: string; 
  price: number; 
  quantity?: number; // opcional
  description?:string;
};

interface CartContextType {
  isOpenCart: boolean;
  setIsOpenCart: (value: boolean) => void;
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void; // 👈 nuevo

}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);


  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);
   useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

   const addItem = (item: CartItem) => {
    setItems((prev) => [...prev, item]); // 👈 agrega al array
  };
   const removeItem = (name: string) => {
    setItems((prev) => prev.filter((item) => item.name !== name));
  };

  return (
    <CartContext.Provider value={{ isOpenCart, setIsOpenCart, items, setItems, addItem}}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
