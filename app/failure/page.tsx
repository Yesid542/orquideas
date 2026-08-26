"use client";

export default function FailurePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-red-600">❌ Pago rechazado</h1>
      <p className="mt-4">El pago no pudo completarse. Intenta nuevamente.</p>
      <a href="/checkout" className="mt-6 text-blue-500 underline">Volver al checkout</a>
    </div>
  );
}
