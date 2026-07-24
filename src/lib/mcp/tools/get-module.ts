import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { findModule } from "@/lib/siteConfig";

export default defineTool({
  name: "get_module",
  title: "Get module details",
  description:
    "Fetch full details for a Chemist Care Tools module by slug: features, FAQ, pricing note, and before/with comparisons.",
  inputSchema: {
    slug: z.string().min(1).describe("The module slug, e.g. 'today' or 'compliance'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const m = findModule(slug);
    if (!m) {
      return {
        content: [{ type: "text", text: `No module found with slug '${slug}'.` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(m, null, 2) }],
      structuredContent: { module: m },
    };
  },
});
