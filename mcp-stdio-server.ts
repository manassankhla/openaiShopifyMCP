import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { searchProductsTool } from "./tools/searchProducts";
import { getProductTool } from "./tools/getProduct";
import { loadEnvConfig } from '@next/env';

// Load environment variables for local testing
const projectDir = process.cwd();
loadEnvConfig(projectDir);

// 1. Create the official MCP Server
const server = new McpServer({
  name: "shopify-mcp-inspector",
  version: "1.0.0"
});

// 2. Register Search Products Tool
server.tool(
  searchProductsTool.name,
  searchProductsTool.description,
  {
    query: searchProductsTool.inputSchema.shape.query
  },
  async ({ query }) => {
    const result = await searchProductsTool.handler({ query });
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
    };
  }
);

// 3. Register Get Product Tool
server.tool(
  getProductTool.name,
  getProductTool.description,
  {
    productId: getProductTool.inputSchema.shape.productId
  },
  async ({ productId }) => {
    const result = await getProductTool.handler({ productId });
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
    };
  }
);

// 4. Start the server on STDIO
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio for inspector...");
}

run().catch((error) => {
  console.error("Failed to start server:", error);
});
