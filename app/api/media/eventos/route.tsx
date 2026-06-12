import { NextResponse } from "next/server"
import { supabase } from "../../../database/supabaseClient"

// GET → obtener todas las imágenes
export async function GET() {
  const { data, error } = await supabase
    .from("media")
    .select(`
      id_media,
      url,
      tipo,
      eventos (
        idEventos,
        nombre,
        descripcion,
        paquetes:paquetes(
          idEventos,
          idComponentes,
          componentes_eventos (
            idComponentes,
            nombre
          )
        )
      )
    `)
    .eq("tipo", "img") // condición fija
    .not("idEventos", "is", null) 
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST → insertar una nueva imagen
export async function POST(req: Request) {
  const body = await req.json()
  const { url, tipo, idProductos } = body

  const { data, error } = await supabase
    .from("media")
    .insert([{ url, tipo, idProductos }])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
