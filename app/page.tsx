"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles, Truck, Shield, Clock } from "lucide-react"
import BouquetBuilder from "@/components/bouquet-builder"
import MapInteractive from "@/components/map-interactive"
import CampaniaModal from "@/components/campaniaModal";

type Popular = {
  id: number
  name: string
  description: string
  price: number
  image: string 
} 

const features = [
  {
    icon: Truck,
    title: "Envío Express",
    description: "Entrega el mismo día en tu ciudad",
  },
  {
    icon: Shield,
    title: "Flores Frescas",
    description: "Garantía de frescura por 7 días",
  },
  {
    icon: Clock,
    title: "Atención 24/7",
    description: "Siempre disponibles para ti",
  },
]

const popularBouquets = [
  {
    id: 1,
    name: "Romance Eterno",
    description: "24 rosas rojas con baby breath",
    price: 89,
    image: "🌹",
  },
  {
    id: 2,
    name: "Primavera Radiante",
    description: "Tulipanes mixtos con follaje",
    price: 65,
    image: "🌷",
  },
  {
    id: 3,
    name: "Sol de Verano",
    description: "Girasoles con margaritas",
    price: 55,
    image: "🌻",
  },
  {
    id: 4,
    name: "Elegancia Pura",
    description: "Lirios blancos con eucalipto",
    price: 78,
    image: "💐",
  },
]
export default function HomePage() {
const [elegidos, setElegidos] = useState<Popular[]>([])

  const fetchElegidos = async () => {
    const res = await fetch("/api/media/catalogo")

// Convertir la respuesta en JSON
    const media = await res.json()
    const randomFive = media.sort(() => 0.5 - Math.random()).slice(0, 5);

    console.log("Media recibida del backend:", media)

// Ahora `media` contiene el array de imágenes
  return randomFive
  }
  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchElegidos()

      // 👇 aquí asignamos solo la URL al campo image
      const elegidosConImagen = data.map((item: any) => ({
        id: item.id,
        image: item.url,
        name: item.productos?.nombre,
        description: item.productos?.descripcion,
        price: item.productos?.precioBase,
}))

      setElegidos(elegidosConImagen)
    }

    loadProducts()
  }, [])


  return (
    
    <div className="flex flex-col">
      <CampaniaModal />
      {/* Hero Section */}
     <section id="hero" className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
          backgroundImage: "url('/16340.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
  {/* Overlay para legibilidad */}
  <div className="absolute inset-0 bg-black/35 z-0 pointer-events-none" />
  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent z-0 pointer-events-none" />

  <div className="relative z-10 container mx-auto px-4 text-center">
    <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white drop-shadow-md">
      Cada flor cuenta una historia de <span className="text-primary">amor</span>
    </h1>
    <p className="mt-4 text-white/90 max-w-2xl mx-auto">
      Encuentra el ramo perfecto para cualquier ocasión.
    </p>
    <div className="mt-8 flex items-center justify-center gap-4">
      <a className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-white shadow" href="/catalogo">
        Ver Catalogo
      </a>
      <a className="inline-flex items-center rounded-md border border-white/30 px-6 py-3 text-white/90" href="#mapinteractive">
        Visitanos
      </a>
    </div>
  </div>
</section>





      {/* Features */}
      <section className="border-y border-border bg-card py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title}  className="flex ml-18 items-center text-center md:flex-row md:items-start gap-4">
                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bouquet Builder */}
      {/* <BouquetBuilder /> */}

      {/* Popular Bouquets */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground text-center sm:text-left sm:text-4xl">
                Ramos Populares
              </h2>
              <p className="mt-2 text-muted-foreground">
                Los favoritos de nuestros clientes
              </p>
            </div>
            <Button variant="outline" className="border-primary/30 text-foreground hover:bg-secondary" asChild>
              <Link href="/catalogo">
                Ver todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {elegidos.map((bouquet) => (
              <Card
                key={bouquet.id}
                className="group overflow-hidden border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg"
              >
                  <div className="flex h-48 items-center justify-center bg-secondary/30 transition-transform group-hover:scale-110">
                    <img src={bouquet.image} className="h-full w-full object-cover" />
                  </div>
                <CardContent className="p-4">
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {bouquet.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {bouquet.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-serif text-xl font-bold text-primary">
                      ${bouquet.price}
                    </span>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Agregar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <MapInteractive />

      {/* CTA Section */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            ¿Tienes un evento especial?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Decoramos bodas, quinceañeras, bautizos y todo tipo de celebraciones. 
            Contáctanos para crear la decoración perfecta.
          </p>
          <Button
            size="lg"
            className="mt-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            asChild
          >
            <Link href="/eventos">
              Conoce Nuestros Servicios
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
