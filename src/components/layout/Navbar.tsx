"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Search, MessageCircle, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Gemstones", href: "/gemstones" },
    { name: "About", href: "/about" },
    { name: "Certification", href: "/certification" },
    { name: "Contact", href: "/contact" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/gemstones?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FBF9F4]/95 backdrop-blur-md border-b border-[#E8E2D6] transition-all">
      {/* Top micro banner */}
      <div className="bg-[#1C1917] text-[#FAF7F2] text-xs py-1.5 px-4 text-center tracking-wider font-medium">
        <span>Delivery Across India • All Gemstones Individually Inspected • Enquire via WhatsApp</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full border border-[#B88E3E] flex items-center justify-center bg-[#F4EFE6] text-[#B88E3E] font-serif text-sm font-semibold group-hover:scale-105 transition-transform">
              ✦
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-[#1C1917]">
                BHATIA GEMS
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#57534E] -mt-1 font-sans uppercase">
                Fine Natural Stones
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm tracking-wide font-medium transition-colors hover:text-[#B88E3E] relative py-1 ${
                    isActive ? "text-[#B88E3E]" : "text-[#2C2825]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B88E3E] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#2C2825] hover:text-[#B88E3E] transition-colors rounded-full hover:bg-[#F4EFE6]/60"
              aria-label="Search gemstones"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* WhatsApp Contact */}
            <a
              href="https://wa.me/919106765594?text=Hello%20Bhatia%20Gems,%20I%20would%20like%20to%20enquire%20about%20your%20natural%20gemstones."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-[#B88E3E]/40 text-[#1C1917] bg-[#F4EFE6]/70 hover:bg-[#B88E3E] hover:text-white transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Icon with Counter */}
            <Link
              href="/cart"
              className="relative p-2 text-[#2C2825] hover:text-[#B88E3E] transition-colors rounded-full hover:bg-[#F4EFE6]/60"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#B88E3E] text-white text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-200">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#2C2825] hover:text-[#B88E3E] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Dropdown Search Bar */}
        {searchOpen && (
          <div className="py-4 border-t border-[#E8E2D6] animate-in fade-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by gemstone name, category (e.g. Ruby, Panna, Sapphire)..."
                className="w-full pl-10 pr-24 py-2.5 bg-white border border-[#E8E2D6] rounded-md text-sm text-[#1C1917] placeholder-[#78716C] focus:outline-none focus:border-[#B88E3E] focus:ring-1 focus:ring-[#B88E3E]"
                autoFocus
              />
              <Search className="w-4 h-4 text-[#78716C] absolute left-3.5" />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-1.5 bg-[#1C1917] text-[#FAF7F2] text-xs font-medium rounded hover:bg-[#B88E3E] transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBF9F4] border-b border-[#E8E2D6] px-4 pt-2 pb-6 space-y-3 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? "bg-[#F4EFE6] text-[#B88E3E]"
                    : "text-[#2C2825] hover:bg-[#F4EFE6]/50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#E8E2D6]">
            <a
              href="https://wa.me/919106765594?text=Hello%20Bhatia%20Gems,%20I%20would%20like%20to%20enquire%20about%20your%20natural%20gemstones."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-md bg-[#F4EFE6] border border-[#B88E3E]/30 text-[#1C1917] font-medium text-sm"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
