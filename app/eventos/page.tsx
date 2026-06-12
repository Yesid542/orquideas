"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  ArrowRight, 
  Heart, 
  Sparkles, 
  Church, 
  PartyPopper, 
  Building2, 
  Cake,
  CheckCircle,
  Phone,
  Mail,
  MapPin
} from "lucide-react"

type Eventos = {
  id: number
  title: string
  description: string
  image: string
  features?: string[]
  icon?: React.ComponentType<any>
 
} 

const eventTypes = [
  {
    id: "Bodas",
    icon: Heart,
    title: "Bodas",

  },
  {
    id: "quinceaneras",
    icon: Sparkles,
    title: "Quinceañeras",
  },
  {
    id: "bautizos",
    icon: Church,
    title: "Bautizos y Comuniones",
  },
  {
    id: "cumpleanos",
    icon: Cake,
    title: "Cumpleaños",
  },
  {
    id: "corporativos",
    icon: Building2,
    title: "Eventos Corporativos",
  },
  {
    id: "Grados",
    icon: PartyPopper,
    title: "Grados",
  },
]

const gallery = [
  { id: 1, category: "Boda", image: "💐", description: "Arco floral romántico" },
  { id: 2, category: "Quinceañera", image: "🌸", description: "Mesa principal rosa" },
  { id: 3, category: "Corporativo", image: "🌿", description: "Recepción moderna" },
  { id: 4, category: "Boda", image: "🌹", description: "Centro de mesa elegante" },
  { id: 5, category: "Cumpleaños", image: "🎈", description: "Decoración festiva" },
  { id: 6, category: "Bautizo", image: "🕊️", description: "Altar decorado" },
]

const process = [
  {
    step: 1,
    title: "Consulta Inicial",
    description: "Conversamos sobre tu visión, presupuesto y fecha del evento",
  },
  {
    step: 2,
    title: "Propuesta Personalizada",
    description: "Creamos un diseño único basado en tus preferencias",
  },
  {
    step: 3,
    title: "Muestra y Ajustes",
    description: "Te mostramos muestras físicas y hacemos los ajustes necesarios",
  },
  {
    step: 4,
    title: "Día del Evento",
    description: "Instalamos y coordinamos toda la decoración floral",
  },
]




export default function EventosPage() {

  const [evento, setEventos] = useState<Eventos[]>([])
  
    const fetchEvents = async () => {
      const res = await fetch("/api/media/eventos")
      
  
  // Convertir la respuesta en JSON
      const media = await res.json()
      console.log("Media recibida del backend:", media)
  
  // Ahora `media` contiene el array de imágenes
      return media
    }
  
    useEffect(() => {
      const loadEvents = async () => {
        const data = await fetchEvents()
  
        // 👇 aquí asignamos solo la URL al campo image
        const eventosConImagen = data.map((item: any) => ({
          id: item.id,
          title: item.eventos?.nombre,
          description: item.eventos?.descripcion,
          image: item.url,
          features: item.eventos?.paquetes.map((paq: any) => paq.componentes_eventos?.nombre) || [],
          category: item.eventos?.categoria || "sin-categoria",
          icon: eventTypes.find((event) => event.title === item.eventos?.nombre)?.icon,
          
  }))
  
        setEventos(eventosConImagen)
      }
  
      loadEvents()
    }, [])



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary/30 min-h-screen pt-10 lg:pt-24 flex items-center">
    {/* Fondo decorativo */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

    {/* Contenido */}
    <div className="container relative mx-auto px-4 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="outline" className="mb-6 border-primary/30 text-primary">
          <Sparkles className="mr-1 h-3 w-3" />
          Decoración de Eventos
        </Badge>
        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Hacemos tus sueños <span className="text-primary">florecer</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
          Transformamos tus eventos más importantes con decoraciones florales 
          únicas y memorables. Desde bodas íntimas hasta grandes celebraciones.
        </p>
        <a href="https://api.whatsapp.com/send/?phone=573228337635&text&type=phone_number&app_absent=0">
          <Button size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
            Solicitar Cotización
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </div>
    </div>
  </section>

      {/* Event Types */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Tipos de Eventos
            </h2>
            <p className="mt-4 text-muted-foreground">
              Especializados en decoración floral para todo tipo de celebraciones
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {evento.map((event) => (
              <Card
                key={event.id}
                className="group overflow-hidden border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg"
              >
                <div className="flex h-40 items-center justify-center bg-secondary/30 transition-transform group-hover:scale-110">
                  <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                </div>

                <CardContent className="p-6">
                  <div className="mb-3 flex items-center gap-2">
                    {event.icon && <event.icon className="h-5 w-5 text-primary" />}
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {event.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                     {event.features?.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                                        </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-border bg-secondary/30 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Nuestro Proceso
            </h2>
            <p className="mt-4 text-muted-foreground">
              Trabajamos contigo en cada paso para crear la decoración perfecta
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <div key={step.step} className="relative text-center">
                {index < process.length - 1 && (
                  <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border lg:block" />
                )}
                <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {step.step}
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Nuestra Galería
            </h2>
            <p className="mt-4 text-muted-foreground">
              Algunos de nuestros trabajos más recientes
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl bg-secondary/30"
              >
                <div className="flex h-64 items-center justify-center text-8xl transition-transform group-hover:scale-110">
                  {item.image}
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <div>
                    <Badge className="mb-2 bg-primary text-primary-foreground">
                      {item.category}
                    </Badge>
                    <p className="text-sm font-medium text-primary-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="border-t border-border bg-secondary/30 py-16 lg:py-24" id="contacto">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <div>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Solicita tu Cotización
              </h2>
              <p className="mt-4 text-muted-foreground">
                Cuéntanos sobre tu evento y te contactaremos con una propuesta personalizada
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Fecha del evento</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) =>
                        setFormData({ ...formData, eventDate: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventType">Tipo de evento</Label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, eventType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo de evento" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((event) => (
                        <SelectItem key={event.id} value={event.id}>
                          {event.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Cuéntanos sobre tu evento</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Describe tu evento, el lugar, cantidad de invitados, estilo que buscas..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
                >
                  Enviar Solicitud
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-center">
              <Card className="border-border bg-card">
                <CardContent className="p-8">
                  <h3 className="font-serif text-2xl font-semibold text-foreground">
                    Información de Contacto
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    También puedes contactarnos directamente
                  </p>

                  <div className="mt-8 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Teléfonos</p>
                        <p className="font-medium text-foreground">311 262 23 99 - 322 833 76 35 - </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Correo</p>
                        <p className="font-medium text-foreground">eventos@orquideas.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Dirección</p>
                        <p className="font-medium text-foreground">
                          Calle 3 # 7-2, calle 4 # 7-18, Miraflores, Boyacá
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 rounded-xl bg-primary/5 p-6">
                    <p className="text-sm font-medium text-foreground">
                      Horario de Atención
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Lunes a Viernes: 8:30 AM - 7:00 PM
                      <br />
                      Sábados: 9:00 AM - 5:00 PM
                      <br />
                      Domingos: 8:30 AM - 7:00 PM
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
