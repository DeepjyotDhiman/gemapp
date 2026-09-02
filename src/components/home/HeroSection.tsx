"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { getImagePath } from "@/utils/image";

const HERO_SLIDES = [
  {
    id: "slide-1",
    title: "Natural Gemstones,",
    titleHighlight: "Chosen With Trust.",
    subtitle: "Explore carefully selected natural gemstones from Bhatia Gems with laboratory test documentation and transparent specifications.",
    bgImage: "/images/hero/hero-1.jpg",
    cardImage: "/images/gemstones/ruby.jpg",
    specimenName: "Natural Unheated Ruby",
    specimenSub: "4.25 Carats • Vivid Crimson Life",
    link: "/gemstones/natural-pigeon-blood-ruby-4-25ct",
  },
  {
    id: "slide-2",
    title: "Unheated Ceylon",
    titleHighlight: "Royal Blue Sapphires.",
    subtitle: "Authentic Sri Lankan corundum gems featuring deep royal cornflower hue and high crystal clarity.",
    bgImage: "/images/hero/hero-2.jpg",
    cardImage: "/images/gemstones/blue-sapphire.jpg",
    specimenName: "Ceylon Blue Sapphire (Neelam)",
    specimenSub: "3.45 Carats • Untreated Royal Blue",
    link: "/gemstones/ceylon-natural-royal-blue-sapphire-3-45ct",
  },
  {
    id: "slide-3",
    title: "Lustrous Zambian",
    titleHighlight: "Emerald Specimens.",
    subtitle: "Discover distinct octagonal step-cut emeralds exhibiting characteristic natural jardin crystal formations.",
    bgImage: "/images/hero/hero-3.jpg",
    cardImage: "/images/gemstones/emerald.jpg",
    specimenName: "Zambian Emerald (Panna)",
    specimenSub: "5.10 Carats • Deep Luminous Green",
    link: "/gemstones/natural-octagonal-zambian-emerald-5-10ct",
  },
  {
    id: "slide-4",
    title: "Authentic Sacred",
    titleHighlight: "Rudraksha Beads.",
    subtitle: "Explore authentic 1 to 14 Mukhi beads, Rosary Malas, Bracelets, and accessories with verified physical features.",
    bgImage: "/images/hero/hero-4.jpg",
    cardImage: "/images/rudraksha/mala.jpg",
    specimenName: "5 Mukhi Natural Mala",
    specimenSub: "108 Beads • Traditional Rosary",
    link: "/rudraksha",
  },
  {
    id: "slide-5",
    title: "Fine Gemstones &",
    titleHighlight: "Sacred Collection.",
    subtitle: "Curated collection of natural gemstones and Rudraksha with direct WhatsApp assistance and nationwide delivery.",
    bgImage: "/images/hero/hero-5.jpg",
    cardImage: "/images/gemstones/yellow-sapphire.jpg",
    specimenName: "Yellow Sapphire (Pukhraj)",
    specimenSub: "6.20 Carats • Golden Lemon Saturation",
    link: "/gemstones/natural-yellow-sapphire-pukhraj-6-20ct",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 50) handleNext();
    if (diffX < -50) handlePrev();
    touchStartX.current = null;
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative overflow-hidden bg-[#1C1917] text-white min-h-[540px] sm:min-h-[600px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image Carousel with Overlay */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? "opacity-40 scale-105 transition-transform duration-[8000ms]" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={getImagePath(slide.bgImage)}
            alt={slide.specimenName}
            fill
            priority={idx === 0}
            className="object-cover object-center filter blur-[1px]"
          />
        </div>
      ))}

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1C1917]/95 via-[#1C1917]/80 to-[#1C1917]/60" />
      <div className="absolute inset-0 bg-[radial-gradient(#B88E3E_1px,transparent_1px)] opacity-10 [background-size:28px_28px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Action Buttons */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2C2825]/80 border border-[#B88E3E]/40 text-xs font-semibold tracking-wider uppercase text-[#DFC07A] backdrop-blur-sm">
              <span className="text-[#B88E3E]">✦</span>
              <span>Bhatia Gems • Fine Natural Stones</span>
            </div>

            <div className="min-h-[140px] sm:min-h-[160px] flex flex-col justify-center">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.15] text-white">
                {activeSlide.title}{" "}
                <span className="italic font-normal text-[#DFC07A]">
                  {activeSlide.titleHighlight}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#D6D3D1] leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal mt-4">
                {activeSlide.subtitle}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/gemstones"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-[#B88E3E] text-white text-sm font-semibold hover:bg-[#9F792F] transition-all shadow-md"
              >
                <span>Explore Gemstones</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/rudraksha"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-all"
              >
                <span>Explore Rudraksha</span>
              </Link>

              <a
                href="https://wa.me/919106765594?text=Hello%20Bhatia%20Gems,%20I%20am%20exploring%20your%20gemstone%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center justify-center gap-2 p-3.5 rounded-md bg-[#25D366]/20 border border-[#25D366]/40 text-white hover:bg-[#25D366] transition-colors"
                title="WhatsApp Us"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Right Column: Specimen Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-2 rounded-2xl border border-[#B88E3E]/40 transform rotate-1 pointer-events-none" />

              <div className="relative rounded-xl overflow-hidden bg-[#2C2825]/90 border border-[#B88E3E]/30 p-3 shadow-2xl backdrop-blur-md">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#1C1917]">
                  <Image
                    src={getImagePath(activeSlide.cardImage)}
                    alt={activeSlide.specimenName}
                    fill
                    className="object-cover transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-md rounded px-3.5 py-2.5 border border-[#B88E3E]/30 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-serif font-semibold text-white">
                        {activeSlide.specimenName}
                      </p>
                      <p className="text-[11px] text-[#A8A29E]">
                        {activeSlide.specimenSub}
                      </p>
                    </div>
                    <Link
                      href={activeSlide.link}
                      className="text-xs font-semibold text-[#DFC07A] hover:underline shrink-0 ml-2"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls & Pagination Dots */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
          {/* Pagination Dots */}
          <div className="flex items-center space-x-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all ${
                  idx === currentSlide
                    ? "w-8 h-2 bg-[#B88E3E] rounded-full"
                    : "w-2 h-2 bg-white/40 hover:bg-white/70 rounded-full"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

