import { createMcpHandler } from "mcp-handler";
import { searchProductsTool } from "../../tools/searchProducts";
import { getProductTool } from "../../tools/getProduct";

const handler = createMcpHandler(async (server) => {
  // Register search_products
  server.tool(
    searchProductsTool.name,
    searchProductsTool.description,
    {
      query: searchProductsTool.inputSchema.shape.query,
    },
    async (args: any) => {
      const result = await searchProductsTool.handler(args);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
        _meta: {
          ui: {
            resourceUri: "https://ecomjson-mcp.vercel.app/widget",
          },
        },
      };
    }
  );

  // Register get_product
  server.tool(
    getProductTool.name,
    getProductTool.description,
    {
      productId: getProductTool.inputSchema.shape.productId,
    },
    async (args: any) => {
      const result = await getProductTool.handler(args);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
        _meta: {
          ui: {
            resourceUri: "https://ecomjson-mcp.vercel.app/widget",
          },
        },
      };
    }
  );
});

export const GET = handler;
export const POST = handler;

// Allow CORS for the MCP Inspector browser UI
export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
