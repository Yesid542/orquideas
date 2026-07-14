import { NextResponse } from "next/server"
import { supabase } from "../../../database/supabaseClient"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params
  const { data, error } = await supabase
    .from("productos")
    .select(`
      idProductos,
      nombre,
      descripcion,
      precioBase,
      media (
        id_media,
        url
      )
    `)
    .eq("idProductos", id)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
export async function POST(req: Request) {
  try {
    // 1. Recibir el body en JSON
    const body = await req.json();
    const { name, email, password, phone } = body;

    // 2. Crear usuario en Supabase Auth
    const { data: user, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // 3. Insertar datos adicionales en tu tabla "clientes"
    // ⚠️ IMPORTANTE: asegúrate de que la tabla "clientes" tenga las columnas:
    // id (PK), user_id (uuid), nombre (text), telefono (text), email (text)
    const { data, error } = await supabase
      .from("clientes")
      .insert([
        {
          user_id: user.user?.id, // relacionar con auth.users
          nombre: name,
          telefono: phone,

        },
      ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}