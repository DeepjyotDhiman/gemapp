import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/data/gemstones";
import { ArrowUpRight } from "lucide-react";
import { getImagePath } from "@/utils/image";

export default function CategoryGrid() {
  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B88E3E]">
          Featured Categories
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] mt-2">
          Discover Nine Sacred Gemstones & Rare Crystals
        </h2>
        <p className="text-sm text-[#57534E] mt-3">
          Explore individual gemstone classifications with clear specifications, origins, and laboratory certifications.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/gemstones?category=${encodeURIComponent(cat.id)}`}
            className="group relative rounded-lg overflow-hidden bg-white border border-[#E8E2D6] subtle-shadow subtle-shadow-hover flex flex-col transition-all duration-300"
          >
            {/* Image */}
            <div className="relative aspect-square w-full overflow-hidden bg-[#F4EFE6]">
              <Image
                src={getImagePath(cat.image)}
                alt={`${cat.name} (${cat.hindiName}) at Bhatia Gems`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1C1917] group-hover:bg-[#B88E3E] group-hover:text-white transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[11px] tracking-wider uppercase text-[#DFC07A] font-semibold block">
                  {cat.hindiName}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-medium leading-tight">
                  {cat.name}
                </h3>
              </div>
            </div>

            {/* Micro Caption */}
            <div className="p-3 bg-white">
              <p className="text-[11px] text-[#78716C] line-clamp-2 leading-relaxed">
                {cat.shortDesc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
