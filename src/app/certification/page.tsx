import React from "react";
import Link from "next/link";
import { Award, FileCheck2, Search, CheckCircle, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Certification & Authenticity | Bhati Gems",
  description: "Learn how Bhati Gems verifies natural gemstones. Transparent lab reports, treatment disclosure, and testing standards.",
};

export default function CertificationPage() {
  const labParameters = [
    {
      title: "Mineral Species & Variety",
      desc: "Confirms whether the gemstone is natural Corundum (Ruby/Sapphire), Beryl (Emerald), Chrysoberyl, or Organic (Pearl/Coral).",
    },
    {
      title: "Enhancement & Treatment Status",
      desc: "Explicitly identifies whether the stone is completely unheated/untreated, or if traditional minor treatments (e.g., cedarwood oiling in emeralds) exist.",
    },
    {
      title: "Carat Weight & Exact Dimensions",
      desc: "Measured using calibrated digital carat balances and optical micrometer gauges to 0.01 carat precision.",
    },
    {
      title: "Microscopic Inclusions",
      desc: "Documentation of natural silk, fingerprint inclusions, and crystal growth zones that authenticate geologic earth formation.",
    },
  ];

  return (
    <div className="bg-[#FBF9F4] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-3 pb-8 border-b border-[#E8E2D6]">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B88E3E]">
            Authenticity & Quality Standards
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1C1917]">
            Gemstone Certification
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] max-w-2xl mx-auto leading-relaxed">
            Understanding laboratory documentation, natural stone testing, and verifiable credentials.
          </p>
        </div>

        {/* Core Policy */}
        <div className="bg-white rounded-xl border border-[#E8E2D6] p-8 sm:p-10 subtle-shadow space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F4EFE6] text-[#B88E3E] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
              Our Certification Standard
            </h2>
          </div>

          <div className="space-y-4 text-sm text-[#57534E] leading-relaxed">
            <p>
              In the gemstone industry, trust is built on objective scientific testing rather than mere spoken assurances. At <strong>Bhati Gems</strong>, every listed gemstone comes with laboratory identification credentials from recognized gem testing laboratories.
            </p>
            <p>
              When you submit an order request, our team provides you with high-resolution digital scans and photos of the corresponding lab certificate, allowing you to independently inspect the findings before confirming your order.
            </p>
          </div>
        </div>

        {/* What to inspect on a certificate */}
        <div className="space-y-6">
          <div className="text-center sm:text-left">
            <h3 className="font-serif text-2xl font-semibold text-[#1C1917]">
              What A Reputable Lab Report Verifies
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1">
              Standard parameters examined during professional gemological evaluation:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {labParameters.map((param, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-[#E8E2D6] subtle-shadow space-y-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#B88E3E]" />
                  <h4 className="font-serif text-base font-semibold text-[#1C1917]">
                    {param.title}
                  </h4>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed pl-6">
                  {param.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Verification assistance CTA */}
        <div className="bg-[#F4EFE6] rounded-xl border border-[#B88E3E]/30 p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-serif text-xl font-medium text-[#1C1917]">
              Request Certificate Preview Before Ordering
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] max-w-lg">
              Have questions about a specific gemstone&apos;s origin or treatment details? We are happy to share certification photos via WhatsApp.
            </p>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hello%20Bhati%20Gems,%20I%20would%20like%20to%20request%20certificate%20details%20for%20a%20gemstone."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C1917] hover:bg-[#B88E3E] text-white text-xs font-semibold rounded transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
