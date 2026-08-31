import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowRight, Shield } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F4EFE6] border-b border-[#E8E2D6] py-16 sm:py-24 lg:py-28">
      {/* Subtle background ornament */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Narrative */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE3D2] border border-[#B88E3E]/30 text-xs font-semibold tracking-wider uppercase text-[#57534E]">
              <span className="text-[#B88E3E]">✦</span>
              <span>Bhati Gems • Certified Natural Gemstones</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1C1917] leading-[1.15]">
              Natural Gemstones,{" "}
              <span className="italic font-normal text-[#B88E3E]">
                Chosen With Trust.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Explore carefully selected gemstones from Bhati Gems. Discover detailed information about each stone and enquire with confidence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/gemstones"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-[#1C1917] text-white text-sm font-semibold hover:bg-[#B88E3E] transition-all shadow-sm"
              >
                <span>Explore Gemstones</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/919876543210?text=Hello%20Bhati%20Gems,%20I%20am%20exploring%20your%20gemstone%20collection%20and%20would%20like%20assistance."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-white border border-[#E8E2D6] text-[#1C1917] text-sm font-semibold hover:bg-[#FBF9F4] transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Quick reassurance line without unsupported claims */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#78716C]">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#B88E3E]" />
                <span>Transparent Specifications</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B88E3E]" />
                <span>Lab Test Documentation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B88E3E]" />
                <span>Nationwide Enquiries</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Feature */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative luxury frame */}
              <div className="absolute -inset-2 rounded-2xl border border-[#B88E3E]/30 transform rotate-1 pointer-events-none" />
              
              <div className="relative rounded-xl overflow-hidden bg-white border border-[#E8E2D6] subtle-shadow p-3">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#F4EFE6]">
                  <Image
                    src="/images/gemstones/ruby.jpg"
                    alt="Featured Natural Ruby at Bhati Gems"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded px-3 py-2 border border-[#E8E2D6] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-serif font-semibold text-[#1C1917]">
                        Featured Specimen
                      </p>
                      <p className="text-[11px] text-[#78716C]">
                        Natural Unheated Ruby • 4.25 Carats
                      </p>
                    </div>
                    <Link
                      href="/gemstones/natural-pigeon-blood-ruby-4-25ct"
                      className="text-xs font-semibold text-[#B88E3E] hover:underline"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
