DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Anyone can insert leads" ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    consent = true
    AND type IN ('walkthrough', 'contact')
    AND char_length(email) BETWEEN 3 AND 320
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );