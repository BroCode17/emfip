import { adminEmailTemplate, customerEmailTemplate, OrderConfirmationEmail } from '@/lib/emailTemplate';
import { getError } from '@/lib/logger';
import { mailOptions,  transporter} from '@/lib/nodemail';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest, res: NextResponse) {
    const result = await req.json();
    console.log(result)
    const {
        orderNumber,
        customerName,
        totalAmount,
        shippingAddress,
        orderDate,
        quantity,
        price
    } = result ;
  console.log(process.env.EMAIL_PASSWORD)
    try {
      // Send email to customer
      await transporter.sendMail({
        ...mailOptions,
        to: result.customerEmail,
        subject: 'Your Order Confirmation',
        // html: customerEmailTemplate({orderId,
        //   customerName,
        //   productName,
        //   quantity,
        //   totalPrice,}),
        html: OrderConfirmationEmail(result)
      });

      // Send email to admin
//       await transporter.sendMail({
//         ...mailOptions,
//         to: process.env.ADMIN_EMAIL,
//         subject: 'New Order Received',
//         html: adminEmailTemplate({orderId,
//                 customerName,
//                 productName,
//                 quantity,
//                 totalPrice,}),
//       });

      return NextResponse.json({ message: 'Order placed and emails sent successfully' });
    } catch (error) {
      console.error('Error sending emails:', error);
      return getError({ error: 'Error sending emails' });
    }
  }