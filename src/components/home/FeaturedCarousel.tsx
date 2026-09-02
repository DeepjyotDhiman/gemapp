"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Gemstone } from "@/types/gemstone";
import { ChevronLeft, ChevronRight, Eye, ArrowRight } from "lucide-react";
import { getImagePath } from "@/utils/image";

interface FeaturedCarouselProps {
  gemstones: Gemstone[];
}

export default function FeaturedCarousel({ gemstones }: FeaturedCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E8E2D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E8E2D6]">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B88E3E]">
              Hand-Selected Inventory
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] mt-1">
              Featured Gemstones
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1">
              Explore highlighted natural specimens with transparent measurements and laboratory documentation.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="p-2 rounded-full border border-[#E8E2D6] bg-[#FBF9F4] text-[#1C1917] hover:bg-[#B88E3E] hover:text-white transition-colors"
              aria-label="Scroll carousel left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="p-2 rounded-full border border-[#E8E2D6] bg-[#FBF9F4] text-[#1C1917] hover:bg-[#B88E3E] hover:text-white transition-colors"
              aria-label="Scroll carousel right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {gemstones.map((gemstone) => {
            const formattedPrice = gemstone.price
              ? new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(gemstone.price)
              : null;

            return (
              <div
                key={gemstone.id}
                className="w-72 sm:w-80 shrink-0 snap-start bg-white rounded-lg border border-[#E8E2D6] overflow-hidden flex flex-col subtle-shadow subtle-shadow-hover group"
              >
                {/* Image */}
                <Link
                  href={`/gemstones/${gemstone.slug}`}
                  className="relative aspect-square overflow-hidden bg-[#F4EFE6] block"
                >
                  <Image
                    src={getImagePath(gemstone.images[0])}
                    alt={gemstone.name}
                    fill
                    sizes="320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold bg-white/90 text-[#57534E] backdrop-blur-sm">
                      {gemstone.category}
                    </span>
                  </div>
                </Link>

                {/* Details */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div className="space-y-1.5">
                    <p className="text-[11px] text-[#78716C] font-medium tracking-wide">
                      {gemstone.shapeCut} {gemstone.origin ? `• ${gemstone.origin}` : ""}
                    </p>
                    <Link href={`/gemstones/${gemstone.slug}`}>
                      <h3 className="font-serif text-base font-semibold text-[#1C1917] group-hover:text-[#B88E3E] transition-colors line-clamp-2 min-h-[2.5rem]">
                        {gemstone.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#57534E]">
                      Weight: <span className="font-semibold text-[#1C1917]">{gemstone.weight}</span>
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#F4EFE6] flex items-center justify-between gap-2">
                    {formattedPrice ? (
                      <span className="font-serif text-lg font-bold text-[#1C1917]">
                        {formattedPrice}
                      </span>
                    ) : (
                      <span className="text-xs text-[#78716C] italic">Details on enquiry</span>
                    )}

                    <Link
                      href={`/gemstones/${gemstone.slug}`}
                      className="inline-flex items-center gap-1 py-1.5 px-3 text-xs font-semibold rounded bg-[#1C1917] text-white hover:bg-[#B88E3E] transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/gemstones"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md bg-[#FBF9F4] border border-[#E8E2D6] text-[#1C1917] text-sm font-semibold hover:bg-[#1C1917] hover:text-white transition-all shadow-sm"
          >
            <span>View All Gemstones</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
