export interface ProductImage {
  url: string;
  altText: string | null;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: string;
  inventoryQuantity: number | null;
}

export interface ProductPriceRange {
  minVariantPrice: {
    amount: string;
    currencyCode: string;
  };
}

export interface Product {
  id: string;
  title: string;
  descriptionHtml: string;
  handle: string;
  priceRangeV2: ProductPriceRange;
  images: {
    edges: Array<{
      node: ProductImage;
    }>;
  };
  variants?: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
}
