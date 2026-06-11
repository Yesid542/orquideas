// components/ImageCarousel.tsx
"use client";
import React, { useState } from "react";

export default function ImageCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  if (!images || images.length === 0) return <div className="h-80 bg-gray-100" />;

  return (
    <div>
      <div className="relative h-[420px] md:h-[520px] bg-gray-50 rounded overflow-hidden">
        <img src={images[index]} alt={`Imagen ${index + 1}`} className="w-full h-full object-cover" />
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto">
        {images.map((src, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-20 h-20 rounded overflow-hidden border ${i === index ? "ring-2 ring-fuchsia-400" : "border-transparent"}`}>
            <img src={src} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
