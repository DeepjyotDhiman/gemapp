import React from "react";
import Link from "next/link";
import { MessageCircle, ShieldCheck, Sparkles, Compass } from "lucide-react";

export const metadata = {
  title: "About Us | Bhatia Gems",
  description: "Learn about Bhatia Gems, our commitment to natural unheated gemstones, individual testing credentials, and honest client service across India.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FBF9F4] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 pb-8 border-b border-[#E8E2D6]">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B88E3E]">
            Our Philosophy
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1C1917]">
            About Bhatia Gems
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] max-w-2xl mx-auto leading-relaxed">
            A dedicated gemstone house committed to natural minerals, authentic cuts, and straightforward personal consultation.
          </p>
        </div>

        {/* Brand Story (Respecting the constraint: no fabricated claims or years of experience) */}
        <div className="bg-white rounded-xl border border-[#E8E2D6] p-8 sm:p-10 subtle-shadow space-y-6">
          <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
            Natural Gemstones, Chosen With Trust
          </h2>
          <div className="space-y-4 text-sm text-[#57534E] leading-relaxed">
            <p>
              Gemstones carry timeless beauty and cultural reverence in India. At <strong>Bhatia Gems</strong>, we focus on presenting natural stones with total transparency. We believe every customer deserves clear information regarding the exact weight, dimensions, origin, and enhancement status of each stone before making a decision.
            </p>
            <p>
              Whether you are seeking an astrological stone such as a Ceylon Blue Sapphire (Neelam) or Pukhraj, or a fine jewel for custom setting, our goal is to eliminate ambiguity. We refrain from exaggerated marketing narratives and instead emphasize verifiable gemological documentation.
            </p>
            <p>
              We serve clients locally and across India through a personalized inquiry model. Because gemstones are unique individual creations of nature, we review every order request personally and share comprehensive visual documentation and laboratory credentials prior to confirming transactions.
            </p>
          </div>
        </div>

        {/* Guiding Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-[#E8E2D6] subtle-shadow space-y-3">
            <div className="w-10 h-10 rounded bg-[#F4EFE6] text-[#B88E3E] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Accurate Data
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              We present accurate weights in both carats and traditional Indian ratti, complete with dimensions and macro photographs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E8E2D6] subtle-shadow space-y-3">
            <div className="w-10 h-10 rounded bg-[#F4EFE6] text-[#B88E3E] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Laboratory Testing
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Stones are accompanied by laboratory testing credentials from recognized gemological laboratories.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E8E2D6] subtle-shadow space-y-3">
            <div className="w-10 h-10 rounded bg-[#F4EFE6] text-[#B88E3E] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Direct Dialogue
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              No generic automated checkout. We connect directly with clients via WhatsApp and phone to answer questions.
            </p>
          </div>
        </div>

        {/* Clear Phase 1 Placeholder Notice */}
        <div className="p-4 bg-[#F4EFE6] rounded-lg border border-[#B88E3E]/30 text-xs text-[#57534E]">
          <p className="font-semibold text-[#1C1917] mb-1">
            ✦ Phase 1 Platform Notice:
          </p>
          <p>
            Detailed historical milestones, founder bio, and registered premises addresses will be updated as verified by Bhatia Gems leadership.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href="/gemstones"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md bg-[#1C1917] text-white text-sm font-semibold hover:bg-[#B88E3E] transition-colors"
          >
            <span>Explore Gemstones</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
