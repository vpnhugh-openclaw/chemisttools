import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { MODULES } from "@/lib/siteConfig";

export default defineTool({
  name: "list_modules",
  title: "List product modules",
  description:
    "List Chemist Care Tools product modules with name, slug, status, group, and short description.",
  inputSchema: {
    group: z
      .string()
      .optional()
      .describe("Optional module group filter (e.g. 'Run the day')."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ group }) => {
    const rows = MODULES.filter((m) => !group || m.group === group).map((m) => ({
      slug: m.slug,
      name: m.name,
      status: m.status,
      group: m.group,
      description: m.description,
      url: `https://tools.chemistcare.com.au/product/${m.slug}`,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { modules: rows },
    };
  },
});
