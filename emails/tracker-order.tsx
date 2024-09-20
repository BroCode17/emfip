import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Img,
} from "@react-email/components";
import * as React from "react";

interface OrderDeliveredEmailProps {
  customerName: string;
  orderNumber: string;
  deliveryDate: string;
  deliveryAddress: string;
  productName: string;
  quantity: number;
  price: number;
  totalAmount: number;
  deliveryUrl: string;
  orderItems: Array<{
    price_at_purchase: number;
    quantity: number;
    product_id: {
      name: string;
    };
  }>;
}

export const OrderDeliveredEmail: React.FC<
  Readonly<OrderDeliveredEmailProps>
> = ({
  customerName,
  orderNumber,
  deliveryDate,
  deliveryAddress,
  orderItems,
  totalAmount,
  deliveryUrl,
}) => {
  const formatToLocaleCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Html>
      <Head>
        <title>Your Order Has Been Delivered!</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @media only screen and (max-width: 600px) {
              .container {
                width: 100% !important;
                padding: 10px !important;
              }
              .content {
                width: 100% !important;
                padding: 0 !important;
              }
              .table-container {
                width: 100% !important;
              }
              .column {
                width: 100% !important;
                display: block !important;
              }
            }
          `,
          }}
        />
      </Head>
      <Preview>Your Order Has Been Delivered!</Preview>
      <Body style={main}>
        <Container style={container} className="container">
          <Section style={content} className="content">
            <Heading style={h1}>Your Order Has Been Delivered!</Heading>
            <Text style={text}>Dear {customerName},</Text>
            <Text style={text}>
              Great news! Your order has been delivered. We hope you're excited
              to start using your new laundry wool dryer balls!
            </Text>
            <Section style={tableContainer} className="table-container">
              <Row style={tableRow}>
                <Column style={tableHeaderColumn} className="column">
                  Order Number:
                </Column>
                <Column style={tableDataColumn} className="column">
                  {orderNumber}
                </Column>
              </Row>
              <Row style={tableRow}>
                <Column style={tableHeaderColumn} className="column">
                  Delivery Date:
                </Column>
                <Column style={tableDataColumn} className="column">
                  {deliveryDate}
                </Column>
              </Row>
              <Row style={tableRow}>
                <Column style={tableHeaderColumn} className="column">
                  Delivery Address:
                </Column>
                <Column style={tableDataColumn} className="column">
                  {deliveryAddress}
                </Column>
              </Row>
            </Section>
            <Heading as="h2" style={h2}>
              Order Summary
            </Heading>
            <Section style={tableContainer} className="table-container">
              <Row style={tableHeader}>
                <Column style={tableHeaderColumn} className="column">
                  Item
                </Column>
                <Column style={tableHeaderColumn} className="column">
                  Quantity
                </Column>
                <Column style={tableHeaderColumn} className="column">
                  Price
                </Column>
              </Row>
              {orderItems && orderItems.length > 0 ? (
                orderItems.map((item, index) => {
                  return (
                    <Row style={tableRow}>
                      <Column style={tableDataColumn} className="column">
                        {item.product_id.name}
                      </Column>
                      <Column style={tableDataColumn} className="column">
                        {item.quantity}
                      </Column>
                      <Column style={tableDataColumn} className="column">
                        {formatToLocaleCurrency(item.price_at_purchase || 0)}
                      </Column>
                    </Row>
                  );
                })
              ) : (
                <Row style={tableRow}>
                  <Column style={tableDataColumn} className="column">
                    No items in this order.
                  </Column>
                </Row>
              )}
              <Row style={tableRow}>
                <Column
                  style={tableHeaderColumn}
                  className="column"
                  colSpan={2}
                >
                  Total:
                </Column>
                <Column style={tableDataColumn} className="column">
                  {formatToLocaleCurrency(totalAmount || 0)}
                </Column>
              </Row>
            </Section>
            <Text style={text}>
              If you have any questions or concerns about your order, please
              don't hesitate to contact our customer support team at
              emfip@proton.me.
            </Text>
            <Section style={buttonContainer}>
              <Link href={deliveryUrl} style={button}>
                View Order Details
              </Link>
            </Section>
            <Text style={footerText}>
              Thank you for choosing Emfip Wool Dryer Ball Co. We hope you enjoy
              your eco-friendly laundry solution!
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderDeliveredEmail;

const main = {
  backgroundColor: "#f4f4f4",
  fontFamily: "Arial, sans-serif",
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
};

const content = {
  padding: "20px",
};

const h1 = {
  color: "#000",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0 20px",
};

const h2 = {
  color: "#000",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "30px 0 15px",
};

const text = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "0 0 20px",
};

const tableContainer = {
  width: "100%",
  margin: "0 0 20px",
};

const tableRow = {
  borderBottom: "1px solid #dddddd",
};

const tableHeader = {
  ...tableRow,
  backgroundColor: "#f8f8f8",
};

const tableHeaderColumn = {
  padding: "10px",
  fontWeight: "bold",
  textAlign: "left" as const,
};

const tableDataColumn = {
  padding: "10px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const button = {
  backgroundColor: "#000",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  display: "inline-block",
};

const footerText = {
  ...text,
  fontSize: "14px",
  color: "#666666",
  margin: "30px 0 0",
};
