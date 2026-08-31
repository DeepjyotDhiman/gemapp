import React from "react";
import Link from "next/link";
import { MessageCircle, Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1C1917] text-[#FAF7F2] border-t border-[#2C2825]">
      {/* Upper Footer: Brand & Trust */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[#B88E3E] font-serif text-xl">✦</span>
              <span className="font-serif text-2xl tracking-wider text-white">
                BHATIA GEMS
              </span>
            </div>
            <p className="text-sm text-[#A8A29E] leading-relaxed max-w-sm">
              Curators of fine natural gemstones. We provide transparent specifications, laboratory certification guidance, and direct order requests for clients across India and locally.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#DFC07A] bg-[#2C2825] px-3 py-1 rounded-full border border-[#B88E3E]/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                Phase 1 Order-Request Platform
              </span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E7E2D7] mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-[#A8A29E]">
              <li>
                <Link href="/gemstones" className="hover:text-[#B88E3E] transition-colors">
                  All Gemstones
                </Link>
              </li>
              <li>
                <Link href="/gemstones?category=Ruby" className="hover:text-[#B88E3E] transition-colors">
                  Rubies (Manik)
                </Link>
              </li>
              <li>
                <Link href="/gemstones?category=Emerald" className="hover:text-[#B88E3E] transition-colors">
                  Emeralds (Panna)
                </Link>
              </li>
              <li>
                <Link href="/gemstones?category=Blue Sapphire" className="hover:text-[#B88E3E] transition-colors">
                  Blue Sapphires (Neelam)
                </Link>
              </li>
              <li>
                <Link href="/gemstones?category=Yellow Sapphire" className="hover:text-[#B88E3E] transition-colors">
                  Yellow Sapphires (Pukhraj)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Company */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E7E2D7] mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-[#A8A29E]">
              <li>
                <Link href="/about" className="hover:text-[#B88E3E] transition-colors">
                  About Bhatia Gems
                </Link>
              </li>
              <li>
                <Link href="/certification" className="hover:text-[#B88E3E] transition-colors">
                  Certification & Authenticity
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#B88E3E] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#B88E3E] transition-colors">
                  View Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Social Placeholders */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E7E2D7] mb-4">
              Contact & Inquiries
            </h3>
            <ul className="space-y-3 text-sm text-[#A8A29E]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B88E3E] shrink-0 mt-0.5" />
                <span className="text-xs">
                  [Address Placeholder: Jaipur / Delhi Gem Market, India]
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B88E3E] shrink-0" />
                <span className="text-xs">[Phone Placeholder: +91 98765 43210]</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B88E3E] shrink-0" />
                <span className="text-xs">[Email Placeholder: contact@bhatiagems.com]</span>
              </li>
              <li className="pt-2 flex items-center gap-4">
                <a
                  href="https://wa.me/919876543210?text=Hello%20Bhati%20Gems,%20I%20have%20an%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#25D366] hover:underline"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
                <span className="text-stone-600">•</span>
                <span className="flex items-center gap-1 text-xs text-[#A8A29E]">
                  <svg className="w-4 h-4 text-[#E1306C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>@bhatiagems [Placeholder]</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Lower Bar: Legal & Disclaimer */}
      <div className="border-t border-[#2A2623] bg-[#141210] py-6 text-xs text-[#78716C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p>© {new Date().getFullYear()} Bhatia Gems. All rights reserved.</p>
            <p className="text-[11px] text-[#57534E] mt-0.5">
              Phase 1 notice: Business details and phone numbers are temporary placeholders until confirmed by Bhatia Gems. Orders placed are non-binding requests.
            </p>
          </div>
          <div className="flex items-center space-x-6 text-xs text-[#A8A29E]">
            <Link href="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
