import React, { Suspense } from "react";
import GemstoneCatalogClient from "./GemstoneCatalogClient";

export const metadata = {
  title: "All Gemstones | Bhatia Gems Catalog",
  description: "Browse certified natural rubies, emeralds, sapphires, pearls, corals, and rare gemstones. Filter by category, price, and availability.",
};

export default function GemstonesPage() {
  return (
    <div className="bg-[#FBF9F4] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 pb-6 border-b border-[#E8E2D6]">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B88E3E]">
            Authentic Inventory
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] mt-1">
            Natural Gemstone Catalog
          </h1>
          <p className="text-sm text-[#57534E] mt-2 max-w-2xl">
            Explore certified natural gemstones with exact carat weights, ratti measurements, cuts, and transparent specifications. Submit an order request for personal consultation.
          </p>
        </div>

        <Suspense fallback={<div className="py-20 text-center text-sm text-[#78716C]">Loading catalog...</div>}>
          <GemstoneCatalogClient />
        </Suspense>
      </div>
    </div>
  );
}
