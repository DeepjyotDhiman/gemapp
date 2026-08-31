"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useOrders } from "@/context/OrderContext";
import { CheckCircle2, MessageCircle, ArrowRight, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function OrderConfirmationClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { getOrderById, recentOrder } = useOrders();

  const order = (orderId ? getOrderById(orderId) : null) || recentOrder;

  const displayOrderId = order?.id || orderId || "BG-2026-PENDING";

  const formattedTotal = order
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(order.totalAmount)
    : "";

  const whatsappMessage = encodeURIComponent(
    `Hello Bhatia Gems, I have submitted order request ${displayOrderId}${
      order?.customer?.fullName ? ` under the name ${order.customer.fullName}` : ""
    }. Please confirm my order and share payment details.`
  );
  const whatsappUrl = `https://wa.me/919106765594?text=${whatsappMessage}`;

  return (
    <div className="space-y-8">
      {/* Top Banner Box */}
      <div className="bg-white rounded-xl border border-[#E8E2D6] p-8 sm:p-12 text-center subtle-shadow space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#F4EFE6] text-[#B88E3E] flex items-center justify-center mx-auto mb-2">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B88E3E] block">
          Order Request Received
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1917]">
          Thank you for your order request.
        </h1>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FBF9F4] rounded-full border border-[#E8E2D6] text-xs font-mono text-[#1C1917] mt-1">
          <span className="text-[#78716C]">Order Reference:</span>
          <span className="font-bold text-[#B88E3E]">{displayOrderId}</span>
        </div>

        {/* Mandatory Message from Prompt */}
        <div className="p-4 max-w-xl mx-auto bg-[#F4EFE6] rounded-lg border border-[#B88E3E]/30 text-sm text-[#1C1917] font-medium leading-relaxed mt-4">
          &ldquo;Our team will contact you shortly to confirm your order and payment arrangements.&rdquo;
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/gemstones"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#1C1917] text-white text-sm font-semibold hover:bg-[#B88E3E] transition-all shadow-sm"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-semibold transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-white text-transparent" />
            <span>WhatsApp Bhatia Gems</span>
          </a>
        </div>
      </div>

      {/* Order Summary & Customer Info */}
      {order && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Customer & Shipping Summary */}
          <div className="md:col-span-5 bg-white rounded-lg border border-[#E8E2D6] p-6 subtle-shadow space-y-4">
            <h2 className="font-serif text-lg font-semibold text-[#1C1917] pb-2 border-b border-[#F4EFE6]">
              Customer Information
            </h2>
            <div className="space-y-3 text-xs text-[#57534E]">
              <div>
                <span className="text-[#78716C] block uppercase tracking-wider text-[10px]">
                  Customer Name
                </span>
                <span className="font-semibold text-sm text-[#1C1917]">
                  {order.customer.fullName}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B88E3E]" />
                <span>{order.customer.mobileNumber}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B88E3E]" />
                <span>{order.customer.email}</span>
              </div>

              <div className="flex items-start gap-2 pt-1 border-t border-[#F4EFE6]">
                <MapPin className="w-3.5 h-3.5 text-[#B88E3E] shrink-0 mt-0.5" />
                <span>
                  {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
                </span>
              </div>

              {order.customer.message && (
                <div className="pt-2 border-t border-[#F4EFE6]">
                  <span className="text-[#78716C] block uppercase tracking-wider text-[10px]">
                    Customer Note:
                  </span>
                  <p className="italic text-[#1C1917] mt-0.5">&ldquo;{order.customer.message}&rdquo;</p>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-[#F4EFE6] flex items-center gap-2 text-[11px] text-[#78716C]">
              <Clock className="w-3.5 h-3.5 text-[#B88E3E]" />
              <span>Requested on {new Date(order.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}</span>
            </div>
          </div>

          {/* Ordered Products Table */}
          <div className="md:col-span-7 bg-white rounded-lg border border-[#E8E2D6] p-6 subtle-shadow space-y-4">
            <h2 className="font-serif text-lg font-semibold text-[#1C1917] pb-2 border-b border-[#F4EFE6]">
              Ordered Gemstones
            </h2>

            <div className="divide-y divide-[#F4EFE6]">
              {order.items.map((item) => {
                const itemTotal = item.gemstone.price * item.quantity;
                const formattedItemTotal = new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(itemTotal);

                return (
                  <div key={item.gemstone.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded overflow-hidden bg-[#F4EFE6] shrink-0 border border-[#E8E2D6]">
                        <Image
                          src={item.gemstone.images[0]}
                          alt={item.gemstone.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-serif font-semibold text-[#1C1917]">
                          {item.gemstone.name}
                        </p>
                        <p className="text-[11px] text-[#78716C]">
                          Qty: {item.quantity} • {item.gemstone.weight}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#1C1917] shrink-0">
                      {formattedItemTotal}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#E8E2D6] flex justify-between items-baseline">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#78716C] block">
                  Total Value
                </span>
                <span className="text-[11px] text-stone-400">Payment to be settled directly</span>
              </div>
              <span className="font-serif text-2xl font-bold text-[#1C1917]">
                {formattedTotal}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
