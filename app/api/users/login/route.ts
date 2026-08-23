import { NextResponse } from "next/server";
import { supabase } from "../../../database/supabaseClient";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Autenticación con Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // 2. Generar token seguro en el backend
    const token = jwt.sign(
      { user_id: data.user.id },
      process.env.JWT_SECRET!, // usa variable de entorno
      { expiresIn: "1h" }
    );

    // 3. Crear respuesta y setear cookie
    const response = NextResponse.json({
      success: true,
      user: data.user,
      session: data.session,
    });

    response.cookies.set("token", token, {
      httpOnly: true, // no accesible desde JS
      secure: process.env.NODE_ENV === "production", // true en prod, false en dev
      sameSite: "lax", // más flexible que strict
      path: "/",       // disponible en toda la app
      maxAge: 60 * 60, // 1 hora
    });

    // 4. Retornar la respuesta con cookie incluida
    return response;

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}



