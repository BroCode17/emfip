import { formatReadableDate, formatToLocaleCurrency, getFormattedFutureDate } from '@/lib/utils';
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface OrderConfirmationEmailProps {
  orderNumber: string;
  customerName: string;
  orderDate: string;
  orderItems: Array<{
    price_at_purchase: number;
    quantity: number;
    product_id: {
      name: string;
    };
  }>;
  totalAmount: number;
  shippingAddress: string;
  trackingUrl: string;
  companyName: string;
  companyLogo: string;
  admin?: boolean;
}

export const OrderConfirmationEmail: React.FC<Readonly<OrderConfirmationEmailProps>> = ({
  orderNumber,
  customerName,
  orderDate,
  orderItems,
  totalAmount,
  shippingAddress,
  trackingUrl,
  companyName,
  companyLogo,
  admin = false
}) => (
  <Html>
    <Head />
    <Preview>Your order confirmation for order #{orderNumber} from {companyName}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* <Section style={logoContainer}>
          <Img src={companyLogo} alt={companyName} width="150" height="50" />
        </Section> */}
        
        <Heading style={h1}>Order Confirmation</Heading>
        <Text style={text}>Dear {customerName},</Text>
        <Text style={text}>Thank you for your order. We're pleased to confirm that we've received your order and it's being processed.</Text>

        <Section style={orderInfo}>
          <Text style={orderInfoText}>Order Number: <strong>{orderNumber}</strong></Text>
          <Text style={orderInfoText}>Order Date: <strong>{formatReadableDate( new Date(orderDate))}</strong></Text>
        </Section>

        <Heading as="h2" style={h2}>Order Details</Heading>
        <Section style={tableContainer}>
          <table style={table}>
            <thead>
              <tr>
                <th style={tableHeader}>Product</th>
                <th style={tableHeader}>Quantity</th>
                <th style={tableHeader}>Price</th>
                <th style={tableHeader}>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderItems && orderItems.length > 0 ? (
                orderItems.map((item, index) => (
                  <tr key={index} style={index % 2 === 0 ? tableRowEven : tableRowOdd}>
                    <td style={tableCell}>{item.product_id.name}</td>
                    <td style={tableCell}>{item.quantity}</td>
                    <td style={tableCell}>{formatToLocaleCurrency(item.price_at_purchase)}</td>
                    <td style={tableCell}>{formatToLocaleCurrency(item.quantity *  item.price_at_purchase)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={tableCell}>No items in this order.</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr style={totalRow}>
                <td colSpan={3} style={tableCell}><strong>Total Amount</strong></td>
                <td style={tableCell}><strong>{formatToLocaleCurrency(totalAmount || 0)}</strong></td>
              </tr>
            </tfoot>
          </table>
        </Section>

        <Heading as="h2" style={h2}>Shipping Information</Heading>
        <Text style={text}>{shippingAddress}</Text>

       {!admin  && (
        <>
         <Section style={trackingSection}>
         <Text style={text}>To track your order, please click the button below:</Text>
         <Link href={trackingUrl} style={button}>
           Track Your Order
         </Link>
       </Section>

       <Hr style={hr} />

       <Text style={footerText}>
         If you have any questions about your order, please visit our Help Center or contact our customer service team.
       </Text>
       <Text style={footerText}>
         <strong>Please note:</strong> This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.
       </Text>

       <Text style={footerText}>Thank you for shopping with {'Emfip'}!</Text>
       </>
       )}

      </Container>
    </Body>
  </Html>
);

export default OrderConfirmationEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  width: '100%',
  maxWidth: '600px',
  // border: '1px solid #f0f0f0',
};

const logoContainer = {
  padding: '20px 0',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#333',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '30px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#333',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '20px 0 10px',
  padding: '0',
};

const text = {
  color: '#333',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 4',
};

const orderInfo = {
  margin: '20px 0',
  backgroundColor: '#f4f4f4',
  padding: '15px',
  borderRadius: '4px',
};

const orderInfoText = {
  ...text,
  margin: '8px 0',
};

const tableContainer = {
  margin: '20px 0',
};

const table = {
  borderCollapse: 'collapse' as const,
  width: '100%',
};

const tableHeader = {
  backgroundColor: '#f4f4f4',
  padding: '10px',
  textAlign: 'left' as const,
  fontWeight: 'bold',
  fontSize: '14px',
};

const tableCell = {
  padding: '10px',
  borderBottom: '1px solid #f0f0f0',
  fontSize: '14px',
};

const tableRowEven = {
  backgroundColor: '#ffffff',
};

const tableRowOdd = {
  backgroundColor: '#f9f9f9',
};

const totalRow = {
  backgroundColor: '#f4f4f4',
  fontWeight: 'bold',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const trackingSection = {
  margin: '32px 0',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#5469d4',
  borderRadius: '4px',
  color: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  width: '200px',
  padding: '14px 20px',
  margin: '0 auto',
};

const footerText = {
  ...text,
  fontSize: '14px',
  color: '#666',
  margin: '4px 8px',
  
};