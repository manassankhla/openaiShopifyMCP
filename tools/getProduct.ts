import { z } from 'zod';
import { getProduct } from '../lib/shopify';

export const getProductSchema = z.object({
  productId: z.string().describe('The ID of the product to retrieve'),
});

export async function handleGetProduct(args: z.infer<typeof getProductSchema>) {
  const product = await getProduct(args.productId);
  return { product };
}
