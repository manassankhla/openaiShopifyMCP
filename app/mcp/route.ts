import { NextResponse } from 'next/server';
import { searchProductsSchema, handleSearchProducts } from '../../tools/searchProducts';
import { getProductSchema, handleGetProduct } from '../../tools/getProduct';

// Register tools in a generic MCP HTTP route
export async function POST(req: Request) {
  const body = await req.json();
  const { tool, args } = body;

  try {
    // Phase 2: search_products
    if (tool === 'search_products') {
      const parsedArgs = searchProductsSchema.parse(args);
      const result = await handleSearchProducts(parsedArgs);
      return NextResponse.json(result);
    }

    // Phase 3: get_product
    if (tool === 'get_product') {
      const parsedArgs = getProductSchema.parse(args);
      const result = await handleGetProduct(parsedArgs);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Unknown tool' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
