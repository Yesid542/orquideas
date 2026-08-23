"use client"

import { Button } from "@/components/ui/button";
import Link from "next/dist/client/link";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CatalogoDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [producto, setProducto] = useState<any[]>([]);
  const [cantidades, setCantidades] = useState<Record<string, number[]>>({}); // 👈 estado global
  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/productos/${id}`);
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        const data = await response.json();

        // Inicializar cantidades por producto
        const inicial: Record<string, number[]> = {};
        data.forEach((prod: any) => {
          inicial[prod.idProductos] = prod.componentes_producto?.map((c: any) => c.cantidadBase) || [];
        });

        setProducto(data);
        setCantidades(inicial);
      } catch (error) {
        console.log("Error fetching product data:", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  return (
    <div className="container mx-auto p-6 mt-20">
      {producto.map((product) => {
        const cantidadesProducto = cantidades[product.idProductos] || [];

        // 🔹 Calcular precio dinámico
        const precioTotal =
          product.precioBase +
          product.componentes_producto?.reduce((acc: number, comp: any, idx: number) => {
            const cantidadActual = cantidadesProducto[idx];
            const diferencia = cantidadActual - comp.cantidadBase;
            return acc + diferencia * (comp.flores?.precioUnitario || 0);
          }, 0);

        return (
          <div key={product.idProductos} className="flex flex-col lg:flex-row gap-6 bg-white shadow-lg rounded-lg p-6">
            {/* Columna izquierda: miniaturas */}
<div className="w-full lg:w-1/5 h-[70vh] border-1 border-gray-300 hover:border-fuchsia-500 rounded-lg p-2 flex flex-col gap-2 overflow-y-auto">
  {product.media?.map((m: any, idx: number) => (
    <div key={idx} className="h-24 w-full bg-gray-100 rounded-lg flex items-center justify-center">
      <img
        src={m.url}
        alt={`${product.nombre} miniatura ${idx + 1}`}
        className="max-h-full max-w-full object-contain rounded-lg"
      />
    </div>
  ))}
</div>

{/* Imagen principal */}
<div className="w-full lg:w-3/5 h-[70vh] border-1 border-gray-300 hover:border-fuchsia-500 rounded-lg flex items-center justify-center bg-gray-100">
  <img
    src={product.media?.[0]?.url} // 👈 aquí recuperamos la primera imagen como principal
    alt={product.nombre}
    className="max-h-full max-w-full object-contain rounded-lg"
  />
</div>

            {/* Columna derecha */}
            <div className="w-full lg:w-2/5 border-1 border-gray-300 rounded-lg p-6 relative flex flex-col gap-4">
              <h1 className="text-2xl font-bold text-gray-800 mt-6">{product.nombre}</h1>
              <p className="text-gray-600">{product.descripcion}</p>

              {/* 🔹 Controles dinámicos */}
              {product.componentes_producto?.map((comp: any, idx: number) => {
                const cantidad = cantidadesProducto[idx];

                const aumentar = () => {
                  if (cantidad < comp.cantidadMax) {
                    setCantidades((prev) => ({
                      ...prev,
                      [product.idProductos]: prev[product.idProductos].map((c, i) =>
                        i === idx ? c + 1 : c
                      ),
                    }));
                  }
                };

                const disminuir = () => {
                  if (cantidad > comp.cantidadMin) {
                    setCantidades((prev) => ({
                      ...prev,
                      [product.idProductos]: prev[product.idProductos].map((c, i) =>
                        i === idx ? c - 1 : c
                      ),
                    }));
                  }
                };

                return (
                  <div key={idx} className="flex items-center gap-3 mt-2">
                    <span className="font-medium">
                      {comp.flores?.nombre} (Precio unitario: ${comp.flores?.precioUnitario})
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={disminuir}
                        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                        disabled={cantidad <= comp.cantidadMin}
                      >
                        -
                      </button>
                      <span className="w-10 text-center">{cantidad}</span>
                      <button
                        onClick={aumentar}
                        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                        disabled={cantidad >= comp.cantidadMax}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* 🔹 Precio dinámico */}
              <p className="text-xl font-semibold text-fuchsia-600">
                $ {new Intl.NumberFormat("es-CO").format(precioTotal)} COP
              </p>

              {/* Botones de compra */}
              <div className="flex flex-col gap-3 mt-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => {
                    addItem({
                      name: product.nombre,
                      price: precioTotal,
                      description: product.descripcion,
                      quantity: 1,
                    });
                    router.push("/venta");
                  }}
                >
                  Comprar Ahora
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() =>
                    addItem({
                      name: product.nombre,
                      price: precioTotal,
                      description: product.descripcion,
                      quantity: 1,
                    })
                  }
                >
                  Agregar al carrito
                </Button>
                <Link href="/catalogo" className="w-full w-40">
                  <Button variant="outline" size="lg">
                    Volver
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
