import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppBanner() {
  return (
    <section className="py-14 sm:py-16 bg-[#FBF9F4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-[#E8E2D6] p-8 sm:p-10 subtle-shadow flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left relative overflow-hidden">
          <div className="space-y-2 max-w-lg">
            <span className="text-xs uppercase tracking-widest text-[#B88E3E] font-semibold">
              Direct Consultation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1917]">
              Have a question about a gemstone?
            </h2>
            <p className="text-sm text-[#57534E]">
              Speak directly with our gemstone specialist to discuss availability, clarity nuances, video previews, or astrological suitability.
            </p>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hello%20Bhati%20Gems,%20I%20have%20a%20question%20about%20your%20gemstones."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-semibold transition-all shadow-sm shrink-0"
          >
            <MessageCircle className="w-5 h-5 fill-white text-transparent" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
