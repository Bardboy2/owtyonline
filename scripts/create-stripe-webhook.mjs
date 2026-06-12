import Stripe from "stripe";
import { writeFileSync, appendFileSync, readFileSync } from "fs";

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  console.error("STRIPE_SECRET_KEY not set in environment");
  process.exit(1);
}

const stripe = new Stripe(secretKey, { apiVersion: "2026-05-27.dahlia" });

const url = "https://owtyonline-xi.vercel.app/api/stripe-webhook";

// Avoid creating duplicates if this script is run more than once.
const existing = await stripe.webhookEndpoints.list({ limit: 100 });
const already = existing.data.find((e) => e.url === url);
if (already) {
  console.log(`Webhook endpoint already exists: ${already.id} (no new secret available, delete it in the Stripe dashboard and rerun if you need a fresh secret)`);
  process.exit(0);
}

const endpoint = await stripe.webhookEndpoints.create({
  url,
  enabled_events: ["checkout.session.completed"],
  description: "OWTY store - record paid orders",
});

// Write secret to a local-only temp file (never printed to stdout)
writeFileSync(".webhook-secret.tmp", endpoint.secret ?? "");

// Append to .env.local for local dev with vercel dev
appendFileSync(".env.local", `\nSTRIPE_WEBHOOK_SECRET="${endpoint.secret}"\n`);

console.log(`Created webhook endpoint: ${endpoint.id}`);
console.log("Secret written to .webhook-secret.tmp and appended to .env.local");
