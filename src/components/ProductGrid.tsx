'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { IProduct } from '@/types/product';
import ProductImage from './ProductImage';

interface ProductGridProps {
  products: IProduct[];
  isLoading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-[300px] w-full" />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return <div className="text-center text-gray-400">No products found</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <Link key={product._id} href={`/products/${product._id}`}>
          <Card className="h-full bg-gray-800 border-gray-700 hover:border-gray-600 transition-all hover:shadow-lg">
            <CardContent className="p-3">
              {product.imageUrl ? (
                <ProductImage
                  src={product.imageUrl}
                  alt={product.title}
                  className="mb-2"
                />
              ) : (
                <div className="aspect-square mb-2 bg-gray-700 flex items-center justify-center rounded-lg">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-white line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-xs text-gray-400">{product.region}</p>
                {product.subProducts && product.subProducts.length > 0 && (
                  <p className="text-sm text-green-400">
                    From ৳{Math.min(...product.subProducts.map(sp => sp.price))}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;