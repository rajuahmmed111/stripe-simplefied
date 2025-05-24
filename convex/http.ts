import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

const http = httpRouter();

const clerkWebhook = httpAction(async (ctx, req) => {
  const webHookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webHookSecret) {
    throw new Error("CLERK_WEBHOOK_SECRET is not set");
  }

  const svix_id = req.headers.get("svix-id");
  const svix_signature = req.headers.get("svix-signature");
  const svix_timestamp = req.headers.get("svix-timestamp");
  if (!svix_id || !svix_signature || !svix_timestamp) {
    new Response(
      "Missing required headers: svix-id, svix-signature, svix-timestamp",
      {
        status: 400,
      }
    );
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(webHookSecret);
  let event: WebhookEvent;

  try {
    
  } catch (error) {
    return new Response("Invalid webhook payload", { status: 400 });
  }
});

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: clerkWebhook,
});

export default http;
