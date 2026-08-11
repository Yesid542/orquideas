"use client"

import { Button } from "@/components/ui/button";
import Link from "next/dist/client/link";
import React from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function CatalogoDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) // ✅ unwrap del Promise en App Router
  const [producto, setProducto] = useState<any[]>([])
  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/productos/${id}`)
        if (!response.ok) throw new Error("Error en la respuesta del servidor")
        const data = await response.json()
        console.log("Producto data:", data)
        setProducto(data)
      } catch (error) {
        console.log("Error fetching product data:", error)
      }
    }


    if (id) fetchData()
  }, [id])

  console.log("Producto state:", producto)

  return (  
    <div className="container mx-auto p-6 mt-20">

      {producto.map((product) => (

      <div className="flex flex-col lg:flex-row gap-6 bg-white shadow-lg rounded-lg p-6">
        
        {/* Columna izquierda: miniaturas */}
        <div className="w-full lg:w-1/5 h-[70vh] border-1 border-gray-300 hover:border-fuchsia-500 rounded-lg p-2 flex flex-col gap-2 overflow-y-auto">
          <div className="h-24 w-full bg-gray-100 rounded-lg"></div>
          <div className="h-24 w-full bg-gray-100 rounded-lg"></div>
          <div className="h-24 w-full bg-gray-100 rounded-lg"></div>
          <div className="h-24 w-full bg-gray-100 rounded-lg"></div>
        </div>

        {/* Imagen principal */}
        <div  className="w-full lg:w-3/5 h-[70vh] bg-img border-1 border-gray-300 hover:border-fuchsia-500 rounded-lg flex items-center justify-center bg-gray-100">
          <img src={product.media?.[0]?.url} alt={product.nombre} className="max-h-full max-w-full object-contain rounded-lg" />
        </div>

        {/* Columna derecha: info producto */}
        <div className="w-full lg:w-2/5 border-1 border-gray-300 hover:border-fuchsia-500 rounded-lg p-6 relative flex flex-col gap-4">
          {/* Etiquetas y favorito */}
          <div className="absolute left-4 top-4 flex gap-2">
            <span className="bg-fuchsia-500 text-white px-2 py-1 rounded text-xs">Nuevo</span>
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">Oferta</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mt-6">{product.nombre}</h1>
          <p className="text-gray-600">{product.descripcion}</p>
          <p className="text-xl font-semibold text-fuchsia-600"> $ {new Intl.NumberFormat("es-CO").format(product.precioBase)} COP </p>
          <div className="flex flex-col gap-3 mt-4">
            <Button
                variant="default"
                size="lg"
                onClick={() => {
                  addItem({
                    name: product.nombre,
                    price: product.precioBase,
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
                    price: product.precioBase,
                    description: product.descripcion,
                    quantity: 1,
                  })
                }
              >
                Agregar al carrito
              </Button>
            <Link href="/catalogo" className="w-full w-40" >
              <Button variant="outline" size="lg">
                Volver
              </Button>
            </Link>
          </div>
        </div>
      </div>
      ))}
    </div>
 
  )

} 