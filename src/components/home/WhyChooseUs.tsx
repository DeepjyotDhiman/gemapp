import React from "react";
import { ShieldCheck, Award, Box, Headphones } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Award,
      title: "Quality Focus",
      description: "Carefully selected natural gemstones and sacred beads with detailed physical specifications.",
    },
    {
      icon: ShieldCheck,
      title: "Authentic Products",
      description: "Gemstones accompanied by gemological lab test documentation shared before transaction.",
    },
    {
      icon: Box,
      title: "Secure Packaging",
      description: "Protective individual packaging ensuring safe and intact delivery across India.",
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "Personal consultation available via WhatsApp and phone to guide your order request.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#141210] text-white border-t border-[#2C2825] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#B88E3E_1px,transparent_1px)] opacity-10 [background-size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#DFC07A]">
            Our Commitment
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white mt-2">
            Why Choose Bhati Gems?
          </h2>
          <p className="text-sm text-[#A8A29E] mt-3">
            Honest practices, transparent documentation, and personal care for every enquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#1C1917] p-6 rounded-xl border border-[#B88E3E]/30 subtle-shadow flex flex-col space-y-4 hover:border-[#B88E3E] transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-[#2C2825] border border-[#B88E3E]/40 flex items-center justify-center text-[#DFC07A]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
