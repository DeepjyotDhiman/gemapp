"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { SAMPLE_RUDRAKSHA, RUDRAKSHA_CATEGORIES } from "@/data/rudraksha";
import { useCart } from "@/context/CartContext";
import { Search, X, MessageCircle, ShoppingBag, Check, SlidersHorizontal, RotateCcw } from "lucide-react";
import { getImagePath } from "@/utils/image";

export default function RudrakshaCatalogClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const initialCat = searchParams.get("category") || "all";
  const initialQuery = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    const search = searchParams.get("search");
    if (search) setSearchQuery(search);
  }, [searchParams]);

  const filteredItems = useMemo(() => {
    return SAMPLE_RUDRAKSHA.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        const matchesHindi = item.hindiName?.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesHindi) return false;
      }
      if (selectedCategory !== "all" && item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = (item: any, e: React.MouseEvent) => {
    e.preventDefault();
    // Wrap Rudraksha item into Gemstone cart item schema
    const gemstoneItem = {
      id: item.id,
      slug: item.slug,
      name: item.name,
      category: item.category as any,
      hindiName: item.hindiName,
      price: item.price || 0,
      weight: item.weight || "Standard Specimen",
      availability: item.availability,
      images: item.images,
      shapeCut: "Natural Bead",
      color: "Natural Brown Tone",
      description: item.description,
    };
    addToCart(gemstoneItem as any, 1);
    setAddedMap((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    router.replace("/rudraksha");
  };

  return (
    <div className="bg-[#FBF9F4] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 pb-6 border-b border-[#E8E2D6]">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B88E3E]">
            Sacred Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] mt-1">
            Authentic Rudraksha Catalog
          </h1>
          <p className="text-sm text-[#57534E] mt-2 max-w-2xl">
            Explore 1 to 14 Mukhi Rudraksha beads, Rosary Malas, Bracelets, and traditional accessories. Submit an order request or WhatsApp inquiry for personal assistance.
          </p>
        </div>

        {/* Search & Mobile Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Mukhi (e.g., 5 Mukhi, Mala, Bracelet)..."
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

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-[#E8E2D6] rounded-md text-sm font-medium text-[#1C1917]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#B88E3E]" />
              <span>Category Filter</span>
            </button>
          </div>
        </div>

        {/* Catalog Grid with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white p-5 rounded-lg border border-[#E8E2D6] subtle-shadow">
              <h3 className="font-serif text-base font-semibold text-[#1C1917] mb-3 pb-2 border-b border-[#F4EFE6]">
                Rudraksha Type
              </h3>
              <div className="space-y-1 max-h-96 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === "all"
                      ? "bg-[#F4EFE6] text-[#B88E3E] font-semibold"
                      : "text-[#57534E] hover:bg-[#FBF9F4]"
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[11px] text-[#78716C]">{SAMPLE_RUDRAKSHA.length}</span>
                </button>

                {RUDRAKSHA_CATEGORIES.map((cat) => {
                  const count = SAMPLE_RUDRAKSHA.filter(
                    (r) => r.category.toLowerCase() === cat.toLowerCase()
                  ).length;
                  const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-between ${
                        isActive
                          ? "bg-[#F4EFE6] text-[#B88E3E] font-semibold"
                          : "text-[#57534E] hover:bg-[#FBF9F4]"
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="text-[11px] text-[#78716C]">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Product Grid */}
          <main className="lg:col-span-9">
            <div className="flex items-center justify-between mb-4 pb-2 text-xs text-[#78716C]">
              <span>
                Showing <strong className="text-[#1C1917]">{filteredItems.length}</strong> items
              </span>
              {(selectedCategory !== "all" || searchQuery.trim() !== "") && (
                <button
                  onClick={resetFilters}
                  className="text-[#B88E3E] hover:underline font-medium flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => {
                  const isAdded = addedMap[item.id];
                  const whatsappMsg = encodeURIComponent(
                    `Hello Bhatia Gems, I would like to enquire about ${item.name}.`
                  );
                  const whatsappUrl = `https://wa.me/919106765594?text=${whatsappMsg}`;

                  return (
                    <div
                      key={item.id}
                      className="group bg-white rounded-lg border border-[#E8E2D6] overflow-hidden flex flex-col subtle-shadow subtle-shadow-hover transition-all duration-300"
                    >
                      {/* Image Container */}
                      <div className="relative aspect-square overflow-hidden bg-[#F4EFE6] block">
                        <Image
                          src={getImagePath(item.images[0])}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="lazy"
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold bg-white/90 text-[#57534E] backdrop-blur-sm">
                            {item.category}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          {item.availability === "in_stock" ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-white/95 text-[#1C1917] backdrop-blur-sm border border-[#E8E2D6] shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1" />
                              In Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#2C2825]/90 text-white backdrop-blur-sm shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1" />
                              On Request
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-white space-y-3">
                        <div>
                          <h3 className="font-serif text-lg font-semibold text-[#1C1917] group-hover:text-[#B88E3E] transition-colors">
                            {item.name}
                          </h3>
                          {item.hindiName && (
                            <p className="text-xs text-[#B88E3E] font-medium mt-0.5">
                              {item.hindiName}
                            </p>
                          )}
                          <p className="text-xs text-[#57534E] mt-2 leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        {/* Price & Actions */}
                        <div className="pt-3 border-t border-[#F4EFE6] space-y-2.5">
                          <div className="flex items-baseline justify-between">
                            <span className="text-xs text-[#78716C] uppercase tracking-wider">Price</span>
                            {item.price && item.price > 0 ? (
                              <span className="font-serif text-lg font-bold text-[#1C1917]">
                                ₹{item.price.toLocaleString("en-IN")}
                              </span>
                            ) : (
                              <span className="text-xs font-semibold text-[#B88E3E] bg-[#F4EFE6] px-2.5 py-0.5 rounded">
                                Price on enquiry
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={(e) => handleAddToCart(item, e)}
                              className={`inline-flex items-center justify-center gap-1 py-2 px-2.5 text-xs font-medium rounded transition-all ${
                                isAdded
                                  ? "bg-emerald-700 text-white"
                                  : "bg-[#1C1917] text-white hover:bg-[#B88E3E]"
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Added</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingBag className="w-3.5 h-3.5" />
                                  <span>Add to Cart</span>
                                </>
                              )}
                            </button>

                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1 py-2 px-2.5 text-xs font-medium rounded border border-[#25D366] text-[#1C1917] bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                              <span>Enquire</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg border border-[#E8E2D6] p-8">
                <h3 className="font-serif text-xl font-medium text-[#1C1917] mb-2">
                  No matching Rudraksha items found
                </h3>
                <p className="text-xs text-[#57534E] max-w-md mx-auto mb-4">
                  Try adjusting your search query or selecting all categories.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2 bg-[#1C1917] text-white text-xs font-semibold rounded hover:bg-[#B88E3E] transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
