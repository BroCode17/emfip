import { Client, Databases, ID } from "node-appwrite";
import { NextRequest, NextResponse } from "next/server";
import { getError } from "@/lib/logger";
import { getStringDate } from "@/lib/help";

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
    const order = await fetch(`${process.env.HOST}/api/controllers/customers`, {
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
   const validStatuses = ['Processing', 'Pending', 'Delivered', 'Cancelled', 'Shipped', 'OutforDelivery'];
   if (!validStatuses.includes(currentStatus!)) {
       throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
   }

  // some check
  currentStatus = currentStatus === 'OutforDelivery' ? 'Out for Delivery': currentStatus 

   try {
    const document = await db.getDocument(
      process.env.APPWRITE_DATABASE_ID as string, // database id
      process.env.APPWRITE_ORDER_COLLECTION_ID as string,
      orderId!
    );
  

    // Check if the current status exists in the document
    const isCurrentStatusExist = document.status.find((el: any) => el.currentStatus === currentStatus);
   
    if (!isCurrentStatusExist) {
      // Create and update status if it doesn't exist
      const statusId: any = await createAndUpdateStatus(currentStatus);
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
      await createAndUpdateStatus(currentStatus, isCurrentStatusExist.$id as string);
    }

    if(currentStatus === 'Delivered' ){
      // Send email to customer
      const orderDetails = {
        customerName: document.customer_id.full_name,
        orderNumber: orderId,
        deliveryDate: new Date().toLocaleDateString(),
        deliveryAddress: `${document.customer_id.address} ${document.customer_id.city}, ${document.customer_id.state}, ${document.customer_id.zip_code}`,
        totalAmount: document.total_amount,
        orderItems: document.order_item,
        deliveryUrl: `${process.env.HOST}/order-tracking?orderId=${orderId}`,
        customerEmail: document.customer_id.email
      }

      await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/sendmail?final=true`, {
        method: 'POST',
        body: JSON.stringify(orderDetails)
      })
    }
    return NextResponse.json({ success: true, currentStatus });
  } catch (error) {
    return getError(error);
  }  
}



const createAndUpdateStatus = async (currentStatus: any, statusId?: any) => {
  //create status
 try {
   let orderStatus:any;
   
   if(statusId){ //update status
  
     orderStatus = await db.updateDocument(
       process.env.APPWRITE_DATABASE_ID as string, // database id
       process.env.APPWRITE_STATUS_ID as string,
       statusId, // document id
       { 
         // date is the only thing to be updated
         date: getStringDate(),
       }
      )
   }else{ //create new status
     orderStatus = await db.createDocument(
     process.env.APPWRITE_DATABASE_ID as string, // database id
     process.env.APPWRITE_STATUS_ID as string,
     ID.unique(),
     {
       currentStatus,
       date: getStringDate(),
     }
    )
   }
    
    return orderStatus;
 } catch (error) {
   return getError(error)
 }
}