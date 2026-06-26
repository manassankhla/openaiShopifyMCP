import React from 'react';
import { getProducts } from '../../lib/shopify';
import ProductCarousel from '../../components/ProductCarousel';

export const revalidate = 60; // Refresh data every 60 seconds

export default async function WidgetPage() {
  // Fetch products from Shopify
  const products = await getProducts();

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Recommended for you</h1>
        <p className="text-gray-500">Based on your chat</p>
      </div>
      
      {/* ChatGPT style horizontal product carousel */}
      <ProductCarousel products={products} />
    </div>
  );
}
