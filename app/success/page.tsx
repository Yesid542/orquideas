"use client";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-green-600">✅ Pago aprobado</h1>
      <p className="mt-4">Gracias por tu compra. Tu pedido ha sido confirmado.</p>
      <a href="/" className="mt-6 text-blue-500 underline">Volver al inicio</a>
    </div>
  );
}
