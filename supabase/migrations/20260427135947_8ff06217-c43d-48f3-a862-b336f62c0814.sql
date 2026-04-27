CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a contact form (public form)
CREATE POLICY "Anyone can submit a contact"
  ON public.contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Nobody can read contacts via the API (sensitive PII).
-- The site owner reads them through the Lovable Cloud dashboard / admin tools.
CREATE POLICY "No public read access"
  ON public.contacts
  FOR SELECT
  TO anon, authenticated
  USING (false);
