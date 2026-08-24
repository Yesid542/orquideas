"use client";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, MapPin, CreditCard } from "lucide-react";
import { useState,useEffect } from "react";

export default function CheckoutPage() {
  const { items } = useCart();
  const total = items.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  // 🔹 Estados para dirección
  const [showModal, setShowModal] = useState(false);
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [barrio, setBarrio] = useState("");
  const [direccionCompleta, setDireccionCompleta] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
  const datosUsuario = async () => {
    const response = await fetch("/api/users/clientes");
    const datos = await response.json(); 
    console.log("Datos del usuario:", datos); // 🔹 Verifica los datos recibidos

    // ✅ Guarda solo la dirección, no el objeto completo
    const direccionCompleta = `${datos.usuario?.direccion || ""}, ${datos.usuario?.municipio || ""}, ${datos.usuario?.departamento || ""}`;
    setDireccionCompleta(direccionCompleta);
    const email = `${datos.usuario?.email || ""}`;
    setEmail(email);
    
  };
  datosUsuario();
}, []);

  const handleSaveAddress = async () => {
    const nuevaDireccion = `${calle} ${numero}, ${barrio}`;
    setDireccionCompleta(nuevaDireccion);
    setShowModal(false);

    // 👉 Aquí guardas en tu BD
    await fetch("/api/save-address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direccion: nuevaDireccion }),
    });

  };
     const handleCheckout = async () => {
  // 🔹 Calcular el total dinámicamente
  const total = items.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  // 🔹 Crear la transacción en tu backend
  const response = await fetch("/api/pago", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    amount_in_cents: total * 100, // en centavos
    currency: "COP",
    customer_email: email,
    reference: `pedido-${Date.now()}`,
    redirect_url: "https://orquideas-teal.vercel.app/catalogo", // URL a la que redirigir después del pago
  }),
});

const data = await response.json();
if (data.checkout_url) {
  window.location.href = data.checkout_url;
} else {
  console.error("Error creando transacción:", data);
}
}
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
        <p className="text-muted-foreground">{direccionCompleta}</p>
        <Button variant="outline" size="sm" className="mt-3" onClick={() => setShowModal(true)}>
          Editar dirección
        </Button>
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
      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg text-lg py-3" onClick={handleCheckout}>
        Confirmar compra
      </Button>

      {/* 🔹 Modal de dirección */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Ingresar dirección</h2>

            <input
              type="text"
              placeholder="Calle"
              value={calle}
              onChange={(e) => setCalle(e.target.value)}
              className="w-full border rounded p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Número"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              className="w-full border rounded p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Barrio"
              value={barrio}
              onChange={(e) => setBarrio(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveAddress}>Guardar dirección</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
