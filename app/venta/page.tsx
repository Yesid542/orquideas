"use client";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, MapPin, CreditCard } from "lucide-react";

export default function CheckoutPage() {
  const { items } = useCart();
  const total = items.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background mt-20 to-secondary/10 p-8">
      <h1 className="text-3xl font-serif font-bold mb-8 text-center text-primary">
        Confirmación de Compra
      </h1>

      {/* Resumen del pedido */}
      <section className="mb-6 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="text-primary h-5 w-5" />
          <h2 className="text-xl font-semibold">Resumen del pedido</h2>
        </div>
        <ul className="divide-y divide-border">
          {items.map((item, idx) => (
            <li key={idx} className="flex justify-between py-2">
              <span className="font-medium">{item.name} x{item.quantity || 1}</span>
              <span className="text-primary font-bold">${item.price * (item.quantity || 1)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xl font-bold text-right text-primary">Total: ${total}</p>
      </section>

      {/* Dirección */}
      <section className="mb-6 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="text-primary h-5 w-5" />
          <h2 className="text-xl font-semibold">Dirección de entrega</h2>
        </div>
        <p className="text-muted-foreground">Calle 123 #45-67, Tunja, Boyacá</p>
        <Button variant="outline" size="sm" className="mt-3">Editar dirección</Button>
      </section>

      {/* Método de pago */}
      <section className="mb-6 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="text-primary h-5 w-5" />
          <h2 className="text-xl font-semibold">Método de pago</h2>
        </div>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" defaultChecked />
            Tarjeta de crédito / débito
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" />
            Transferencia bancaria
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" />
            Pago contra entrega
          </label>
        </div>
      </section>

      {/* Confirmar */}
      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg text-lg py-3">
        Confirmar compra
      </Button>
    </div>
  );
}
