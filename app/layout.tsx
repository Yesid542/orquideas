import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { AuthProvider } from "@/context/AuthContext";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif"
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: 'Orquideas | Floristería y eventos',
  description: 'Crea ramos personalizados, explora nuestro catálogo y decora tus eventos con las flores más hermosas.',
  generator: 'v0.app',
  icons: {
    icon: "/preview.png",
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <Header />
          <main className="min-h-screen ">
            {children}
          </main>
          <Footer />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </AuthProvider>
      </body>
    </html>
  )
}
