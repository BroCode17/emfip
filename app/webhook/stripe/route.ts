import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const maxDuration = 60

const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET as string);


export async function POST(req: NextRequest, ) {
  const start = performance.now();
  let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(
        await req.text(),
        req.headers.get("stripe-signature") as string,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    const totalAmount = charge.amount
    const orderItems = JSON.parse(charge.metadata.itemList)
    const customerInfo = JSON.parse(charge.metadata.customerInfo)
    const orderId = charge.metadata.orderId
      const dbObject = {
        orders: {
          orderId,
          order_date: new Date().toISOString(),
          total_amount: totalAmount / 100,
          status: "Pending",
        },
        customers: customerInfo,
        orderItems
      }

      try {
        // Parallelize the fetch requests for orders and email
        const [orderResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_HOST}/api/controllers/orders`, {
            method: "POST",
            body: JSON.stringify(dbObject),
          }),
        ]);
  
        await orderResponse.json();
    } catch (error: any) {
      console.error("Error updating data:", error);
     
    }
  }
  return new NextResponse();
}