import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"

const footerLinks = {
  navegacion: [
    { name: "Inicio", href: "/" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Eventos", href: "/eventos" },
  ],
  empresa: [
    { name: "Acerca de", href: "/acerca" },
    { name: "Contacto", href: "/eventos#contacto" },
    { name: "Blog", href: "/blog" },
  ],
  legal: [
    { name: "Términos y condiciones", href: "/terminos" },
    { name: "Política de privacidad", href: "/privacidad" },
    { name: "Envíos y devoluciones", href: "/envios" },
  ],
}

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/orquideas_fye?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", icon: Instagram },
  { name: "Facebook", href: "https://l.instagram.com/?u=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61550875453951%26utm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio&e=AUCfiiWDevsutj5CiTkBvBxiBr6niiMO8hSEXXJ7_WwpsEl1KF5ZqAVaKHTdlnyBLiJ2eRi1cWBtE6ZSdfmsz-K8f69TmiBBxAwxCyN4hynifd_ZVab9oFC-3jsRo_U5ISjqJT4", icon: Facebook },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6 text-primary-foreground"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 3c-1.5 2-3 4.5-3 7 0 2.5 1.5 4 3 4s3-1.5 3-4c0-2.5-1.5-5-3-7z" />
                  <path d="M9 12c-2-1-4.5-1.5-6-1 2 1 3.5 3 4 5 .5-2 1-3.5 2-4z" />
                  <path d="M15 12c2-1 4.5-1.5 6-1-2 1-3.5 3-4 5-.5-2-1-3.5-2-4z" />
                  <path d="M12 14v7" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                Orquideas
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Creamos arreglos florales únicos con amor y dedicación. Cada ramo cuenta una historia especial.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-foreground">
              Navegación
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.navegacion.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-foreground">
              Empresa
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-foreground">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 Orquideas. Elaborado por <a href="https://yesid542.github.io/miportafolio/" className="text-primary hover:underline">
              YE'S Software.
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
