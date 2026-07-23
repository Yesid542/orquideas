import { NextResponse } from "next/server";

export async function GET() {
  // Crear respuesta
  const response = NextResponse.json({ success: true });

  // Borrar la cookie "token"
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0, // expira inmediatamente
  });

  return response;
}
