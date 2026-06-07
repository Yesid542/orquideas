"use client"
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapInteractive() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null); // referencia al marcador

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/yesid121344345/cmnb2h3bd000801s6eotg0frb",
      center: [0, 0], // vista mundial
      zoom: 1,
    });

    map.current.on("click", () => {
      // animación hacia Boyacá
      map.current?.flyTo({
        center: [-73.1460407752655, 5.196067806433879],
        zoom: 15,
        speed: 1.2,
        curve: 1,
        essential: true,
      });

      // crea el marcador solo si aún no existe
      if (!marker.current) {
        marker.current = new mapboxgl.Marker({ color: "#c51a8c" })
          .setLngLat([-73.1460407752655, 5.196067806433879])
          .setPopup(new mapboxgl.Popup().setText("Justo Aquí"))
          .addTo(map.current!)
          .togglePopup(); // abre el popup al primer clic
  
        marker.current = new mapboxgl.Marker({ color: "#c51a8c" })
          .setLngLat([-73.14388413438463, 5.19586008805078])
          .setPopup(new mapboxgl.Popup().setText("Y aquí"))
          .addTo(map.current!)
          .togglePopup(); // abre el popup al primer clic
      }
    });
  }, []);

  return (
    <section id="mapinteractive" className="border-y border-border bg-card py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-0 md:grid-cols-3 w-full">
          {/* Caja del mapa */}
          <div className="col-span-3 mb-6 md:col-span-2 flex justify-center">
            <div ref={mapContainer} className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg"></div>
          </div>

          {/* Caja de información */}
          <div className="flex flex-col gap-4 text-center sm:text-left">
  {/* Encabezado con ícono */}
            <div className="flex items-center gap-4 px-2 justify-center sm:justify-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="text-primary text-xl">📍</span>
              </div>
              <h3 className="font-semibold text-foreground">Visítanos</h3>
            </div>
            
            <div className="flex flex-col gap-4 px-18 text-center sm:text-left sm:px-4">
              {/* Dirección */}
              <p className="text-sm text-muted-foreground">
                <strong>Barrio el ocobo,</strong> Calle 3 # 7-2, Miraflores, Boyacá
              </p>

              {/* Horario */}
              <p className="text-sm text-muted-foreground">
                Horario: Domingo a Viernes 8:30 AM - 7:00 PM
              </p>

              {/* Botón */}
              <a
                href="https://maps.app.goo.gl/PPoS9GfUsUPUybWY8"
                target="_blank"
                className="mt-3 w-60 mx-auto sm:mx-0 inline-block bg-primary text-white text-center px-4 py-2 rounded-lg hover:bg-primary/80 transition"
              >
                Cómo llegar
              </a>

              {/* Segunda sede */}
              <p className="text-sm text-muted-foreground">
                <strong>Parque Principal,</strong> Calle 4 # 7-18, Miraflores, Boyacá
              </p>
              <p className="text-sm text-muted-foreground">
                Horario: Martes a Domingo 9:00 AM - 6:00 PM
              </p>
              <a
                href="https://maps.app.goo.gl/PPoS9GfUsUPUybWY8"
                target="_blank"
                className="mt-3 w-60 mx-auto sm:mx-0 inline-block bg-primary text-white text-center px-4 py-2 rounded-lg hover:bg-primary/80 transition"
              >
                Cómo llegar
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
