import { defineTool } from "@lovable.dev/mcp-js";
import { siteConfig } from "@/lib/siteConfig";

export default defineTool({
  name: "get_pricing",
  title: "Get pricing",
  description:
    "Return Chemist Care Tools plans, add-ons, and usage pricing (AUD, per store per month).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const pricing = siteConfig.pricing;
    return {
      content: [{ type: "text", text: JSON.stringify(pricing, null, 2) }],
      structuredContent: { pricing },
    };
  },
});
