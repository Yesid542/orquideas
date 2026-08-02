"use client";

import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/context/CartContext"; // 👈 importa el tipo

export function CartSidebar() {
  const { isOpenCart, setIsOpenCart, items } = useCart();

  console.log("Estado actual:", isOpenCart);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform ${
        isOpenCart ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={() => setIsOpenCart(false)}
        className="p-2 text-red-500"
      >
        Cerrar
      </button>
      <h2 className="p-4 font-bold">Carrito</h2>
      <ul>
        {items.map((item: CartItem, i: number) => (
          <li key={i} className="p-2 border-b">
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
