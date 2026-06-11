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
