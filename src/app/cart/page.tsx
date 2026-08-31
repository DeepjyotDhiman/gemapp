"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

  const formattedSubtotal = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(subtotal);

  if (cart.length === 0) {
    return (
      <div className="bg-[#FBF9F4] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-xl border border-[#E8E2D6] subtle-shadow">
          <div className="w-16 h-16 rounded-full bg-[#F4EFE6] text-[#B88E3E] flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1917] mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#57534E] mb-6">
            You have not selected any gemstones yet. Explore our natural collection of Rubies, Emeralds, Sapphires, and sacred stones.
          </p>
          <Link
            href="/gemstones"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-md bg-[#1C1917] text-white text-sm font-semibold hover:bg-[#B88E3E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Gemstones</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF9F4] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-[#E8E2D6] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B88E3E]">
              Order Selection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] mt-1">
              Shopping Cart
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#57534E]">
            {totalItems} {totalItems === 1 ? "item" : "items"} selected
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-lg border border-[#E8E2D6] divide-y divide-[#F4EFE6] subtle-shadow overflow-hidden">
              {cart.map((item) => {
                const itemTotal = item.gemstone.price * item.quantity;
                const formattedItemPrice = new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(item.gemstone.price);
                const formattedItemTotal = new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(itemTotal);

                return (
                  <div
                    key={item.gemstone.id}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                  >
                    {/* Thumbnail */}
                    <Link
                      href={`/gemstones/${item.gemstone.slug}`}
                      className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden bg-[#F4EFE6] shrink-0 border border-[#E8E2D6]"
                    >
                      <Image
                        src={item.gemstone.images[0]}
                        alt={item.gemstone.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-semibold tracking-wider text-[#B88E3E]">
                          {item.gemstone.category}
                        </span>
                        <span className="text-stone-300">•</span>
                        <span className="text-xs text-[#78716C]">{item.gemstone.weight}</span>
                      </div>

                      <Link href={`/gemstones/${item.gemstone.slug}`}>
                        <h3 className="font-serif text-base sm:text-lg font-medium text-[#1C1917] hover:text-[#B88E3E] transition-colors truncate">
                          {item.gemstone.name}
                        </h3>
                      </Link>

                      <p className="text-xs text-[#57534E]">
                        Unit Price: <span className="font-semibold text-[#1C1917]">{formattedItemPrice}</span>
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                      <div className="flex items-center border border-[#E8E2D6] rounded bg-[#FBF9F4]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.gemstone.id, item.quantity - 1)}
                          className="p-1.5 text-[#57534E] hover:text-[#1C1917] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 text-xs font-semibold text-[#1C1917]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.gemstone.id, item.quantity + 1)}
                          className="p-1.5 text-[#57534E] hover:text-[#1C1917] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-serif text-base font-bold text-[#1C1917]">
                          {formattedItemTotal}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.gemstone.id)}
                          className="inline-flex items-center gap-1 text-[11px] text-red-600 hover:text-red-800 transition-colors mt-0.5"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Return Link */}
            <div className="pt-2">
              <Link
                href="/gemstones"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Shopping for Gemstones</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-lg border border-[#E8E2D6] p-6 subtle-shadow space-y-5">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917] pb-3 border-b border-[#F4EFE6]">
                Order Request Summary
              </h2>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between text-[#57534E]">
                  <span>Items Subtotal ({totalItems})</span>
                  <span className="font-semibold text-[#1C1917]">{formattedSubtotal}</span>
                </div>
                <div className="flex justify-between text-[#57534E]">
                  <span>Shipping Across India</span>
                  <span className="text-emerald-700 font-medium">Arranged after confirmation</span>
                </div>
                <div className="flex justify-between text-[#57534E]">
                  <span>Online Payment Gateway</span>
                  <span className="text-[#B88E3E] font-medium">None (Direct Settlement)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8E2D6] flex justify-between items-baseline">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#78716C] block">
                    Estimated Total
                  </span>
                  <span className="text-[11px] text-[#A8A29E]">(Excludes any optional customized mountings)</span>
                </div>
                <span className="font-serif text-2xl font-bold text-[#1C1917]">
                  {formattedSubtotal}
                </span>
              </div>

              {/* No Payment Reminder */}
              <div className="p-3.5 bg-[#F4EFE6] rounded-md border border-[#B88E3E]/30 text-xs text-[#57534E] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#1C1917]">
                  <ShieldCheck className="w-4 h-4 text-[#B88E3E]" />
                  <span>No payment required now</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Submitting this order sends a formal order request. Our team verifies the stone certificates and contacts you directly for payment and delivery details.
                </p>
              </div>

              {/* Main CTA: Continue to Order */}
              <Link
                href="/checkout"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-md bg-[#1C1917] text-white text-sm font-semibold hover:bg-[#B88E3E] transition-all shadow-sm"
              >
                <span>Continue to Order</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
