import OrderConfirmationEmail from "@/emails/reciept";
import OrderDeliveredEmail from "@/emails/tracker-order";
import {
  adminEmailTemplate,
  generateOrderDeliveredEmail,
} from "@/lib/emailTemplate";
import { getError } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);
export async function POST(req: NextRequest) {
  const delivery = req.nextUrl.searchParams.get("final");
  const result = await req.json();
  try {
    // using resend
    await resend.emails.send({
      from: "noreply@emfiplaundry.com",
      to: result.customerEmail,
      subject: delivery ? "Order Delivered!" : "Your Order Confirmation",
      react: delivery
        ? OrderDeliveredEmail({ ...result })
        : OrderConfirmationEmail({ ...result }),
    });
    if (!delivery) {
      await resend.emails.send({
        from: "noreply@emfiplaundry.com",
        to: [`emfip@proton.me`],
        subject: "Order Received",
        react: OrderConfirmationEmail({ ...result, admin: true }),
      });
    }
    console.log('called')
    return NextResponse.json({
      message: "Order placed and emails sent successfully",
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    return getError({ error: "Error sending emails" });
  }
}
