import OrderConfirmationEmail from "@/emails/reciept";
import OrderDeliveredEmail from "@/emails/tracker-order";
import { getError } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);
export async function POST(req: NextRequest) {
  const delivery = req.nextUrl.searchParams.get("final");
  const result = await req.json();
  try {
    // Construct the emails to be sent
    const customerEmailPromise = resend.emails.send({
      from: "confirm-order@emfiplaundry.com",
      to: result.customerEmail,
      subject: delivery ? "Order Delivered!" : "Your Order Confirmation",
      react: delivery
        ? OrderDeliveredEmail({ ...result })
        : OrderConfirmationEmail({ ...result }),
    });

    // If not a delivery confirmation, send admin email
    let adminEmailPromise;
    if (!delivery) {
      adminEmailPromise = resend.emails.send({
        from: "noreply@emfiplaundry.com",
        to: [`emfip@proton.me`],
        subject: "Order Received",
        react: OrderConfirmationEmail({ ...result, admin: true }),
      });
    }

    // Run both email sends concurrently (admin email only if required)
    await Promise.all([customerEmailPromise, adminEmailPromise].filter(Boolean));

    console.log('Emails sent successfully');

  } catch (error) {
    console.error("Error sending emails:", error);
    // return NextResponse.json({ error: "Error sending emails" }, { status: 500 });
  }
  return new NextResponse();
}
