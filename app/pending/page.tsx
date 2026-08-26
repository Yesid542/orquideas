"use client";

export default function PendingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-yellow-600">⏳ Pago pendiente</h1>
      <p className="mt-4">Tu pago está en proceso. Te notificaremos cuando se confirme.</p>
      <a href="/" className="mt-6 text-blue-500 underline">Volver al inicio</a>
    </div>
  );
}
