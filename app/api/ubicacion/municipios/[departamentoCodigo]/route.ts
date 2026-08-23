import { NextResponse } from "next/server";
import { supabase } from "../../../../database/supabaseClient";

export async function GET(
  request: Request,
  context: { params: Promise<{ departamentoCodigo: string }> }
) {
  // 👇 Aquí se hace el await porque params es una Promise
  const { departamentoCodigo } = await context.params;

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
