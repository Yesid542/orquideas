"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingBag, User, Heart } from "lucide-react"
import { Cookie } from "next/font/google"

const cookie = Cookie({
  subsets: ["latin"],
  weight: "400",
})

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Catálogo", href: "/catalogo" },
  { name: "Eventos", href: "/eventos" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOverHero, setIsOverHero] = useState(true)

  useEffect(() => {
    const hero = document.querySelector("#hero")
    if (!hero) {
      setIsOverHero(false)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsOverHero(entry.isIntersecting)
        })
      },
      { root: null, threshold: 0.15 }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300
        ${isOverHero ? "bg-transparent border-transparent" : "bg-white/90 border-b border-border shadow-sm"}`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <h1 className={`${cookie.className} text-5xl ${isOverHero ? "text-white" : "text-fuchsia-400"}`}>
            Orquideas
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden ml-20 md:flex md:items-center md:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                isOverHero ? "text-white hover:text-fuchsia-400" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="icon" className={`${isOverHero ? "text-white hover:text-fuchsia-400" : "text-muted-foreground hover:text-primary"}`}>
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className={`${isOverHero ? "text-white hover:text-fuchsia-400" : "text-muted-foreground hover:text-primary"}`}>
            <ShoppingBag className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className={`${isOverHero ? "text-white hover:text-fuchsia-400" : "text-muted-foreground hover:text-primary"}`}>
            <User className="h-5 w-5" />
          </Button>
          <Button className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90">
            Iniciar Sesión
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" className={isOverHero ? "text-white hover:text-fuchsia-400" : "text-muted-foreground hover:text-primary"}>
            <ShoppingBag className="h-5 w-5" />
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isOverHero ? "text-white hover:text-fuchsia-400" : "text-muted-foreground hover:text-primary"}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background">
              <nav className="mt-8 flex flex-col ml-4 gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Separador */}
                <hr className="my-4 border-border" />

                {/* Favoritos */}
                <Link
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                >
                  <Heart className="h-5 w-5" />
                  Favoritos
                </Link>

                {/* Mi cuenta */}
                <Link
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                >
                  <User className="h-5 w-5" />
                  Mi cuenta
                </Link>

                {/* Botón Iniciar Sesión separado */}
                <Button className="mt-6 ml-8' w-50 bg-primary text-primary-foreground hover:bg-primary/90">
                  Iniciar Sesión
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
