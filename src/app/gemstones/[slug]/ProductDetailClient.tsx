"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gemstone } from "@/types/gemstone";
import { useCart } from "@/context/CartContext";
import { 
  ShoppingBag, 
  MessageCircle, 
  Check, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  Plus,
  Minus
} from "lucide-react";

interface ProductDetailClientProps {
  gemstone: Gemstone;
}

export default function ProductDetailClient({ gemstone }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>(gemstone.images[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(gemstone.price);

  const handleAddToCart = () => {
    addToCart(gemstone, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  // WhatsApp prefilled message as mandated:
  // "Hello Bhatia Gems, I am interested in [PRODUCT NAME]. Please share more details and availability."
  const whatsappMessage = encodeURIComponent(
    `Hello Bhatia Gems, I am interested in ${gemstone.name}. Please share more details and availability.`
  );
  const whatsappUrl = `https://wa.me/919106765594?text=${whatsappMessage}`;

  // Helper for displaying spec or mandatory "Information coming soon"
  const renderSpec = (val: string | undefined | null) => {
    if (!val || val.trim() === "") {
      return (
        <span className="text-[#A8A29E] italic text-xs">
          Information coming soon
        </span>
      );
    }
    return <span className="text-[#1C1917] font-medium">{val}</span>;
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-[#78716C] flex-wrap">
        <Link href="/" className="hover:text-[#B88E3E] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-[#A8A29E]" />
        <Link href="/gemstones" className="hover:text-[#B88E3E] transition-colors">
          Gemstones
        </Link>
        <ChevronRight className="w-3 h-3 text-[#A8A29E]" />
        <Link
          href={`/gemstones?category=${encodeURIComponent(gemstone.category)}`}
          className="hover:text-[#B88E3E] transition-colors"
        >
          {gemstone.category}
        </Link>
        <ChevronRight className="w-3 h-3 text-[#A8A29E]" />
        <span className="text-[#1C1917] font-medium truncate max-w-xs sm:max-w-md">
          {gemstone.name}
        </span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F4EFE6] border border-[#E8E2D6] subtle-shadow">
            <Image
              src={selectedImage}
              alt={gemstone.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center"
            />
            {/* Stock badge */}
            <div className="absolute top-4 left-4">
              {gemstone.availability === "in_stock" ? (
                <span className="inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-white/95 text-[#1C1917] backdrop-blur-sm border border-[#E8E2D6] shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mr-2" />
                  In Stock (Ready to Dispatch)
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-[#2C2825]/90 text-white backdrop-blur-sm shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mr-2" />
                  Available On Request
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails Gallery */}
          {gemstone.images.length > 1 ? (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {gemstone.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === img
                      ? "border-[#B88E3E] ring-2 ring-[#B88E3E]/20"
                      : "border-[#E8E2D6] opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${gemstone.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-[#78716C] bg-white px-4 py-2.5 rounded-lg border border-[#E8E2D6]">
              <Sparkles className="w-4 h-4 text-[#B88E3E]" />
              <span>High-resolution macroscopic studio photography. Highlighting authentic facet cuts and natural inclusions.</span>
            </div>
          )}
        </div>

        {/* Right Column: Specifications & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#B88E3E] mb-2">
              <span>{gemstone.category}</span>
              {gemstone.hindiName && (
                <>
                  <span>•</span>
                  <span>{gemstone.hindiName}</span>
                </>
              )}
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#1C1917] leading-tight">
              {gemstone.name}
            </h1>
          </div>

          {/* Pricing & Order Info */}
          <div className="p-4 bg-white rounded-lg border border-[#E8E2D6] subtle-shadow space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-wider text-[#78716C]">
                Listing Price
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                {formattedPrice}
              </span>
            </div>
            <p className="text-[11px] text-[#57534E]">
              Includes individual protective packaging & gemstone identification credentials. Delivery coordinated directly across India.
            </p>
          </div>

          {/* Quantity and Primary CTAs */}
          <div className="space-y-3 pt-2">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                Quantity
              </span>
              <div className="flex items-center border border-[#E8E2D6] rounded bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F4EFE6] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-1 text-sm font-semibold text-[#1C1917]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F4EFE6] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-3.5 px-6 rounded-md font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                  isAdded
                    ? "bg-emerald-700 text-white"
                    : "bg-[#1C1917] text-white hover:bg-[#B88E3E]"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-md font-semibold text-sm border border-[#25D366] text-[#1C1917] bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>

            <p className="text-[11px] text-[#78716C] text-center italic">
              No online payment required. Orders submit an enquiry request directly to Bhatia Gems.
            </p>
          </div>

          {/* Description */}
          <div className="pt-4 border-t border-[#E8E2D6]">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917] mb-2">
              Description & Character
            </h3>
            <p className="text-sm text-[#57534E] leading-relaxed">
              {gemstone.description}
            </p>
          </div>

          {/* Comprehensive Specifications Table */}
          <div className="pt-4 border-t border-[#E8E2D6]">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917] mb-3">
              Gemstone Specifications
            </h3>
            <div className="bg-white rounded-lg border border-[#E8E2D6] overflow-hidden text-sm divide-y divide-[#F4EFE6]">
              <div className="grid grid-cols-2 p-3">
                <span className="text-xs text-[#78716C] uppercase tracking-wider">Weight</span>
                <span className="text-xs font-semibold text-[#1C1917]">{gemstone.weight}</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-xs text-[#78716C] uppercase tracking-wider">Dimensions</span>
                <span className="text-xs">{renderSpec(gemstone.dimensions)}</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-xs text-[#78716C] uppercase tracking-wider">Shape / Cut</span>
                <span className="text-xs">{renderSpec(gemstone.shapeCut)}</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-xs text-[#78716C] uppercase tracking-wider">Color</span>
                <span className="text-xs">{renderSpec(gemstone.color)}</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-xs text-[#78716C] uppercase tracking-wider">Origin</span>
                <span className="text-xs">{renderSpec(gemstone.origin)}</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-xs text-[#78716C] uppercase tracking-wider">Treatment</span>
                <span className="text-xs">{renderSpec(gemstone.treatment)}</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-xs text-[#78716C] uppercase tracking-wider">Certification</span>
                <span className="text-xs">{renderSpec(gemstone.certification)}</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-xs text-[#78716C] uppercase tracking-wider">Availability</span>
                <span className="text-xs font-medium capitalize">
                  {gemstone.availability === "in_stock" ? "In Stock" : "On Request"}
                </span>
              </div>
            </div>
          </div>

          {/* Reassurance points */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-white rounded border border-[#E8E2D6] flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#B88E3E] shrink-0 mt-0.5" />
              <div className="text-xs text-[#57534E]">
                <p className="font-semibold text-[#1C1917]">Lab Tested</p>
                <p className="text-[11px]">Reports shared before dispatch</p>
              </div>
            </div>
            <div className="p-3 bg-white rounded border border-[#E8E2D6] flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-[#B88E3E] shrink-0 mt-0.5" />
              <div className="text-xs text-[#57534E]">
                <p className="font-semibold text-[#1C1917]">Secure Transit</p>
                <p className="text-[11px]">Coordinated directly across India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
