import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!secretKey || !webhookSecret) {
  console.error("Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET in env");
  process.exit(1);
}

const stripe = new Stripe(secretKey, { apiVersion: "2026-05-27.dahlia" });

// Build a fake (but realistic-shaped) checkout.session.completed event payload.
const fakeSession = {
  id: `cs_test_fake_${Date.now()}`,
  object: "checkout.session",
  amount_total: 3500,
  currency: "usd",
  customer_details: {
    email: "test-buyer@example.com",
    address: { country: "US" },
  },
  collected_information: {
    shipping_details: {
      address: { line1: "123 Test St", city: "Testville", country: "US", postal_code: "12345" },
      name: "Test Buyer",
    },
  },
  payment_status: "paid",
  status: "complete",
};

const payload = JSON.stringify({
  id: `evt_test_${Date.now()}`,
  object: "event",
  type: "checkout.session.completed",
  data: { object: fakeSession },
});

// Sign it exactly like Stripe would
const header = stripe.webhooks.generateTestHeaderString({
  payload,
  secret: webhookSecret,
});

const res = await fetch("https://owtyonline-xi.vercel.app/api/stripe-webhook", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Stripe-Signature": header,
  },
  body: payload,
});

console.log("Status:", res.status);
console.log("Body:", await res.text());
console.log("Fake session id:", fakeSession.id);
