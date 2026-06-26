import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types/product';

export default function ProductCarousel({ products }: { products: Product[] }) {
  return (
    <div className="flex overflow-x-auto space-x-4 py-4 px-2 scrollbar-hide snap-x">
      {products.map((product) => (
        <div key={product.id} className="snap-start">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
