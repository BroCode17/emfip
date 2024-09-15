import { formatToLocaleCurrency } from "./utils";

// lib/emailTemplates.ts
interface OrderDetails {
  orderId: string;
  customerName: string;
  productName: string;
  quantity: number;
  totalPrice: number;
}

export const adminEmailTemplate = (order: any) => `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h1 style="color: #FF5722;">New Order Received</h1>
          <p>A new order has been placed. Please find the details below:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Order ID</th>
              <td style="padding: 8px;">${order.orderNumber}</td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Customer Name</th>
              <td style="padding: 8px;">${order.customerName}</td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Product</th>
              <td style="padding: 8px;">${order.productName}</td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Quantity</th>
              <td style="padding: 8px;">${order.quantity}</td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Total Price</th>
              <td style="padding: 8px;">${formatToLocaleCurrency(
                order.totalAmount
              )}</td>
            </tr>
          </table>
          <p style="margin-top: 20px;">Please process this order as soon as possible.</p>
          <p style="margin-top: 20px;">Best regards,<br>Your Company Team</p>
        </div>
      `;

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderConfirmationEmailProps {
  orderNumber: string;
  customerName: string;
  orderDate: string;
  orderItems: any[];
  totalAmount: number;
  shippingAddress: string;
  quantity: number;
  price: number;
  productName: string;
  trackingUrl: string;
}

export const OrderConfirmationEmail = ({
  orderNumber,
  customerName,
  totalAmount,
  shippingAddress,
  orderDate,
  quantity,
  productName,
  price,
  trackingUrl,
}: OrderConfirmationEmailProps) =>
  `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.8;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .email-body {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        h1 {
            color: #333333;
            font-size: 24px;
            font-weight: 600;
            border-bottom: 2px solid #eaeaea;
            padding-bottom: 12px;
            margin-bottom: 24px;
        }
        h2 {
            color: #4a4a4a;
            font-size: 18px;
            margin-top: 30px;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 8px;
            margin-bottom: 16px;
        }
        p {
            color: #555555;
            font-size: 16px;
            margin: 16px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            margin-bottom: 20px;
            font-size: 16px;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #dddddd;
        }
        th {
            background-color: #f8f8f8;
            color: #333;
        }
        td {
            color: #666666;
        }
        .text-right {
            text-align: right;
        }
        .total {
            font-weight: bold;
            font-size: 18px;
            color: #333;
        }
        .footer {
            font-size: 14px;
            color: #999;
            text-align: center;
            margin-top: 40px;
            border-top: 1px solid #e0e0e0;
            padding-top: 20px;
        }
        .button {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 12px 20px;
            font-size: 16px;
            border-radius: 5px;
            text-decoration: none;
            margin-top: 30px;
        }
        .button:hover {
            background-color: #45a049;
        }
        .header-logo {
            text-align: center;
            margin-bottom: 30px;
        }
        .header-logo img {
            max-width: 150px;
        }
    </style>
</head>
<body>
    <div class="container">
        
        <div class="email-body">
            <h1>Order Confirmation</h1>
            
            <p>Dear ${customerName},</p>
            
            <p>Thank you for your order! We're pleased to confirm that we have received your order and it's being processed. Below are the details of your purchase.</p>
            
            <h2>Order Summary</h2>
            <p><strong>Order Number:</strong> ${orderNumber}</p>
            <p><strong>Order Date:</strong> ${orderDate.slice(0, 10)}</p>
            
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th class="text-right">Quantity</th>
                        <th class="text-right">Price</th>
                    </tr>
                </thead>
                <tbody>
                   
                    <tr>
                        <td>${productName}</td>
                        <td class="text-right">${quantity}</td>
                        <td class="text-right">${formatToLocaleCurrency(
                          price || 10
                        )}</td>
                    </tr>
                   
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" class="text-right total">Total:</td>
                        <td class="text-right total">${formatToLocaleCurrency(
                          totalAmount
                        )}</td>
                    </tr>
                </tfoot>
            </table>
            
            <h2>Shipping Address</h2>
            <p style="white-space: pre-line;">${shippingAddress}</p>

            <a href="${trackingUrl}" class="button">Track Your Order</a>
            
            <p>If you have any questions regarding your order, feel free to contact our customer support.</p>
            
            <p>Thank you for shopping with us!</p>
            
            <p class="footer">
                This is an automated message. Please do not reply directly to this email.<br>
                &copy; 2024 Emfip LLC, All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
`;

