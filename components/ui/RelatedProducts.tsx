// components/RelatedProducts.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";

export default function RelatedProducts({ productId }: { productId: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // carga inicial
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) loadMore();
        });
      },
      { root: null, threshold: 0.2 }
    );
    if (sentinelRef.current) obs.observe(sentinelRef.current);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinelRef.current]);

  async function loadMore() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/recommendations?productId=${productId}&page=${page}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setItems((s) => [...s, ...data.items]);
      setPage((p) => p + 1);
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">También te puede interesar</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((it) => (
          <a key={it.id} href={`/product/${it.id}`} className="block border rounded overflow-hidden">
            <div className="h-40 bg-gray-100">
              <img src={it.images?.[0]} alt={it.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-2">
              <p className="text-sm font-medium">{it.title}</p>
              <p className="text-sm text-muted-foreground">{it.currency ?? "COP"} {it.price.toLocaleString()}</p>
            </div>
          </a>
        ))}
      </div>

      <div ref={sentinelRef} className="mt-4 flex justify-center">
        {loading ? <span className="text-sm text-muted-foreground">Cargando más...</span> : <span className="text-sm text-muted-foreground">Desplázate para cargar más</span>}
      </div>
    </section>
  );
}
