'use client';

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Receipt, 
  Flower2, 
  CheckCircle2, 
  RefreshCw, 
  Link as LinkIcon, 
  Clock, 
  LogOut
} from 'lucide-react';

interface Comprobante {
  id: string;
  monto: number;
  foto_url: string | null;
  texto_transaccion: string | null;
  created_at: string;
  estado: string;
}

interface Pedido {
  idPedidos: string;
  created_at: string;
  titulo: string;
  descripcion: string;
  precioTotal: number;
  metodo_pago: string;
  estado_pago: string;
  local_origen: string;
}

export default function DashboardConciliacion() {
  const [comprobantes, setComprobantes] = useState<Comprobante[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [selectedComprobante, setSelectedComprobante] = useState<string | null>(null);
  const [selectedPedido, setSelectedPedido] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [linking, setLinking] = useState<boolean>(false);

  // Consumir datos desde el Endpoint GET /api/dashboard
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard');
      console.log('Respuesta de /api/dashboard:', res);
      if (!res.ok) throw new Error('Error al cargar datos del backend');
      
      const data = await res.json();
      
      setComprobantes(data.comprobantes || []);
      setPedidos(data.pedidos || []);
    } catch (error) {
      console.error('Error al consultar /api/dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Consumir acción de cruce desde el Endpoint POST /api/dashboard
  const handleVincular = async () => {
    if (!selectedComprobante || !selectedPedido) return;
    setLinking(true);

    try {
      const res = await fetch('/api/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idComprobante: selectedComprobante,
          idPedido: selectedPedido
        })
      });

      if (!res.ok) throw new Error('Error al vincular pago');

      // Limpiar selecciones y recargar datos
      setSelectedComprobante(null);
      setSelectedPedido(null);
      await fetchData();
    } catch (error) {
      console.error('Error al realizar el cruce:', error);
    } finally {
      setLinking(false);
    }
  };

  return (
    <div className="flex mt-20 h-screen bg-pink-50/40 text-slate-700">
      
      {/* ── BARRA LATERAL IZQUIERDA (SIDEBAR) ── */}
      <aside className="w-64 bg-white border-r border-pink-100 flex flex-col justify-between shadow-sm">
        <div>
          <div className="p-6 border-b border-pink-50 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-pink-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-pink-200">
              O
            </div>
            <h1 className="font-bold text-2xl tracking-tight text-pink-500 font-serif">
              Orquídeas[cite: 3]
            </h1>
          </div>

          <nav className="p-4 space-y-1.5 font-medium text-sm">
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-pink-500 text-white shadow-sm shadow-pink-200 transition">
              <Receipt className="w-5 h-5" />
              <span>Conciliación</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-pink-50 hover:text-pink-600 transition">
              <Package className="w-5 h-5" />
              <span>Pedidos</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-pink-50 hover:text-pink-600 transition">
              <Flower2 className="w-5 h-5" />
              <span>Inventario / Flor</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-pink-50 hover:text-pink-600 transition">
              <LayoutDashboard className="w-5 h-5" />
              <span>Reportes</span>
            </a>
          </nav>
        </div>

        <div className="p-4 border-t border-pink-50">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition text-sm font-medium">
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        <header className="h-16 bg-white border-b border-pink-100 px-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Panel de Conciliación Nequi</h2>
            <p className="text-xs text-slate-400">Vincula comprobantes del Local 1 con pedidos del sistema</p>
          </div>
          <button 
            onClick={fetchData}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-pink-600 bg-pink-50 border border-pink-200 rounded-lg hover:bg-pink-100 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          
          <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedComprobante ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                {selectedComprobante ? 'Comprobante seleccionado' : 'Selecciona un comprobante'}
              </span>
              <span className="text-slate-300">+</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedPedido ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                {selectedPedido ? 'Pedido seleccionado' : 'Selecciona un pedido'}
              </span>
            </div>

            <button
              onClick={handleVincular}
              disabled={!selectedComprobante || !selectedPedido || linking}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition shadow-md ${
                selectedComprobante && selectedPedido
                  ? 'bg-pink-500 text-white shadow-pink-200 hover:bg-pink-600'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              {linking ? 'Vinculando...' : 'VINCULAR PAGO'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* COMPROBANTES NEQUI */}
            <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm flex flex-col h-[520px]">
              <div className="flex items-center justify-between pb-4 mb-3 border-b border-pink-50">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-pink-500" />
                  <h3 className="font-bold text-slate-800">1. Comprobantes Nequi</h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 bg-pink-100 text-pink-600 rounded-full">
                  {comprobantes.length} pendientes
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {comprobantes.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300 text-sm">
                    <CheckCircle2 className="w-8 h-8 mb-2 stroke-[1.5]" />
                    No hay comprobantes pendientes
                  </div>
                ) : (
                  comprobantes.map((comp) => (
                    <div
                      key={comp.id}
                      onClick={() => setSelectedComprobante(selectedComprobante === comp.id ? null : comp.id)}
                      className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                        selectedComprobante === comp.id
                          ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-400/20'
                          : 'border-slate-100 hover:border-pink-200 bg-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-800 text-base">
                            ${comp.monto.toLocaleString('es-CO')}
                          </span>
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono">
                            Nequi
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(comp.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      {comp.foto_url && (
                        <a 
                          href={comp.foto_url} 
                          target="_blank" 
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-100 text-xs font-medium flex items-center gap-1"
                        >
                          Ver captura
                        </a>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* PEDIDOS PENDIENTES */}
            <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm flex flex-col h-[520px]">
              <div className="flex items-center justify-between pb-4 mb-3 border-b border-pink-50">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-pink-500" />
                  <h3 className="font-bold text-slate-800">2. Pedidos Pendientes</h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full">
                  {pedidos.length} por cobrar
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {pedidos.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300 text-sm">
                    <CheckCircle2 className="w-8 h-8 mb-2 stroke-[1.5]" />
                    Todos los pedidos están al día
                  </div>
                ) : (
                  pedidos.map((ped) => (
  <div
    key={ped.idPedidos}
    onClick={() => setSelectedPedido(selectedPedido === ped.idPedidos ? null : ped.idPedidos)}
    className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
      selectedPedido === ped.idPedidos
        ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-400/20'
        : 'border-slate-100 hover:border-pink-200 bg-white'
    }`}
  >
    <div className="space-y-1 max-w-[70%]">
      <h4 className="font-bold text-slate-800 text-sm truncate">
        {ped.titulo || 'Pedido sin título'}
      </h4>
      {ped.descripcion && (
        <p className="text-xs text-slate-500 line-clamp-1">{ped.descripcion}</p>
      )}
      <div className="flex items-center gap-2 pt-1">
        <span className="font-extrabold text-pink-600 text-sm">
          ${ped.precioTotal ? ped.precioTotal.toLocaleString('es-CO') : 'Por definir'}
        </span>
        <span className="text-[10px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded font-medium">
          {ped.local_origen || 'LOCAL_1'}
        </span>
      </div>
    </div>

    <div className="text-right shrink-0">
      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-200">
        PENDIENTE
      </span>
    </div>
  </div>
))
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}