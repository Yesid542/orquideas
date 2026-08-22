"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Heart, ShoppingBag, Sparkles} from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import Link from "next/link"
import { useCart } from "@/context/CartContext";



const categories = [
  { id: "todos", name: "Todos" },
  { id: "Boucket", name: "Boucket" },
  { id: "Orquidea", name: "Orquidea" },
]

type Producto = {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  image: string // 👈 solo la URL en texto
  isNew: boolean
  isSale: boolean
} 



export default function CatalogoPage() {
  
  const [elementos, setElementos] = useState<Producto[]>([])
  const { items, addItem } = useCart();
  

  const fetchProducts = async () => {
    const res = await fetch("/api/media/catalogo")

// Convertir la respuesta en JSON
    const media = await res.json()
    console.log (media)
    

// Ahora `media` contiene el array de imágenes
    return media
  }

  useEffect(() => {
    const loadProducts = async () => {
      
      const data = await fetchProducts()  

      // 👇 aquí asignamos solo la URL al campo image
      const productosConImagen = data.map((item: any) => ({
        id: item.productos?.idProductos,
        image: item.url,
        name: item.productos?.nombre,
        description: item.productos?.descripcion,
        price: item.productos?.precioBase,
        category: item.productos?.categorias?.nombre || "sin-categoria"
}))

      setElementos(productosConImagen)
      console.log (productosConImagen)
    }

    loadProducts()
  }, [])

  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<number[]>([])
  
  


  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    )
  }

  const filteredProducts = elementos.filter((product) => {
  const matchesCategory = selectedCategory === "todos" || product.category === selectedCategory
  const matchesSearch = product.name
    .toLowerCase()
    .includes(searchQuery.toLowerCase())
  return matchesCategory && matchesSearch
  

})

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
       <section className="relative overflow-hidden bg-secondary/30 min-h-screen pt-16 lg:pt-24 flex items-center">
    {/* Fondo decorativo */}
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-6 border-primary/30 text-primary">
          <Sparkles className="mr-1 h-3 w-3" />
          Nuestro Catálogo
        </Badge>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Escoge el que mas te guste <span className="text-primary">y hazlo tuyo</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Descubre nuestra colección de arreglos florales para cada ocasión
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 border-b border-border bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredProducts.length} productos
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </div>

         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const isInCart = items.some((item) => item.name === product.name);
              return (
               <Link
                  key={product.id}
                  href={`/catalogoDetail/${product.id}`}
                  className="block"
                >
                <Card className="group relative overflow-hidden border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg">
                  {/* Badges */}
                  <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-primary text-primary-foreground">
                        Nuevo
                      </Badge>
                    )}
                    {product.isSale && (
                      <Badge variant="destructive">Oferta</Badge>
                    )}
                  </div>
                  
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // evita que el click en el botón dispare el Link
                      toggleFavorite(product.id);
                    }}
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 transition-all hover:bg-background"
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4 transition-colors",
                        favorites.includes(product.id)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      )}
                    />
                  </button>
                    
                  {/* Image */}
                  <div className="flex h-68 items-center justify-center bg-secondary/30 text-7xl transition-transform group-hover:scale-105">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-45 h-65 object-cover rounded-lg"
                    />
                  </div>
                    
                  <CardContent className="p-4">
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-xl font-bold text-primary">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button
              size="sm"
              disabled={isInCart}
              className={`${
                isInCart
                  ? "bg-gray-500 text-white cursor-default"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (!isInCart) {
                  addItem({
                    name: product.name,
                    price: product.price,
                    description: product.description,
                  });
                }
              }}
            >
              <ShoppingBag className="mr-1 h-4 w-4" />
              {isInCart ? "Agregado" : "Agregar"}
            </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              );
          })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">
                No se encontraron productos que coincidan con tu búsqueda.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
  
}
