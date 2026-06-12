CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_session_id TEXT NOT NULL UNIQUE,
  customer_email TEXT,
  amount_total INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  items JSONB NOT NULL,
  shipping_address JSONB,
  status TEXT NOT NULL DEFAULT 'paid',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- No public access at all (frontend never reads/writes orders directly).
-- Only the Stripe webhook (using the Supabase service role key, which
-- bypasses RLS) can insert rows. Admins can view orders via the
-- Supabase Dashboard / Table Editor.
CREATE POLICY "No public access"
  ON public.orders
  FOR ALL
  USING (false)
  WITH CHECK (false);
