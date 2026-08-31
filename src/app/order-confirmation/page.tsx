import React, { Suspense } from "react";
import OrderConfirmationClient from "./OrderConfirmationClient";

export const metadata = {
  title: "Order Request Confirmed | Bhatia Gems",
  description: "Thank you for your order request with Bhatia Gems. Our team will contact you shortly to confirm your order and payment arrangements.",
};

export default function OrderConfirmationPage() {
  return (
    <div className="bg-[#FBF9F4] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="py-20 text-center text-sm text-[#78716C]">Loading confirmation details...</div>}>
          <OrderConfirmationClient />
        </Suspense>
      </div>
    </div>
  );
}
