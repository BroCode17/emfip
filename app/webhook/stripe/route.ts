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
    console.log(orderItems)
    console.log(customerInfo)
    const dbProduct: Array<{
      product: string;
      orderedQuantity: number;
      itemSize: string;
    }> = [];
//     itemPurchased.forEach((element: any) => {
//       dbProduct.push({
//         product: element.id,
//         orderedQuantity: element.quantity,
//         itemSize: element.size,
//       });
//     });
      const dbObject = {
      
        "orders": {
        "order_date": "2023-08-30T10:20:00.000Z",
        "total_amount": 49,
        "status": "Shipped"
        },
        "customers": {
            "full_name": "John Doe",
            "email": "bro.doe@example.com",
            "address": "123 Maple Street",
            "city": "Springfield",
            "state": "IL",
            "zip_code": "62704",
            "country": "USA"
          },
        "orderItems": [
        {
          "product_id": "66e0df1d001f6ee383a0",
          "quantity": 2
          
        },
        {
          "product_id": "66e0f1df002e71cafae5",
          "quantity": 4
        }
      ]
        
        
      }



  

//     const orderObject = {
//       refrenceNumber,
//       customerEmail: email,
//       products: dbProduct,
//       customerShippingInformation: shippingInfo,
//       totalAmount: amount / 100,
//     };
  
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_NGROK_URL}/api/v1/orders/create-order`,
//         orderObject
//       );
//      // console.log("PUT Response:", response.data);
//     } catch (error: any) {
//       console.error("Error updating data:", error);
//     }
  }

  return new NextResponse();
}