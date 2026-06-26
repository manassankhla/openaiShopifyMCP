import React from 'react';
import { Product } from '../../types/product';

export default function ProductCard({ product }: { product: Product }) {
  const image = product.images.edges[0]?.node;
  const price = product.priceRangeV2.minVariantPrice;

  return (
    <div className="border border-gray-200 rounded-xl shadow-sm p-4 min-w-[250px] max-w-[250px] flex-shrink-0 flex flex-col bg-white">
      {image && (
        <img 
          src={image.url} 
          alt={image.altText || product.title} 
          className="w-full h-48 object-cover rounded-lg mb-4" 
        />
      )}
      <h3 className="font-semibold text-gray-900 text-lg truncate" title={product.title}>
        {product.title}
      </h3>
      <p className="text-gray-600 font-medium mb-3">
        {price.amount} {price.currencyCode}
      </p>
      
      {/* Hide description by default to keep cards uniform, but could truncate it here */}
      <div 
        className="text-sm text-gray-500 line-clamp-2 mb-4" 
        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
      />

      <div className="mt-auto">
        <button className="w-full bg-black text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
          Buy Now
        </button>
      </div>
    </div>
  );
}
