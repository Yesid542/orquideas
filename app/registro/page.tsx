"use client";
import React, { useEffect, useState} from 'react';
export default function RegisterPage() {
  const [departamentos, setDepartamentos] = useState<any[]>([]);
  const [municipios, setMunicipios] = useState<any[]>([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    phone: formData.get("phone"),
    terms: formData.get("terms") !== null, // true/false
  };

  useEffect(() => {
    const fetchDepartamentos = async () => {
      const response = await fetch("/api/ubicacion/departamentos");
      const datos = await response.json(); 
      console.log (datos)
      setDepartamentos(datos || []);

    };
    fetchDepartamentos();
  }, []);
  useEffect(() => {
    const fetchMunicipios = async () => {
      if (!departamentoSeleccionado) return;
      const respuesta = await fetch(`/api/ubicacion/municipios/${departamentoSeleccionado}`);
      const datos = await respuesta.json();
      setMunicipios(datos || []);
    };
    fetchMunicipios();
  }, [departamentoSeleccionado]);

  // Enviar al backend
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // 
  });

  const result = await response.json();
  if (!response.ok) {
    console.error("Error en la respuesta del servidor:", result);
    alert(`Error: ${result.error}`);
    return;
  }else{
    alert("Registro exitoso! Por favor, verifica tu correo electrónico para activar tu cuenta.");
  }
};

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden my-10 md:my-16">
        
        {/* Columna izquierda: Imagen */}
        <div className="md:w-1/2 w-full bg-green-100 flex items-center justify-center">
          <img
            src="/Floristeria.jpeg"
            alt="Registro Floristería"
            className="object-cover h-64 md:h-full w-full"
          />
        </div>

        {/* Columna derecha: Formulario */}
        <div className="md:w-1/2 w-full p-6 md:p-10">
          <h1 className="text-2xl font-bold text-fuchsia-700 mb-6 font-serif text-center md:text-left">
            Crear cuenta 🌸
          </h1>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
              <input
                type="text"
                placeholder="Tu nombre"
                name="name"
                className="mt-1 w-full border-b-2 border-fuchsia-300 focus:border-fuchsia-600 focus:outline-none bg-transparent py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input
                type="tel"
                placeholder="3001234567"
                name="phone"
                className="mt-1 w-full border-b-2 border-fuchsia-300 focus:border-fuchsia-600 focus:outline-none bg-transparent py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                type="email"
                placeholder="tuemail@ejemplo.com"
                name="email"
                className="mt-1 w-full border-b-2 border-fuchsia-300 focus:border-fuchsia-600 focus:outline-none bg-transparent py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                name="password"
                className="mt-1 w-full border-b-2 border-fuchsia-300 focus:border-fuchsia-600 focus:outline-none bg-transparent py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                name="confirmPassword"
                className="mt-1 w-full border-b-2 border-fuchsia-300 focus:border-fuchsia-600 focus:outline-none bg-transparent py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Departamento</label>
              <select
                value={departamentoSeleccionado}
                onChange={(e) => setDepartamentoSeleccionado(e.target.value)}
              >
                <option value="">-- Selecciona --</option>
                {departamentos.map((dep) => (
                  <option key={dep.codigo} value={dep.codigo}>
                    {dep.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ciudad</label>
              <select>
                <option value="">-- Selecciona --</option>
                {municipios.map((mun) => (
                  <option key={mun.codigo} value={mun.codigo}>
                    {mun.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Direccion</label>
              <input
                type="text"
                placeholder="Tu nombre"
                name="name"
                className="mt-1 w-full border-b-2 border-fuchsia-300 focus:border-fuchsia-600 focus:outline-none bg-transparent py-2"
              />
            </div>
            
            <div className="md:col-span-2 flex items-center">
              <input type="checkbox" name="terms" className="h-4 w-4 text-fuchsia-600 border-gray-300 rounded" />
              <span className="ml-2 text-sm text-gray-600">
                Acepto los términos y condiciones
              </span>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-120 transition-colors"
              >
                Registrarme
              </button>
            </div>
          </form>

          {/* Registro social */}
          <div className="mt-6">
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
              <span className="text-gray-700">Registrarme con Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
