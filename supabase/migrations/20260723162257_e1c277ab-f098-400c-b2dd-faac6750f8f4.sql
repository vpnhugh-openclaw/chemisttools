
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  type TEXT NOT NULL DEFAULT 'walkthrough',
  email TEXT NOT NULL,
  name TEXT,
  pharmacy_name TEXT,
  phone TEXT,
  role TEXT,
  store_count TEXT,
  dispense_software TEXT,
  modules JSONB,
  priority TEXT,
  snapshot JSONB,
  challenge TEXT,
  success_12m TEXT,
  timeline TEXT,
  score INT,
  recommendation JSONB,
  consent BOOLEAN NOT NULL DEFAULT false,
  completed BOOLEAN NOT NULL DEFAULT false,
  message TEXT,
  CONSTRAINT leads_email_type_unique UNIQUE (email, type)
);

GRANT INSERT, UPDATE ON public.leads TO anon;
GRANT INSERT, UPDATE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update their submission by email"
  ON public.leads FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
