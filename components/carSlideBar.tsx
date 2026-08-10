"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Trash2 } from "lucide-react"; // 👈 importamos el ícono

export function CartSidebar() {
  const { isOpenCart, setIsOpenCart, items, removeItem } = useCart();

  // Calcular total
  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform z-50 ${
        isOpenCart ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={() => setIsOpenCart(false)}
        className="p-2 text-red-500"
      >
        Cerrar
      </button>

      <h2 className="p-4 font-bold text-primary">Carrito</h2>

      {items.length === 0 ? (
        <div className="p-4 text-center">
          <p className="text-muted-foreground">Tu carrito está vacío 🌸</p>
          <Link
            href="/catalogo"
            className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Ir al catálogo
          </Link>
        </div>
      ) : (
        <>
          <ul className="p-4 space-y-2">
            {items.map((item, i) => (
              <li key={i} className="border-b pb-2">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-primary font-bold">${item.price}</span>
                  <button
                     onClick={() => removeItem(item)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="absolute bottom-0 w-full p-4 border-t bg-white">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Total:</span>
              <span className="text-primary font-bold">${total}</span>
            </div>
            <Link href="/venta">
              <button className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90">
                Ir a pagar
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
