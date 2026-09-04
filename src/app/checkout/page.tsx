"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { OrderCustomerInfo } from "@/types/gemstone";
import { ShieldCheck, ArrowLeft, Send, AlertCircle } from "lucide-react";
import { getImagePath } from "@/utils/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, totalItems, clearCart } = useCart();
  const { createOrderRequest } = useOrders();

  const [formData, setFormData] = useState<OrderCustomerInfo>({
    fullName: "",
    mobileNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderCustomerInfo, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect back to cart
  useEffect(() => {
    if (cart.length === 0 && !isSubmitting) {
      // Allow a brief moment for hydration
      const timeout = setTimeout(() => {
        if (cart.length === 0) {
          router.replace("/cart");
        }
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [cart, isSubmitting, router]);

  const formattedSubtotal = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(subtotal);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof OrderCustomerInfo, string>> = {};

    if (!formData.fullName.trim()) errs.fullName = "Full Name is required";
    if (!formData.mobileNumber.trim()) {
      errs.mobileNumber = "Mobile Number is required";
    } else if (!/^[0-9+ -]{10,14}$/.test(formData.mobileNumber.trim())) {
      errs.mobileNumber = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (!formData.address.trim()) errs.address = "Street address is required";
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.state.trim()) errs.state = "State is required";
    if (!formData.pincode.trim()) {
      errs.pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(formData.pincode.trim())) {
      errs.pincode = "Enter a valid 6-digit Pincode";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const order = await createOrderRequest(formData, cart, subtotal);
      clearCart();
      router.push(`/order-confirmation?orderId=${encodeURIComponent(order.id)}`);
    } catch (err) {
      console.error("Order submission failed:", err);
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof OrderCustomerInfo]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (cart.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-sm text-[#78716C]">Loading checkout...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF9F4] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-[#E8E2D6]">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs text-[#78716C] hover:text-[#1C1917] mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Shopping Cart</span>
          </Link>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B88E3E] block">
            Direct Order Submission
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] mt-1">
            Order Request Details
          </h1>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1">
            Submit your shipping details. No upfront payment is processed online.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Customer Details Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-[#E8E2D6] p-6 sm:p-8 subtle-shadow space-y-6">
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                  Customer & Shipping Address
                </h2>
                <p className="text-xs text-[#78716C] mt-1">
                  Required details for gemstone dispatch coordination and invoice preparation.
                </p>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Rajesh Sharma"
                    className={`w-full px-3.5 py-2.5 bg-[#FBF9F4] border rounded text-sm text-[#1C1917] focus:outline-none focus:bg-white transition-colors ${
                      errors.fullName
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-[#E8E2D6] focus:border-[#B88E3E]"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Mobile & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-1.5">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-3.5 py-2.5 bg-[#FBF9F4] border rounded text-sm text-[#1C1917] focus:outline-none focus:bg-white transition-colors ${
                        errors.mobileNumber
                          ? "border-red-500 ring-1 ring-red-500"
                          : "border-[#E8E2D6] focus:border-[#B88E3E]"
                      }`}
                    />
                    {errors.mobileNumber && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.mobileNumber}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rajesh@example.com"
                      className={`w-full px-3.5 py-2.5 bg-[#FBF9F4] border rounded text-sm text-[#1C1917] focus:outline-none focus:bg-white transition-colors ${
                        errors.email
                          ? "border-red-500 ring-1 ring-red-500"
                          : "border-[#E8E2D6] focus:border-[#B88E3E]"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-1.5">
                    Complete Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House/Flat No, Apartment, Street, Landmark"
                    className={`w-full px-3.5 py-2.5 bg-[#FBF9F4] border rounded text-sm text-[#1C1917] focus:outline-none focus:bg-white transition-colors ${
                      errors.address
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-[#E8E2D6] focus:border-[#B88E3E]"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.address}</span>
                    </p>
                  )}
                </div>

                {/* City, State, Pincode */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-1.5">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Jaipur"
                      className={`w-full px-3.5 py-2.5 bg-[#FBF9F4] border rounded text-sm text-[#1C1917] focus:outline-none focus:bg-white transition-colors ${
                        errors.city
                          ? "border-red-500 ring-1 ring-red-500"
                          : "border-[#E8E2D6] focus:border-[#B88E3E]"
                      }`}
                    />
                    {errors.city && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.city}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-1.5">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="e.g. Rajasthan"
                      className={`w-full px-3.5 py-2.5 bg-[#FBF9F4] border rounded text-sm text-[#1C1917] focus:outline-none focus:bg-white transition-colors ${
                        errors.state
                          ? "border-red-500 ring-1 ring-red-500"
                          : "border-[#E8E2D6] focus:border-[#B88E3E]"
                      }`}
                    />
                    {errors.state && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.state}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-1.5">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="e.g. 302001"
                      className={`w-full px-3.5 py-2.5 bg-[#FBF9F4] border rounded text-sm text-[#1C1917] focus:outline-none focus:bg-white transition-colors ${
                        errors.pincode
                          ? "border-red-500 ring-1 ring-red-500"
                          : "border-[#E8E2D6] focus:border-[#B88E3E]"
                      }`}
                    />
                    {errors.pincode && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.pincode}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional Message (Optional) */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2825] mb-1.5">
                    Additional Message / Astrological Preferences (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide any specific requests such as ring/pendant mounting consultation, preferred consultation hours, or certification queries..."
                    className="w-full px-3.5 py-2.5 bg-[#FBF9F4] border border-[#E8E2D6] rounded text-sm text-[#1C1917] focus:outline-none focus:bg-white focus:border-[#B88E3E] transition-colors"
                  />
                </div>
              </div>

              {/* Explicit Phase 1 Notice as mandated by instructions */}
              <div className="p-4 bg-[#F4EFE6] border border-[#B88E3E]/30 rounded-md text-xs text-[#2C2825] space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
                  <ShieldCheck className="w-4 h-4 text-[#B88E3E]" />
                  <span>Important Payment Notice</span>
                </div>
                <p className="text-sm font-medium text-[#1C1917]">
                  &ldquo;Payment will be arranged with Bhatia Gems after your order is confirmed.&rdquo;
                </p>
                <p className="text-[#57534E] text-[11px] leading-relaxed">
                  We will contact you via WhatsApp and phone to confirm availability, provide high-resolution certification scans, and share official bank settlement details.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-md bg-[#1C1917] hover:bg-[#B88E3E] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Submitting Order Request..." : "Place Order Request"}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg border border-[#E8E2D6] p-6 subtle-shadow sticky top-28 space-y-5">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917] pb-3 border-b border-[#F4EFE6]">
                Order Items ({totalItems})
              </h2>

              {/* Itemized List */}
              <div className="divide-y divide-[#F4EFE6] max-h-80 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const itemTotal = item.gemstone.price * item.quantity;
                  const formattedItemTotal = item.gemstone.price && item.gemstone.price > 0
                    ? new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(itemTotal)
                    : "Price on Enquiry";

                  return (
                    <div key={item.gemstone.id} className="py-3 flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded overflow-hidden bg-[#F4EFE6] shrink-0 border border-[#E8E2D6]">
                        <Image
                          src={getImagePath(item.gemstone.images[0])}
                          alt={item.gemstone.name}
                          fill
                          sizes="48px"
                          loading="lazy"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-serif font-semibold text-[#1C1917] truncate">
                          {item.gemstone.name}
                        </p>
                        <p className="text-[11px] text-[#78716C]">
                          Qty: {item.quantity} × {item.gemstone.weight}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-[#1C1917]">
                        {formattedItemTotal}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Summary Calculations */}
              <div className="pt-4 border-t border-[#E8E2D6] space-y-2 text-xs">
                <div className="flex justify-between text-[#57534E]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1C1917]">{formattedSubtotal}</span>
                </div>
                <div className="flex justify-between text-[#57534E]">
                  <span>Delivery across India</span>
                  <span className="text-emerald-700 font-medium">To be confirmed</span>
                </div>
                <div className="flex justify-between text-[#57534E]">
                  <span>Payment Method</span>
                  <span className="font-medium text-[#B88E3E]">Offline / Direct Arrangement</span>
                </div>
                <div className="pt-3 border-t border-[#F4EFE6] flex justify-between items-baseline text-sm">
                  <span className="font-semibold text-[#1C1917]">Total Request Value</span>
                  <span className="font-serif text-xl font-bold text-[#1C1917]">
                    {formattedSubtotal}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
