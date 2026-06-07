"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Gift, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

const flowerTypes = [
  { id: "rosas", name: "Rosas", price: 25, emoji: "🌹" },
  { id: "tulipanes", name: "Tulipanes", price: 20, emoji: "🌷" },
  { id: "girasoles", name: "Girasoles", price: 18, emoji: "🌻" },
  { id: "lirios", name: "Lirios", price: 22, emoji: "💐" },
  { id: "orquideas", name: "Orquídeas", price: 35, emoji: "🌸" },
  { id: "peonias", name: "Peonías", price: 30, emoji: "🌺" },
]

const colorOptions = [
  { id: "rosa", name: "Rosa", color: "bg-pink-300", border: "border-pink-400" },
  { id: "rojo", name: "Rojo", color: "bg-red-400", border: "border-red-500" },
  { id: "blanco", name: "Blanco", color: "bg-white", border: "border-gray-300" },
  { id: "amarillo", name: "Amarillo", color: "bg-yellow-300", border: "border-yellow-400" },
  { id: "morado", name: "Morado", color: "bg-purple-300", border: "border-purple-400" },
  { id: "mixto", name: "Mixto", color: "bg-gradient-to-r from-pink-300 via-yellow-200 to-purple-300", border: "border-pink-400" },
]

const extras = [
  { id: "chocolates", name: "Chocolates", price: 15, icon: "🍫", description: "Caja de chocolates premium" },
  { id: "osito", name: "Osito de Peluche", price: 20, icon: "🧸", description: "Peluche suave y tierno" },
  { id: "globos", name: "Globos", price: 10, icon: "🎈", description: "Globos metálicos decorativos" },
  { id: "tarjeta", name: "Tarjeta Especial", price: 5, icon: "💌", description: "Mensaje personalizado" },
]

export default function BouquetBuilder() {
  const [selectedFlower, setSelectedFlower] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [quantity, setQuantity] = useState(12)

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    )
  }

  const calculateTotal = () => {
    const flowerPrice = flowerTypes.find((f) => f.id === selectedFlower)?.price || 0
    const extrasPrice = selectedExtras.reduce((acc, extraId) => {
      const extra = extras.find((e) => e.id === extraId)
      return acc + (extra?.price || 0)
    }, 0)
    return flowerPrice * quantity + extrasPrice
  }

  const isComplete = selectedFlower && selectedColor

  return (
    <section className="bg-secondary/30 py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            <Sparkles className="mr-1 h-3 w-3" />
            Crea tu ramo perfecto
          </Badge>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Diseña tu Ramo Personalizado
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Elige las flores, colores y adicionales para crear un arreglo único y especial
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* Builder Steps */}
          <div className="space-y-8 lg:col-span-2">
            {/* Step 1: Flower Type */}
            <Card className="overflow-hidden border-border bg-card">
              <div className="border-b border-border bg-secondary/50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    1
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    Tipo de Flores
                  </h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {flowerTypes.map((flower) => (
                    <button
                      key={flower.id}
                      onClick={() => setSelectedFlower(flower.id)}
                      className={cn(
                        "relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all hover:border-primary/50 hover:bg-secondary/50",
                        selectedFlower === flower.id
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card"
                      )}
                    >
                      {selectedFlower === flower.id && (
                        <div className="absolute right-2 top-2">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <span className="text-3xl">{flower.emoji}</span>
                      <span className="text-sm font-medium text-foreground">{flower.name}</span>
                      <span className="text-xs text-muted-foreground">${flower.price}/flor</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Color */}
            <Card className="overflow-hidden border-border bg-card">
              <div className="border-b border-border bg-secondary/50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    2
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    Color
                  </h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-4">
                  {colorOptions.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={cn(
                        "group flex flex-col items-center gap-2"
                      )}
                    >
                      <div
                        className={cn(
                          "h-12 w-12 rounded-full border-2 transition-all",
                          color.color,
                          selectedColor === color.id
                            ? "ring-2 ring-primary ring-offset-2"
                            : color.border
                        )}
                      />
                      <span className={cn(
                        "text-xs font-medium",
                        selectedColor === color.id ? "text-primary" : "text-muted-foreground"
                      )}>
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Quantity */}
            <Card className="overflow-hidden border-border bg-card">
              <div className="border-b border-border bg-secondary/50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    3
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    Cantidad de Flores
                  </h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {[6, 12, 24, 36].map((num) => (
                    <button
                      key={num}
                      onClick={() => setQuantity(num)}
                      className={cn(
                        "rounded-xl border-2 px-6 py-3 text-sm font-medium transition-all",
                        quantity === num
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary/50"
                      )}
                    >
                      {num} flores
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 4: Extras */}
            <Card className="overflow-hidden border-border bg-card">
              <div className="border-b border-border bg-secondary/50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    4
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    Adicionales <span className="text-muted-foreground font-normal">(Opcional)</span>
                  </h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  {extras.map((extra) => (
                    <button
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={cn(
                        "flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all",
                        selectedExtras.includes(extra.id)
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/50"
                      )}
                    >
                      <span className="text-2xl">{extra.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{extra.name}</p>
                        <p className="text-xs text-muted-foreground">{extra.description}</p>
                      </div>
                      <span className="text-sm font-semibold text-primary">+${extra.price}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Card */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="overflow-hidden border-primary/20 bg-card shadow-lg">
              <div className="bg-primary px-6 py-4">
                <h3 className="font-serif text-lg font-semibold text-primary-foreground">
                  Tu Ramo
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="text-sm text-muted-foreground">Flores:</span>
                    <span className="font-medium text-foreground">
                      {selectedFlower
                        ? `${flowerTypes.find((f) => f.id === selectedFlower)?.name} (${quantity})`
                        : "Sin seleccionar"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="text-sm text-muted-foreground">Color:</span>
                    <span className="font-medium text-foreground">
                      {selectedColor
                        ? colorOptions.find((c) => c.id === selectedColor)?.name
                        : "Sin seleccionar"}
                    </span>
                  </div>
                  {selectedExtras.length > 0 && (
                    <div className="border-b border-border pb-4">
                      <span className="text-sm text-muted-foreground">Adicionales:</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedExtras.map((extraId) => {
                          const extra = extras.find((e) => e.id === extraId)
                          return (
                            <Badge key={extraId} variant="secondary">
                              {extra?.icon} {extra?.name}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-semibold text-foreground">Total:</span>
                    <span className="font-serif text-2xl font-bold text-primary">
                      ${calculateTotal()}
                    </span>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={!isComplete}
                  >
                    <Gift className="mr-2 h-4 w-4" />
                    Agregar al Carrito
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primary/30 text-primary hover:bg-primary/5"
                    disabled={!isComplete}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Guardar en Favoritos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
