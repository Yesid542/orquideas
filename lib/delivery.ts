// lib/delivery.ts
// Ejemplo simple: calcula distancia entre coordenadas y devuelve rango de días.
// Ajusta las coordenadas del almacén según tu negocio.

export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function estimateDeliveryByCoords(lat: number, lon: number) {
  // Coordenadas del almacén (ejemplo)
  const warehouse = { lat: 4.7110, lon: -74.0721 }; // Bogotá
  const km = haversineDistance(lat, lon, warehouse.lat, warehouse.lon);

  // Lógica simple: 0-50km: 1-2 días, 50-200km: 2-4 días, >200km: 4-7 días
  if (km <= 50) return "Entrega estimada: 1-2 días hábiles";
  if (km <= 200) return "Entrega estimada: 2-4 días hábiles";
  return "Entrega estimada: 4-7 días hábiles";
}
