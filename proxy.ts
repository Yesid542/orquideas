import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req: NextRequest) {
  // Leer la cookie "token"
  const token = req.cookies.get("token")?.value;

  // Si no hay token, redirigir al login
  if (!token) {
    console.log("No token found, redirecting to loginPage");
    return NextResponse.redirect(new URL("/loginPage", req.url));
    
  }

  try {
    // Verificar el token
    jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Token is valid, allowing access to the requested page");
    // Si es válido, dejar pasar la request
    return NextResponse.next();
  } catch (err) {
    console.log("Invalid or expired token, redirecting to loginPage");
    // Si el token es inválido o expiró, redirigir al login
    return NextResponse.redirect(new URL("/loginPage", req.url));
  }
}

// Configurar qué rutas deben pasar por el middleware
export const config = {
  matcher: ["/eventos/:path*","/dashboard/:path*"], 
};
