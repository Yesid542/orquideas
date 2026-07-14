"use client";

import { useEffect, useState } from "react";

export default function CampaniaModal() {
  const [campania, setCampania] = useState<any>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const fetchCampania = async () => {
      try {
        const res = await fetch("/api/media/campanias");
        const data = await res.json();
        if (data && data.length > 0) {
          setCampania(data[0]); // 
        }
      } catch (err) {
        console.error("Error cargando campaña:", err);
      }
    };
    fetchCampania();
  }, []);

  console.log("Campaña obtenida:", campania);
  if (!campania || !show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative max-w-md">
        <img src={campania.url} className="rounded-md mb-4"/>
        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
