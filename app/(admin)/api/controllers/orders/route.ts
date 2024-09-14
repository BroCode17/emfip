import { Client, Databases } from "node-appwrite";
import { NextRequest, NextResponse } from "next/server";
import { getError } from "@/lib/logger";
import { createAndUpdateStatus } from "../customers/route";

const client = new Client()
  .setEndpoint(process.env.APPWRITE_END_POINT!)
  .setProject(process.env.APPWRITE_PROJECT_KEY!);

const db = new Databases(client);

// Get all order
export async function GET(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get('orderId')

  try {
    let orderList:any;
    if(orderId){
      orderList = await db.getDocument(
        process.env.APPWRITE_DATABASE_ID as string, // database id
        process.env.APPWRITE_ORDER_COLLECTION_ID as string,
        orderId
      )
    }else{
      orderList = await db.listDocuments(
        process.env.APPWRITE_DATABASE_ID as string, // database id
        process.env.APPWRITE_ORDER_COLLECTION_ID as string, //collection id
        [] // queries
      );
    }
    
  
    return NextResponse.json({ success: true, orderList});
  } catch (error) {
    console.log(error)
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
    
    //return the response 
    return order
  } catch (error) {
    return getError(error);
  }
}


export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const orderId = searchParams.get('orderId')
  let currentStatus = searchParams.get('currentStatus')
   // Validate the new status
   console.log(currentStatus)
   const validStatuses = ['Processing', 'Pending', 'Delivered', 'Cancelled', 'Shipped', 'OutofDelivery'];
   if (!validStatuses.includes(currentStatus!)) {
       throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
   }

  // some check
  currentStatus = currentStatus === 'OutofDelivery' ? 'Out of Delivery': currentStatus 

   try {
    const document = await db.getDocument(
      process.env.APPWRITE_DATABASE_ID as string, // database id
      process.env.APPWRITE_ORDER_COLLECTION_ID as string,
      orderId!
    );
  

    // Check if the current status exists in the document
    const isCurrentStatusExist = document.status.find((el: any) => el.currentStatus === currentStatus);
    console.log('isExist', isCurrentStatusExist)
    if (!isCurrentStatusExist) {
      // Create and update status if it doesn't exist
      const statusId: any = await createAndUpdateStatus(currentStatus as string);
      const updateStatus = [...document.status, statusId.$id];
  
      // Update order in the database and return the result
      await db.updateDocument(
        process.env.APPWRITE_DATABASE_ID as string, // database id
        process.env.APPWRITE_ORDER_COLLECTION_ID as string,
        orderId!,
        { status: updateStatus }
      );
    } else {
      // If the current status already exists, update the status collection
      await createAndUpdateStatus(currentStatus as string, isCurrentStatusExist.$id);
    }
  
    return NextResponse.json({ success: true, currentStatus });
  } catch (error) {
    return getError(error);
  }  
}
