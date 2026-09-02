import React from "react";
import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedCarousel from "@/components/home/FeaturedCarousel";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import WhatsAppBanner from "@/components/home/WhatsAppBanner";
import { getFeaturedGemstones } from "@/data/gemstones";

export default async function HomePage() {
  const featuredGemstones = await getFeaturedGemstones();

  return (
    <div className="bg-[#FBF9F4]">
      {/* 1. Hero Section Slider */}
      <HeroSection />

      {/* 2. Horizontal Trust & Benefit Strip */}
      <TrustSection />

      {/* 3. Shop by Category (Gemstones & Rudraksha) */}
      <CategoryGrid />

      {/* 4. Featured Gemstones Horizontal Product Carousel */}
      <FeaturedCarousel gemstones={featuredGemstones} />

      {/* 5. Why Choose Bhati Gems */}
      <WhyChooseUs />

      {/* 6. WhatsApp Inquiry Banner */}
      <WhatsAppBanner />
    </div>
  );
}
