
CREATE TABLE public.email_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (subscribe)
CREATE POLICY "Anyone can subscribe"
  ON public.email_subscribers
  FOR INSERT
  WITH CHECK (true);

-- No one can read subscribers from the client (admin only via Cloud dashboard)
CREATE POLICY "No public read access"
  ON public.email_subscribers
  FOR SELECT
  USING (false);
