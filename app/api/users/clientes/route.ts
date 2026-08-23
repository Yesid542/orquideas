import { NextResponse } from "next/server";
import { supabase } from "../../../database/supabaseClient";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  const token = req.headers.get("cookie")?.match(/token=([^;]+)/)?.[1];

  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { user_id: string };

    // Buscar datos del usuario en tu tabla
    const { data, error } = await supabase
      .from("clientes")
      .select(`
        direccion,
        municipios(
            nombre),
        departamentos(
            nombre)
        `)
      .eq("user_id", decoded.user_id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ authenticated: true, usuario: data });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
