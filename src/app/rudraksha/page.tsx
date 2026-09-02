import React, { Suspense } from "react";
import RudrakshaCatalogClient from "./RudrakshaCatalogClient";

export const metadata = {
  title: "Authentic Rudraksha Collection | Bhatia Gems",
  description:
    "Explore authentic 1 to 14 Mukhi Rudraksha beads, Rudraksha Malas, Bracelets, and traditional sacred accessories with transparent specifications.",
};

export default function RudrakshaPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#FBF9F4] min-h-screen py-20 text-center text-sm text-[#78716C]">
          Loading Rudraksha catalog...
        </div>
      }
    >
      <RudrakshaCatalogClient />
    </Suspense>
  );
}
