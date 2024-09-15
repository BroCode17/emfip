import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET as string);


export async function POST(req: NextRequest) {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/controllers/orders`,
        {
          method: 'POST',
          body: JSON.stringify(dbObject),
        },
      );
      const {order} = await response.json()
      const emailObject = {
        orderNumber: order.$id,
        customerName: customerInfo.full_name,
        totalAmount: order.total_amount,
        shippingAddress: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state}, ${customerInfo.zip_code}`,
        orderDate: order.$createdAt,
        quantity: order.order_item[0].quantity,
        price: order.order_item[0].price_at_purchase,
        customerEmail: order.customer_id.email,
        trackingUrl: `${process.env.NEXT_PUBLIC_HOST}/order-tracking?orderId=${order.$id}`,
        productName: 'Emfip Wool Drayer Balls' // Will be dynamic
      }
  
    
    //  // make email send request
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/sendmail`, {
      method: 'POST',
      body: JSON.stringify(emailObject)
    })

    } catch (error: any) {
      console.error("Error updating data:", error);
    }
  }

  return new NextResponse();
}