"use client";

import React, { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';
import { IProduct, ProductCategory, ProductPopularity } from '@/types/product';

interface PopularProductsProps {
  category: ProductCategory | string;
}

const PopularProducts: React.FC<PopularProductsProps> = ({ category }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `/api/products?category=${category}&popularity=${ProductPopularity.POPULAR}`
        );
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.slice(0, 5)); // Show only first 5 popular products
      } catch (error) {
        console.error('Error fetching popular products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return <ProductGrid products={products} isLoading={isLoading} />;
};

export default PopularProducts;