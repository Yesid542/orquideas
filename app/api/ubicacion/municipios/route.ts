import { NextResponse } from "next/server"
import { supabase } from "../../../database/supabaseClient"

export async function GET(
  request: Request,
  { params }: { params: { departamentoCodigo: string } }
) {
  const { departamentoCodigo } = params;

  // Consulta municipios filtrados por departamento
  const { data, error } = await supabase
    .from("municipios")
    .select("codigo, nombre")
    .eq("departamento_codigo", departamentoCodigo)
    .order("nombre");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
