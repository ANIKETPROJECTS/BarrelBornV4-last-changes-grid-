import { useState } from "react";
import type { MenuItem } from "@shared/schema";

import fallbackImg from "@assets/coming_soon_imagev2_1766811809828.jpg";

interface ProductCardProps {
  item: MenuItem;
}

export default function ProductCard({ item }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const isBrokenImage = imgError || !item.image || 
    item.image.includes("example.com") || 
    item.image.includes("via.placeholder.com") ||
    item.image.includes("placeholder.com");
  const imageUrl = isBrokenImage ? fallbackImg : item.image;

  return (
    <div className="flex flex-row overflow-hidden gap-6" style={{ borderRadius: 0, minHeight: "240px" }}>
      <div className="relative h-60 overflow-hidden" style={{ flex: "0 0 48%" }}>
        <img
          src={imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
          style={{ borderRadius: 0 }}
          onError={() => setImgError(true)}
        />
        <div
          className={`absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
            item.isVeg ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
      </div>

      <div className="py-6 flex flex-col justify-center" style={{ flex: "1 1 48%" }}>
        <h3
          className="text-xl sm:text-2xl font-bold leading-snug mb-3 line-clamp-2"
          style={{ 
            color: '#C9A55C', 
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "0.5px",
            minHeight: "2.8em"
          }}
        >
          {item.name}
        </h3>
        <p
          className="text-sm sm:text-base leading-relaxed mb-4 line-clamp-2"
          style={{ 
            color: '#FFFFFF',
            fontFamily: "'Lato', sans-serif",
            minHeight: "2.6em"
          }}
        >
          {item.description || "No description available"}
        </p>
        <div className="flex items-center justify-between">
          <span
            className="text-lg sm:text-xl font-bold"
            style={{ 
              color: '#FFFFFF',
              fontFamily: "'Lato', sans-serif",
              letterSpacing: "0.5px",
              lineHeight: "1.5"
            }}
          >
            {typeof item.price === "string" && item.price.includes("|") 
              ? item.price.split("|").map(p => `₹${p.trim()}`).join(" | ")
              : `₹${item.price}`}
          </span>
        </div>
      </div>
    </div>
  );
}