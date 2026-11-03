import { NextResponse } from 'next/server';
import { supabase } from "../../database/supabaseClient"

// GET: Carga comprobantes sin asignar y pedidos pendientes
export async function GET() {
  try {
    const { data: comprobantes, error: errComp } = await supabase
      .from('comprobantes_nequi')
      .select('*')
      .eq('estado', 'SIN_ASIGNAR')
      .order('created_at', { ascending: false });
      console.log('Comprobantes obtenidos:', comprobantes);
    if (errComp) throw errComp;

    const { data: pedidos, error: errPed } = await supabase
      .from('pedidos')
      .select('*')
      .eq('estado_pago', 'PENDIENTE')
    console.log('Pedidos obtenidos:', pedidos);
    if (errPed) throw errPed;

    return NextResponse.json({ comprobantes, pedidos }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Llama a la función almacenada en Supabase (RPC)
export async function POST(request: Request) {
  try {
    const { idComprobante, idPedido } = await request.json();

    if (!idComprobante || !idPedido) {
      return NextResponse.json(
        { error: 'idComprobante e idPedido son requeridos' },
        { status: 400 }
      );
    }

    // Invoca la función PL/pgSQL creada en Supabase
    const { error } = await supabase.rpc('vincular_pago_nequi', {
      p_id_comprobante: idComprobante,
      p_id_pedido: idPedido,
    });
    console.log('Resultado de la función RPC:', { error });

    if (error) throw error;

    return NextResponse.json(
      { message: 'Pago vinculado e inventario descontado con éxito' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}