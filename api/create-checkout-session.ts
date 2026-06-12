import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-05-27.dahlia",
});

interface CartItemPayload {
  name: string;
  price: number;
  quantity: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: "Stripe is not configured" });
  }

  try {
    const { items } = (req.body ?? {}) as { items?: CartItemPayload[] };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Your cart is empty" });
    }

    const line_items = items.map((item) => {
      const price = Number(item.price);
      const quantity = Number(item.quantity);

      if (!item.name || !Number.isFinite(price) || price <= 0 || !Number.isFinite(quantity) || quantity <= 0) {
        throw new Error("Invalid item in cart");
      }

      return {
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: Math.round(price * 100),
        },
        quantity,
      };
    });

    const origin = (req.headers.origin as string) || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "IE", "NZ"],
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return res.status(500).json({ error: message });
  }
}
