# Proyecto Next.js + Supabase + Stripe

Este proyecto implementa un sistema de **registro, login y pagos** usando **Next.js (App Router)**, **Supabase** para autenticación y base de datos, y **Stripe** para el flujo de pagos.

## 🚀 Tecnologías usadas
- [Next.js](https://nextjs.org/) (App Router, React 18)
- [Supabase](https://supabase.com/) (Auth + Base de datos Postgres)
- [Stripe](https://stripe.com/) (Checkout seguro)
- TypeScript
- TailwindCSS (opcional para estilos)

## 📂 Estructura del proyecto
app/
├─ api/
│   ├─ send-form/route.ts   # Endpoint de registro
│   ├─ login/route.ts       # Endpoint de login
│   └─ checkout/route.ts    # Endpoint de pago con Stripe
├─ page.tsx                 # Página principal
├─ register/page.tsx        # Formulario de registro
├─ login/page.tsx           # Formulario de login
└─ payment/page.tsx         # Página de pago

## Configuración de variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<tu-proyecto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<tu-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<tu-service-role-key> # opcional para admin
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_BASE_URL=http://localhost:3000

**Endpoints principales**
Registro (/api/send-form)
  Crea usuario en auth.users con supabase.auth.signUp.

  Inserta datos adicionales en la tabla clientes.

Login (/api/login)
  Autentica con supabase.auth.signInWithPassword.

  Devuelve sesión y datos del usuario.

Pago (/api/checkout)
  Crea sesión de pago en Stripe.

  Redirige al usuario a la URL de Checkout.


Instalación
  git clone <repo-url>
  cd proyecto
  npm install
  npm run dev

✅ Flujo de uso
El usuario se registra con email y contraseña.

Se guarda información adicional en la tabla clientes.

El usuario hace login y obtiene sesión.

Desde la página de pago, se redirige a Stripe Checkout.

Stripe confirma el pago y redirige a /success o /cancel.

📌 Notas
La tabla clientes debe tener las columnas: id, user_id (uuid), nombre, telefono, email.

Usa auth.admin.createUser en desarrollo si quieres evitar el límite de correos.

Configura SMTP o Resend en Supabase para correos de verificación en producción.

