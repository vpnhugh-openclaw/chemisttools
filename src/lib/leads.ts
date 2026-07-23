import { supabase } from "@/integrations/supabase/client";

export interface LeadPayload {
  type: "walkthrough" | "contact";
  name?: string;
  email: string;
  phone?: string;
  pharmacy_name?: string;
  role?: string;
  store_count?: string;
  dispense_software?: string;
  modules?: string[];
  priority?: string;
  snapshot?: Record<string, unknown>;
  challenge?: string;
  success_12m?: string;
  timeline?: string;
  score?: number;
  recommendation?: Record<string, unknown>;
  consent: boolean;
  completed: boolean;
  message?: string;
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const row = {
    ...payload,
    modules: payload.modules ?? null,
    snapshot: payload.snapshot ?? null,
    recommendation: payload.recommendation ?? null,
  };
  const { error } = await supabase
    .from("leads")
    .upsert(row as never, { onConflict: "email,type" });
  if (error) throw new Error(error.message);
}
