import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductList = dynamic(() => import("@/components/ProductList"), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {[...Array(10)].map((_, i) => (
        <Skeleton key={i} className="h-[300px] w-full" />
      ))}
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Products - VertexBazar",
  description: "Browse our collection of digital gaming products, game cards, and top-ups. Find the best deals and instant delivery options.",
  keywords: "game cards, top-up, digital games, gaming products, instant delivery",
  openGraph: {
    title: "Gaming Products - VertexBazar",
    description: "Discover our wide range of digital gaming products",
    type: "website",
  },
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">All Products</h1>
        <Suspense fallback={<ProductList.loading />}>
          <ProductList />
        </Suspense>
      </div>
    </div>
  );
}