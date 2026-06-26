import { z } from 'zod';
import { searchProducts } from '../lib/shopify';

export const searchProductsSchema = z.object({
  query: z.string().describe('The search query for products'),
});

export async function handleSearchProducts(args: z.infer<typeof searchProductsSchema>) {
  const products = await searchProducts(args.query);
  return { products };
}
