import React from "react";
import { notFound } from "next/navigation";
import { getGemstoneBySlug, SAMPLE_GEMSTONES } from "@/data/gemstones";
import ProductDetailClient from "./ProductDetailClient";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SAMPLE_GEMSTONES.map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const gemstone = await getGemstoneBySlug(slug);

  if (!gemstone) {
    return {
      title: "Gemstone Not Found | Bhati Gems",
    };
  }

  return {
    title: `${gemstone.name} (${gemstone.weight}) | Bhati Gems`,
    description: gemstone.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const gemstone = await getGemstoneBySlug(slug);

  if (!gemstone) {
    notFound();
  }

  return (
    <div className="bg-[#FBF9F4] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductDetailClient gemstone={gemstone} />
      </div>
    </div>
  );
}
