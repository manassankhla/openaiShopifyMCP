import { createMcpHandler } from "mcp-handler";
import { searchProductsTool } from "../../tools/searchProducts";
import { getProductTool } from "../../tools/getProduct";

const handler = createMcpHandler(async (server) => {
  // Register search_products
  server.registerTool(
    searchProductsTool.name,
    {
      title: searchProductsTool.title,
      description: searchProductsTool.description,
      inputSchema: searchProductsTool.inputSchema.shape,
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
        structuredContent: result,
      };
    }
  );

  // Register get_product
  server.registerTool(
    getProductTool.name,
    {
      title: getProductTool.title,
      description: getProductTool.description,
      inputSchema: getProductTool.inputSchema.shape,
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
        structuredContent: result,
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
