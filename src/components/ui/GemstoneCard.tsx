"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gemstone } from "@/types/gemstone";
import { useCart } from "@/context/CartContext";
import { Check, ShoppingBag, Eye } from "lucide-react";
import { getImagePath } from "@/utils/image";

interface GemstoneCardProps {
  gemstone: Gemstone;
}

export default function GemstoneCard({ gemstone }: GemstoneCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(gemstone, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(gemstone.price);

  return (
    <div className="group bg-white rounded-lg border border-[#E8E2D6] overflow-hidden flex flex-col subtle-shadow subtle-shadow-hover transition-all duration-300">
      {/* Image Container */}
      <Link href={`/gemstones/${gemstone.slug}`} className="relative aspect-square overflow-hidden bg-[#F4EFE6] block">
        <Image
          src={getImagePath(gemstone.images[0])}
          alt={gemstone.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Availability Badge */}
        <div className="absolute top-3 left-3">
          {gemstone.availability === "in_stock" ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-semibold bg-white/95 text-[#1C1917] backdrop-blur-sm border border-[#E8E2D6] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5" />
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-semibold bg-[#2C2825]/90 text-white backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5" />
              On Request
            </span>
          )}
        </div>

        {/* Category Tag */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold bg-white/90 text-[#57534E] backdrop-blur-sm">
            {gemstone.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          <div className="text-xs text-[#78716C] font-medium tracking-wide mb-1 flex items-center gap-1.5">
            <span>{gemstone.shapeCut}</span>
            {gemstone.origin && (
              <>
                <span>•</span>
                <span>{gemstone.origin}</span>
              </>
            )}
          </div>

          <Link href={`/gemstones/${gemstone.slug}`}>
            <h3 className="font-serif text-lg font-semibold text-[#1C1917] group-hover:text-[#B88E3E] transition-colors line-clamp-2 min-h-[3rem]">
              {gemstone.name}
            </h3>
          </Link>

          {/* Weight */}
          <p className="text-xs text-[#57534E] mt-1.5 font-medium">
            Weight: <span className="text-[#1C1917] font-semibold">{gemstone.weight}</span>
          </p>
        </div>

        {/* Price & Actions */}
        <div className="pt-4 mt-3 border-t border-[#F4EFE6]">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-xs text-[#78716C] uppercase tracking-wider">Price</span>
            <span className="font-serif text-xl font-bold text-[#1C1917]">
              {formattedPrice}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/gemstones/${gemstone.slug}`}
              className="inline-flex items-center justify-center gap-1 py-2 px-2.5 text-xs font-medium rounded border border-[#E8E2D6] text-[#2C2825] bg-[#FBF9F4] hover:bg-[#F4EFE6] transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Details</span>
            </Link>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`inline-flex items-center justify-center gap-1 py-2 px-2.5 text-xs font-medium rounded transition-all ${
                added
                  ? "bg-emerald-700 text-white"
                  : "bg-[#1C1917] text-white hover:bg-[#B88E3E]"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
