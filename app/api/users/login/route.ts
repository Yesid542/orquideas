// app/api/users/login/route.ts (o donde tengas el handler)
import { NextResponse } from "next/server";
import { supabase } from "../../../database/supabaseClient";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data?.user) {
      return NextResponse.json({ error: error?.message || "Credenciales inválidas" }, { status: 400 });
    }

    const token = jwt.sign({ user_id: data.user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    const response = NextResponse.json({ success: true, user: data.user, session: data.session });

    const isProd = process.env.NODE_ENV === "production";
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax", // <- importante: 'none' en prod
      path: "/",
      maxAge: 60 * 60, // 1 hora
    });

    return response;
  } catch (err: any) {
    console.error("Error en login:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
