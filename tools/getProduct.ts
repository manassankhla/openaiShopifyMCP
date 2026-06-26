import { z } from 'zod';
import { getProduct } from '../lib/shopify';

export const getProductTool = {
  name: 'get_product',
  title: 'Get Product',
  description: 'Retrieves detailed information about a specific Shopify product using its ID.',
  inputSchema: z.object({
    productId: z.string().describe('The ID of the product to retrieve'),
  }),
  handler: async ({ productId }: { productId: string }) => {
    const product = await getProduct(productId);
    return { product };
  },
};
