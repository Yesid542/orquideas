"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type Imagen = {
  id: string;
  url: string;
  nombre: string;
  isContent: boolean;
  eventos?: {
    idEventos: string;
    nombre: string;
    descripcion: string;
  };
};

function MosaicoContent() {
  const [imagenesMosaico, setImagenesMosaico] = useState<Imagen[]>([]);
  const searchParams = useSearchParams();
  const albumNombre = searchParams.get("album");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/media/mosaico");
        const data: Imagen[] = await res.json();
        setImagenesMosaico(data);
      } catch (err) {
        console.error("Error cargando imágenes:", err);
      }
    };
    fetchData();
  }, []);

  const imagenesFiltradas = imagenesMosaico.filter(
    (img) => img.isContent && img.eventos?.nombre === albumNombre
  );

  return (
    <main className="min-h-screen bg-pink-50">
      <h1 className="text-3xl font-bold text-center text-fuchsia-700 mb-8">
        Álbum: {albumNombre}
      </h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {imagenesFiltradas.map((img) => (
          <div
            key={img.id}
            className="relative group overflow-hidden rounded-lg shadow-md"
          >
            <img
              src={img.url}
              alt={img.nombre}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
              <p className="text-white text-sm font-medium">{img.nombre}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default function MosaicoPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Cargando...</div>}>
      <MosaicoContent />
    </Suspense>
  );
}