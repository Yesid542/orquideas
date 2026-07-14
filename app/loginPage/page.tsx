"use client"

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
  
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
  
    console.log("Datos del formulario:", data);
  
    // Enviar al backend
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // 👈 
    });
  
    const result = await response.json();
    if (!response.ok) {
      console.error("Error en la respuesta del servidor:", result);
      alert(`Error: ${result.error}`);
      return;``
    }

    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-green-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        {/* Logo o título */}
        <h1 className="text-2xl font-bold text-fuchsia-700 mb-6 text-center font-serif">
          Floristería Virtual 🌸
        </h1>

        {/* Formulario */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              placeholder="tuemail@ejemplo.com"
              className="mt-1 w-full border-b-2 border-fuchsia-300 focus:border-fuchsia-600 focus:outline-none bg-transparent py-2"
              name="email"  
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="mt-1 w-full border-b-2 border-fuchsia-300 focus:border-fuchsia-600 focus:outline-none bg-transparent py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-fuchsia-700 transition-colors"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Extras */}
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <a href="#" className="hover:text-fuchsia-600">¿Olvidaste tu contraseña?</a>
          <a href="/registro" className="hover:text-fuchsia-600">Crear cuenta</a>
        </div>

        {/* Login social */}
        <div className="mt-6">
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            <span className="text-gray-700">Iniciar con Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
