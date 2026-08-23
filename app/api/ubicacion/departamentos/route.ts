import { NextResponse } from "next/server"
import { supabase } from "../../../database/supabaseClient"

export async function GET() {
  // Consulta a la tabla departamentos
  const { data, error } = await supabase
    .from("departamentos")
    .select("codigo, nombre")
    .order("nombre");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
