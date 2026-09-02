import React from "react";
import { Gem, CheckCircle2, ShieldCheck, Truck, Headphones } from "lucide-react";

export default function TrustSection() {
  const benefits = [
    {
      icon: Gem,
      title: "Natural Gemstones",
      subtitle: "Inspected Specimens",
    },
    {
      icon: CheckCircle2,
      title: "Quality Checked",
      subtitle: "Verified Credentials",
    },
    {
      icon: ShieldCheck,
      title: "Secure Packaging",
      subtitle: "Protective Transit",
    },
    {
      icon: Truck,
      title: "Shipping Across India",
      subtitle: "Direct Coordination",
    },
    {
      icon: Headphones,
      title: "Customer Support",
      subtitle: "WhatsApp Guidance",
    },
  ];

  return (
    <section className="bg-[#1C1917] border-b border-[#2C2825] py-5 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#2C2825]">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-3 first:pt-0"
              >
                <div className="w-9 h-9 rounded-full bg-[#2C2825] border border-[#B88E3E]/40 flex items-center justify-center text-[#DFC07A] shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-serif font-semibold text-white truncate">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-[#A8A29E] truncate">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

