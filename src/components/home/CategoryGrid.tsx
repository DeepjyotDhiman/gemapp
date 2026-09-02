import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/data/gemstones";
import { ArrowRight, Sparkles, Gem } from "lucide-react";
import { getImagePath } from "@/utils/image";

export default function CategoryGrid() {
  const topCategories = CATEGORIES.slice(0, 8);

  return (
    <section className="py-16 sm:py-24 bg-[#FBF9F4] border-b border-[#E8E2D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B88E3E]">
            Shop By Category
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] mt-2">
            Curated Gemstones & Sacred Beads
          </h2>
          <p className="text-sm text-[#57534E] mt-3">
            Explore our collections of natural certified gemstones and authentic Rudraksha beads.
          </p>
        </div>

        {/* Two Main Feature Cards: Gemstones & Rudraksha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card A: Gemstones */}
          <Link
            href="/gemstones"
            className="group relative rounded-xl overflow-hidden min-h-[340px] sm:min-h-[380px] flex flex-col justify-end p-8 border border-[#E8E2D6] subtle-shadow subtle-shadow-hover"
          >
            <Image
              src={getImagePath("/images/gemstones/ruby.jpg")}
              alt="Natural Certified Gemstones Collection"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/70 to-transparent" />

            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B88E3E] text-white text-[11px] font-semibold uppercase tracking-wider">
                <Gem className="w-3.5 h-3.5" />
                <span>Primary Catalog</span>
              </div>
              <h3 className="font-serif text-3xl font-medium text-white group-hover:text-[#DFC07A] transition-colors">
                Natural Gemstones
              </h3>
              <p className="text-xs sm:text-sm text-[#D6D3D1] max-w-md leading-relaxed">
                Explore certified Rubies, Emeralds, Sapphires, Pearls, and fine natural specimens with verified specifications.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#DFC07A] group-hover:translate-x-1 transition-transform">
                  <span>Browse All Gemstones</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>

          {/* Card B: Rudraksha */}
          <Link
            href="/rudraksha"
            className="group relative rounded-xl overflow-hidden min-h-[340px] sm:min-h-[380px] flex flex-col justify-end p-8 border border-[#E8E2D6] subtle-shadow subtle-shadow-hover"
          >
            <Image
              src={getImagePath("/images/rudraksha/mala.jpg")}
              alt="Authentic Rudraksha Beads Collection"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C2825] via-[#2C2825]/75 to-transparent" />

            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider border border-white/30">
                <Sparkles className="w-3.5 h-3.5 text-[#DFC07A]" />
                <span>Sacred Collection</span>
              </div>
              <h3 className="font-serif text-3xl font-medium text-white group-hover:text-[#DFC07A] transition-colors">
                Authentic Rudraksha
              </h3>
              <p className="text-xs sm:text-sm text-[#D6D3D1] max-w-md leading-relaxed">
                Discover 1 to 14 Mukhi Rudraksha beads, Malas, Bracelets, and traditional sacred accessories.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#DFC07A] group-hover:translate-x-1 transition-transform">
                  <span>Explore Rudraksha Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Gemstone Classifications */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#E8E2D6]">
            <h3 className="font-serif text-xl font-medium text-[#1C1917]">
              Popular Gemstone Types
            </h3>
            <Link
              href="/gemstones"
              className="text-xs font-semibold text-[#B88E3E] hover:underline flex items-center gap-1"
            >
              <span>View All 25 Types</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {topCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/gemstones?category=${encodeURIComponent(cat.id)}`}
                className="group p-3 bg-white rounded-lg border border-[#E8E2D6] subtle-shadow subtle-shadow-hover flex items-center gap-3"
              >
                <div className="relative w-12 h-12 rounded overflow-hidden bg-[#F4EFE6] shrink-0 border border-[#E8E2D6]">
                  <Image
                    src={getImagePath(cat.image)}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-serif font-semibold text-[#1C1917] group-hover:text-[#B88E3E] transition-colors truncate">
                    {cat.name}
                  </p>
                  <p className="text-[10px] text-[#78716C] truncate">
                    {cat.hindiName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

