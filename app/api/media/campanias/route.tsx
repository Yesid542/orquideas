import { NextResponse } from "next/server"
import { supabase } from "../../../database/supabaseClient"


export async function GET() {
  const today = new Date().toISOString();

  const { data, error } = await supabase
    .from("media")
    .select("url, campanias(titulo, fechaInicio, fechaFin, activo)")
    .lte("campanias.fechaInicio", today)
    .gte("campanias.fechaFin", today)
    .eq("campanias.activo", true)
    .not("idCampania", "is", null);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
