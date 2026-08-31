"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SAMPLE_GEMSTONES, CATEGORIES } from "@/data/gemstones";
import { Gemstone, GemstoneCategory } from "@/types/gemstone";
import GemstoneCard from "@/components/ui/GemstoneCard";
import { Search, Filter, X, SlidersHorizontal, RotateCcw } from "lucide-react";

export default function GemstoneCatalogClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if query params change
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under ₹40,000", value: "under-40k", min: 0, max: 40000 },
    { label: "₹40,000 - ₹80,000", value: "40k-80k", min: 40000, max: 80000 },
    { label: "₹80,000 - ₹1,20,000", value: "80k-120k", min: 80000, max: 120000 },
    { label: "Above ₹1,20,000", value: "above-120k", min: 120000, max: Infinity },
  ];

  // Filtering logic
  const filteredGemstones = useMemo(() => {
    return SAMPLE_GEMSTONES.filter((gem) => {
      // 1. Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = gem.name.toLowerCase().includes(q);
        const matchCat = gem.category.toLowerCase().includes(q);
        const matchHindi = gem.hindiName?.toLowerCase().includes(q);
        const matchOrigin = gem.origin?.toLowerCase().includes(q);
        const matchCut = gem.shapeCut.toLowerCase().includes(q);
        if (!matchName && !matchCat && !matchHindi && !matchOrigin && !matchCut) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== "all") {
        if (gem.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // 3. Availability filter
      if (selectedAvailability !== "all") {
        if (gem.availability !== selectedAvailability) {
          return false;
        }
      }

      // 4. Price filter
      if (selectedPriceRange !== "all") {
        const range = priceRanges.find((r) => r.value === selectedPriceRange);
        if (range && range.min !== undefined && range.max !== undefined) {
          if (gem.price < range.min || gem.price > range.max) {
            return false;
          }
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedPriceRange, selectedAvailability]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedPriceRange("all");
    setSelectedAvailability("all");
    router.replace("/gemstones");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    searchQuery.trim() !== "" ||
    selectedPriceRange !== "all" ||
    selectedAvailability !== "all";

  return (
    <div>
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, category, or Hindi term (Panna, Neelam)..."
            className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#E8E2D6] rounded-md text-sm text-[#1C1917] placeholder-[#78716C] focus:outline-none focus:border-[#B88E3E]"
          />
          <Search className="w-4 h-4 text-[#78716C] absolute left-3.5 top-3" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-3 text-[#78716C] hover:text-[#1C1917]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Filter Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-[#E8E2D6] rounded-md text-sm font-medium text-[#1C1917]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#B88E3E]" />
            <span>Filters {hasActiveFilters && "(Active)"}</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="p-2.5 bg-white border border-[#E8E2D6] rounded-md text-[#78716C] hover:text-[#1C1917]"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Desktop Quick Availability Filters */}
        <div className="hidden md:flex items-center space-x-3">
          <span className="text-xs text-[#78716C] uppercase tracking-wider font-semibold">
            Status:
          </span>
          <div className="inline-flex rounded-md p-1 bg-white border border-[#E8E2D6]">
            {[
              { id: "all", label: "All" },
              { id: "in_stock", label: "In Stock" },
              { id: "on_request", label: "On Request" },
            ].map((status) => (
              <button
                key={status.id}
                onClick={() => setSelectedAvailability(status.id)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  selectedAvailability === status.id
                    ? "bg-[#1C1917] text-white"
                    : "text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs text-[#B88E3E] hover:underline font-medium ml-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Filter Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          {/* Category Filter */}
          <div className="bg-white p-5 rounded-lg border border-[#E8E2D6] subtle-shadow">
            <h3 className="font-serif text-base font-semibold text-[#1C1917] mb-3 pb-2 border-b border-[#F4EFE6]">
              Gemstone Category
            </h3>
            <div className="space-y-1.5">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-between ${
                  selectedCategory === "all"
                    ? "bg-[#F4EFE6] text-[#B88E3E] font-semibold"
                    : "text-[#57534E] hover:bg-[#FBF9F4]"
                }`}
              >
                <span>All Gemstones</span>
                <span className="text-[11px] text-[#78716C]">{SAMPLE_GEMSTONES.length}</span>
              </button>

              {CATEGORIES.map((cat) => {
                const count = SAMPLE_GEMSTONES.filter(
                  (g) => g.category.toLowerCase() === cat.id.toLowerCase()
                ).length;
                const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-between ${
                      isSelected
                        ? "bg-[#F4EFE6] text-[#B88E3E] font-semibold"
                        : "text-[#57534E] hover:bg-[#FBF9F4]"
                    }`}
                  >
                    <span>
                      {cat.name} <span className="text-[#78716C]">({cat.hindiName})</span>
                    </span>
                    <span className="text-[11px] text-[#78716C]">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="bg-white p-5 rounded-lg border border-[#E8E2D6] subtle-shadow">
            <h3 className="font-serif text-base font-semibold text-[#1C1917] mb-3 pb-2 border-b border-[#F4EFE6]">
              Price Range
            </h3>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label
                  key={range.value}
                  className="flex items-center gap-2.5 text-xs text-[#57534E] cursor-pointer hover:text-[#1C1917]"
                >
                  <input
                    type="radio"
                    name="desktop-price"
                    checked={selectedPriceRange === range.value}
                    onChange={() => setSelectedPriceRange(range.value)}
                    className="accent-[#B88E3E] w-3.5 h-3.5"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability Status Filter */}
          <div className="bg-white p-5 rounded-lg border border-[#E8E2D6] subtle-shadow">
            <h3 className="font-serif text-base font-semibold text-[#1C1917] mb-3 pb-2 border-b border-[#F4EFE6]">
              Availability
            </h3>
            <div className="space-y-2">
              {[
                { value: "all", label: "All Items" },
                { value: "in_stock", label: "Ready to Ship (In Stock)" },
                { value: "on_request", label: "On Request (Reserve Viewing)" },
              ].map((item) => (
                <label
                  key={item.value}
                  className="flex items-center gap-2.5 text-xs text-[#57534E] cursor-pointer hover:text-[#1C1917]"
                >
                  <input
                    type="radio"
                    name="desktop-availability"
                    checked={selectedAvailability === item.value}
                    onChange={() => setSelectedAvailability(item.value)}
                    className="accent-[#B88E3E] w-3.5 h-3.5"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="lg:hidden col-span-1 bg-white p-5 rounded-lg border border-[#E8E2D6] space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D6]">
              <span className="font-serif font-semibold text-[#1C1917]">Filters</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-[#78716C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div>
              <p className="text-xs font-semibold text-[#1C1917] mb-2 uppercase tracking-wider">
                Category
              </p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 py-1 rounded text-xs ${
                    selectedCategory === "all"
                      ? "bg-[#1C1917] text-white"
                      : "bg-[#FBF9F4] text-[#57534E] border border-[#E8E2D6]"
                  }`}
                >
                  All
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3 py-1 rounded text-xs ${
                      selectedCategory.toLowerCase() === c.id.toLowerCase()
                        ? "bg-[#1C1917] text-white"
                        : "bg-[#FBF9F4] text-[#57534E] border border-[#E8E2D6]"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="text-xs font-semibold text-[#1C1917] mb-2 uppercase tracking-wider">
                Price
              </p>
              <div className="space-y-1.5">
                {priceRanges.map((range) => (
                  <label
                    key={range.value}
                    className="flex items-center gap-2 text-xs text-[#57534E]"
                  >
                    <input
                      type="radio"
                      name="mobile-price"
                      checked={selectedPriceRange === range.value}
                      onChange={() => setSelectedPriceRange(range.value)}
                      className="accent-[#B88E3E]"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <p className="text-xs font-semibold text-[#1C1917] mb-2 uppercase tracking-wider">
                Status
              </p>
              <div className="flex gap-2">
                {["all", "in_stock", "on_request"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedAvailability(s)}
                    className={`px-3 py-1 rounded text-xs capitalize ${
                      selectedAvailability === s
                        ? "bg-[#1C1917] text-white"
                        : "bg-[#FBF9F4] text-[#57534E] border border-[#E8E2D6]"
                    }`}
                  >
                    {s.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8E2D6] flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-2 text-xs font-medium border border-[#E8E2D6] rounded text-[#57534E]"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2 text-xs font-semibold bg-[#1C1917] text-white rounded"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Right Product Grid */}
        <main className="lg:col-span-9">
          {/* Header count indicator */}
          <div className="flex items-center justify-between mb-4 pb-2 text-xs text-[#78716C]">
            <span>
              Showing <strong className="text-[#1C1917]">{filteredGemstones.length}</strong> gemstones
              {selectedCategory !== "all" && ` in ${selectedCategory}`}
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[#B88E3E] hover:underline font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>

          {filteredGemstones.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGemstones.map((gemstone) => (
                <GemstoneCard key={gemstone.id} gemstone={gemstone} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-[#E8E2D6] p-8">
              <div className="w-12 h-12 rounded-full bg-[#F4EFE6] text-[#B88E3E] flex items-center justify-center mx-auto mb-4 font-serif text-xl">
                ✦
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1C1917] mb-2">
                No matching gemstones found
              </h3>
              <p className="text-xs sm:text-sm text-[#57534E] max-w-md mx-auto mb-6">
                We couldn&apos;t find any gemstones matching your current filter criteria. You can reset filters or contact us directly on WhatsApp to inquire about unlisted inventory.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-[#1C1917] text-white text-xs font-semibold rounded hover:bg-[#B88E3E] transition-colors"
                >
                  Reset All Filters
                </button>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Bhati%20Gems,%20I%20am%20looking%20for%20a%20specific%20gemstone%20not%20found%20in%20catalog."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#25D366] text-white text-xs font-semibold rounded hover:bg-[#1EBE5D] transition-colors"
                >
                  WhatsApp Inquiries
                </a>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