/**
 * <div class="header-logo">
            <img src="https://via.placeholder.com/150" alt="Company Logo">
        </div>
 */
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderDeliveredEmailData {
  customerName: string;
  orderNumber: string;
  deliveryDate: string;
  deliveryAddress: string;
  //orderItems: OrderItem[];
  totalAmount: number;
  quantity: number;
  productName: string;
  price: number;
  deliveryUrl: string;
}

export function generateOrderDeliveredEmail(
  data: OrderDeliveredEmailData
): string {
  const {
    customerName,
    orderNumber,
    deliveryDate,
    deliveryAddress,
    totalAmount,
    quantity,
    productName,
    price,
    deliveryUrl,
  } = data;
  // Use for array of
  // const orderItemsHtml = orderItems.map(item => `
  //   <tr>
  //     <td style="padding: 10px; border: 1px solid #dddddd;">${item.name}</td>
  //     <td style="padding: 10px; border: 1px solid #dddddd;">${item.quantity}</td>
  //     <td style="padding: 10px; border: 1px solid #dddddd;">$${item.price.toFixed(2)}</td>
  //   </tr>
  // `).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Order Has Been Delivered!</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333333;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 0;">
                <table role="presentation" style="width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td align="center" style="padding: 0;">
                            <h1 style="color: #000; font-size: 24px; margin-bottom: 20px;">Your Order Has Been Delivered!</h1>
                            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Dear ${customerName},</p>
                            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Great news! Your order has been delivered. We hope you're excited to start using your new laundry wool dryer balls!</p>
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold;">Order Number:</td>
                                    <td style="padding: 10px; border: 1px solid #dddddd;">${orderNumber}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold;">Delivery Date:</td>
                                    <td style="padding: 10px; border: 1px solid #dddddd;">${deliveryDate}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold;">Delivery Address:</td>
                                    <td style="padding: 10px; border: 1px solid #dddddd;">${deliveryAddress}</td>
                                </tr>
                            </table>
                            <h2 style="color: #000; font-size: 20px; margin-bottom: 15px;">Order Summary</h2>
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                                <tr style="background-color: #f8f8f8;">
                                    <th style="padding: 10px; border: 1px solid #dddddd; text-align: left;">Item</th>
                                    <th style="padding: 10px; border: 1px solid #dddddd; text-align: left;">Quantity</th>
                                    <th style="padding: 10px; border: 1px solid #dddddd; text-align: left;">Price</th>
                                </tr>
                               <tr>
      <td style="padding: 10px; border: 1px solid #dddddd;">${productName}</td>
      <td style="padding: 10px; border: 1px solid #dddddd;">${quantity}</td>
      <td style="padding: 10px; border: 1px solid #dddddd;">${formatToLocaleCurrency(
        price
      )}</td>
    </tr>
                                <tr>
                                    <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold;" colspan="2">Total:</td>
                                    <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold;">${formatToLocaleCurrency(
                                      totalAmount
                                    )}</td>
                                </tr>
                            </table>
                            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">If you have any questions or concerns about your order, please don't hesitate to contact our customer support team.</p>
                            <a href="${deliveryUrl}" style="display: inline-block; padding: 10px 20px; background-color: #000; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">View Order Details</a>
                            <p style="font-size: 14px; line-height: 1.5; margin-top: 30px; color: #666666;">Thank you for choosing Emfip Wool Dryer Ball Co. We hope you enjoy your eco-friendly laundry solution!</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
}
