"use client";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const { items } = useCart();

  const total = items.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-2xl font-bold mb-6">Confirmación de Compra</h1>

      {/* Resumen del pedido */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Resumen del pedido</h2>
        <ul className="divide-y divide-border">
          {items.map((item, idx) => (
            <li key={idx} className="flex justify-between py-2">
              <span>{item.name} x{item.quantity || 1}</span>
              <span>${item.price * (item.quantity || 1)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xl font-bold">Total: ${total}</p>
      </section>

      {/* Dirección */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Dirección de entrega</h2>
        <p className="text-muted-foreground">Calle 123 #45-67, Tunja, Boyacá</p>
        <Button variant="outline" size="sm" className="mt-2">Editar dirección</Button>
      </section>

      {/* Método de pago */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Método de pago</h2>
        <div className="flex flex-col gap-2">
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
      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
        Confirmar compra
      </Button>
    </div>
  );
}
