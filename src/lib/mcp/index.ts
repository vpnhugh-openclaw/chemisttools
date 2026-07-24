import { defineMcp } from "@lovable.dev/mcp-js";
import listModules from "./tools/list-modules";
import getModule from "./tools/get-module";
import getPricing from "./tools/get-pricing";
import submitLead from "./tools/submit-lead";

export default defineMcp({
  name: "chemist-care-tools-mcp",
  title: "Chemist Care Tools",
  version: "0.1.0",
  instructions:
    "Public marketing MCP for Chemist Care Tools — an operations platform for Australian community pharmacies. Use `list_modules` and `get_module` to explore the 16 product modules, `get_pricing` for plans and add-ons, and `submit_contact_lead` to send an enquiry (requires explicit consent).",
  tools: [listModules, getModule, getPricing, submitLead],
});
