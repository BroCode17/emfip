import { adminEmailTemplate, generateOrderDeliveredEmail, OrderConfirmationEmail } from '@/lib/emailTemplate';
import { getError } from '@/lib/logger';
import { mailOptions,  transporter} from '@/lib/nodemail';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    const delivery = req.nextUrl.searchParams.get('final')
    const result = await req.json();
    try {
      // Send email to customer
      await transporter.sendMail({
        ...mailOptions,
        to: result.customerEmail,
        subject: delivery ? 'Order Delivered!' : 'Your Order Confirmation',
        html: delivery ? generateOrderDeliveredEmail(result) : OrderConfirmationEmail(result)
      });

      // Send email to admin
      if(!delivery){
        await transporter.sendMail({
          ...mailOptions,
          to: process.env.ADMIN_EMAIL,
          subject: 'New Order Received',
          html: adminEmailTemplate({
                  orderNumber: result.orderNumber ,
                  customerName: result.customerName,
                  productName: result.productName,
                  quantity: result.quantity,
                  totalAmount: result.totalAmount}),
        });
  
      }
    
      return NextResponse.json({ message: 'Order placed and emails sent successfully' });
    } catch (error) {
      console.error('Error sending emails:', error);
      return getError({ error: 'Error sending emails' });
    }
  }