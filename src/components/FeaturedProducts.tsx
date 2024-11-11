"use client";

import React, { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';
import { IProduct, ProductPopularity } from '@/types/product';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?popularity=${ProductPopularity.POPULAR}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.slice(0, 5)); // Show only first 5 featured products
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return <ProductGrid products={products} isLoading={isLoading} />;
};

export default FeaturedProducts;