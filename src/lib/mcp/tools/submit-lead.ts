import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

export default defineTool({
  name: "submit_contact_lead",
  title: "Submit contact lead",
  description:
    "Submit a contact enquiry to Chemist Care Tools. Requires explicit consent from the person being contacted.",
  inputSchema: {
    name: z.string().min(1).describe("Full name of the person enquiring."),
    email: z.string().email().describe("Contact email address."),
    phone: z.string().optional().describe("Optional phone number."),
    pharmacy_name: z.string().optional().describe("Optional pharmacy name."),
    message: z.string().min(1).describe("Message or enquiry details."),
    consent: z
      .boolean()
      .describe("Must be true — confirms the person consents to being contacted."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
  handler: async ({ name, email, phone, pharmacy_name, message, consent }) => {
    if (!consent) {
      return {
        content: [
          {
            type: "text",
            text: "Consent is required. Set consent=true only after confirming with the person.",
          },
        ],
        isError: true,
      };
    }
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) {
      return {
        content: [{ type: "text", text: "Backend is not configured." }],
        isError: true,
      };
    }
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { error } = await supabase.from("leads").upsert(
      {
        type: "contact",
        name,
        email,
        phone: phone ?? null,
        pharmacy_name: pharmacy_name ?? null,
        message,
        consent: true,
        completed: true,
      } as never,
      { onConflict: "email,type" },
    );

    if (error) {
      return {
        content: [{ type: "text", text: `Failed to submit lead: ${error.message}` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: "Lead submitted. The Chemist Care team will follow up." }],
      structuredContent: { ok: true },
    };
  },
});
