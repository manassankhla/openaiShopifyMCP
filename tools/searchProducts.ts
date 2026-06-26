import { z } from 'zod';
import { searchProducts } from '../lib/shopify';

export const searchProductsTool = {
  name: 'search_products',
  title: 'Search Products',
  description: 'Searches for products in the Shopify store based on a search query.',
  inputSchema: z.object({
    query: z.string().describe('The search query for products'),
  }),
  handler: async ({ query }: { query: string }) => {
    const products = await searchProducts(query);
    return { products };
  },
};
