
DROP POLICY IF EXISTS "Anyone can update their submission by email" ON public.leads;
REVOKE UPDATE ON public.leads FROM anon, authenticated;
