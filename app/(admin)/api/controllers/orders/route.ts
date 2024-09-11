import { Client, Databases, ID, Query } from "node-appwrite";
import { NextRequest, NextResponse } from "next/server";
import { getError } from "@/lib/logger";

const client = new Client()
  .setEndpoint(process.env.APPWRITE_END_POINT!)
  .setProject(process.env.APPWRITE_PROJECT_KEY!);

const db = new Databases(client);

// Get all order
export async function GET(request: NextRequest) {
  try {
    const orderList: any = await db.listDocuments(
      process.env.APPWRITE_DATABASE_ID as string, // database id
      process.env.APPWRITE_ORDER_COLLECTION_ID as string, //collection id
      [] // queries
    );
    return NextResponse.json({ success: true, orderList });
  } catch (error) {
    console.log(error);
    return getError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const responseBody = await request.json();
    //make api request to customer
    const order = await fetch("http:localhost:3000/api/controllers/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responseBody),
    });
    const { orderId } = await order.json();

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.log(error);
  }
}


export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const orderId = searchParams.get('orderId')
  const currentStatus = searchParams.get('currentStatus')
   // Validate the new status
   console.log(currentStatus)
   const validStatuses = ['Processing', 'Pending', 'Delivered', 'Cancelled', 'Shipped'];
   if (!validStatuses.includes(currentStatus!)) {
       throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
   }
  try {
    const res = await db.updateDocument(
      process.env.APPWRITE_DATABASE_ID as string, // database id
      process.env.APPWRITE_ORDER_COLLECTION_ID as string, //collection id
      orderId!,
      {status: currentStatus?.toString()}
    )
    return NextResponse.json({success: true})
  } catch (error) {
    console.log(error)
    return getError(error)
  }
}
