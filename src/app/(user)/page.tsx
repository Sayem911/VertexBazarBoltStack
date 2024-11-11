import { Metadata } from "next";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import client components with SSR disabled
const FeaturedProducts = dynamic(() => import('@/components/FeaturedProducts'), {
  ssr: false,
  loading: () => <ProductSkeleton />
});

const PopularProducts = dynamic(() => import('@/components/PopularProducts'), {
  ssr: false,
  loading: () => <ProductSkeleton />
});

const ProductSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {[...Array(5)].map((_, i) => (
      <Skeleton key={i} className="h-[300px] w-full" />
    ))}
  </div>
);

export const metadata: Metadata = {
  title: "VertexBazar - Your Digital Gaming Marketplace",
  description: "Discover and purchase digital gaming products, game cards, and top-ups at the best prices. Instant delivery and secure transactions.",
  keywords: "digital games, game cards, top-up, gaming marketplace, instant delivery",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
            Welcome to VertexBazar
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your trusted destination for digital gaming products, game cards, and instant top-ups
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Featured Products</h2>
          <Suspense fallback={<ProductSkeleton />}>
            <FeaturedProducts />
          </Suspense>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Popular Game Cards</h2>
          <Suspense fallback={<ProductSkeleton />}>
            <PopularProducts category="GAME_CARD" />
          </Suspense>
        </div>
      </section>

      {/* Top-Up Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Game Top-Ups</h2>
          <Suspense fallback={<ProductSkeleton />}>
            <PopularProducts category="GAME_TOP_UP" />
          </Suspense>
        </div>
      </section>
    </div>
  );
}