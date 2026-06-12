import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Disable Vercel's automatic body parsing so we can access the raw
// request body, which Stripe requires for signature verification.
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-05-27.dahlia",
});

function readRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method not allowed");
  }

  const signature = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return res.status(400).send("Missing Stripe signature or webhook secret");
  }

  let event: Stripe.Event;

  try {
    const rawBody = await readRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, signature as string, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    const message = err instanceof Error ? err.message : "Invalid signature";
    return res.status(400).send(`Webhook Error: ${message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      let items: { name: string | null; quantity: number | null; amount_total: number | null }[] = [];

      try {
        const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ["line_items"],
        });

        items = (fullSession.line_items?.data ?? []).map((li) => ({
          name: li.description,
          quantity: li.quantity,
          amount_total: li.amount_total,
        }));
      } catch (lineItemErr) {
        console.error("Could not retrieve line items, recording order without them:", lineItemErr);
      }

      const supabaseUrl = process.env.VITE_SUPABASE_URL;
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!supabaseUrl || !serviceRoleKey) {
        console.error("Supabase env vars missing; skipping order record");
      } else {
        const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
          auth: { persistSession: false },
        });

        const { error } = await supabaseAdmin.from("orders").insert({
          stripe_session_id: session.id,
          customer_email: session.customer_details?.email ?? null,
          amount_total: session.amount_total ?? 0,
          currency: session.currency ?? "usd",
          items,
          shipping_address:
            session.collected_information?.shipping_details ?? session.customer_details?.address ?? null,
          status: "paid",
        });

        if (error) {
          // Don't fail the webhook on a duplicate (idempotent retries from Stripe).
          if (error.code !== "23505") {
            console.error("Failed to record order:", error);
          }
        }
      }
    } catch (err) {
      console.error("Error processing checkout.session.completed:", err);
    }
  }

  return res.status(200).json({ received: true });
}
