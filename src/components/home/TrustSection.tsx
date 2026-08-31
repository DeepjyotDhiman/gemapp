import React from "react";
import { FileText, Award, UserCheck, Truck } from "lucide-react";

export default function TrustSection() {
  const trustPoints = [
    {
      icon: FileText,
      title: "Detailed Product Information",
      description:
        "Every gemstone listing includes dimensions, cut, treatment status, and weight in both carats and ratti.",
    },
    {
      icon: Award,
      title: "Certification Information",
      description:
        "Authenticity reports and testing laboratory credentials are shared transparently with each individual stone.",
    },
    {
      icon: UserCheck,
      title: "Personal Assistance",
      description:
        "Direct guidance available via WhatsApp to discuss specific stone requirements, astrological needs, or setting advice.",
    },
    {
      icon: Truck,
      title: "Delivery Across India",
      description:
        "Secure shipping arrangements coordinated directly with clients after order request confirmation.",
    },
  ];

  return (
    <section className="bg-[#F4EFE6] border-y border-[#E8E2D6] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B88E3E]">
            Our Commitment
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] mt-2">
            Why Inquire With Bhati Gems
          </h2>
          <p className="text-sm text-[#57534E] mt-2">
            Clear standards, straightforward communication, and personal care for every client.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {trustPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-6 sm:p-7 border border-[#E8E2D6] subtle-shadow subtle-shadow-hover flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-[#FBF9F4] border border-[#E8E2D6] flex items-center justify-center text-[#B88E3E] mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#1C1917] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
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
