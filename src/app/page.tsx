import React from "react";
import Link from "next/link";
import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import TrustSection from "@/components/home/TrustSection";
import WhatsAppBanner from "@/components/home/WhatsAppBanner";
import GemstoneCard from "@/components/ui/GemstoneCard";
import { getFeaturedGemstones } from "@/data/gemstones";
import { ArrowRight } from "lucide-react";

export default async function HomePage() {
  const featuredGemstones = await getFeaturedGemstones();

  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Categories (8 Sacred & Fine Stones) */}
      <CategoryGrid />

      {/* 3. Featured Products */}
      <section className="py-16 sm:py-20 bg-white border-t border-[#E8E2D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E8E2D6]">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B88E3E]">
                Hand-Selected Specimens
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] mt-1">
                Featured Gemstones
              </h2>
              <p className="text-xs sm:text-sm text-[#57534E] mt-1">
                Sample collection displaying natural untreated stones with certified lab credentials.
              </p>
            </div>

            <Link
              href="/gemstones"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#B88E3E] hover:text-[#9F792F] transition-colors"
            >
              <span>View All Gemstones</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGemstones.slice(0, 8).map((gemstone) => (
              <GemstoneCard key={gemstone.id} gemstone={gemstone} />
            ))}
          </div>

          {/* Clear note for Phase 1 */}
          <div className="mt-8 text-center">
            <span className="inline-block text-[11px] text-[#78716C] bg-[#FBF9F4] px-4 py-2 rounded-full border border-[#E8E2D6]">
              Note: Sample product data displayed for Phase 1 order request testing. Real inventory will connect via Supabase in Phase 2.
            </span>
          </div>
        </div>
      </section>

      {/* 4. Trust Section (4 simple trust points) */}
      <TrustSection />

      {/* 5. WhatsApp CTA */}
      <WhatsAppBanner />
    </div>
  );
}
