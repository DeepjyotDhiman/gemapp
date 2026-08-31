import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhatia Gems | Natural Certified Gemstones",
  description: "Natural Gemstones, Chosen With Trust. Explore certified Rubies, Emeralds, Sapphires, Pearls, and fine gemstones with direct order requests and WhatsApp enquiries.",
  keywords: ["gemstones", "natural gems", "Bhatia Gems", "Panna", "Neelam", "Pukhraj", "Manik", "certified gemstones India"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#FBF9F4] text-[#1C1917]">
        <CartProvider>
          <OrderProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </OrderProvider>
        </CartProvider>
      </body>
    </html>
  );
}
