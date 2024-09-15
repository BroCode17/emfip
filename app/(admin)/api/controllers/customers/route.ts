import { getStringDate } from "@/lib/help";
import { getError } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { Client, Databases, ID, Query} from "node-appwrite";

//create client
const client = new Client().setEndpoint(process.env.APPWRITE_END_POINT!).setProject(process.env.APPWRITE_PROJECT_KEY!);
//create client connetion
const database = new Databases(client);

export async function GET(request:NextRequest){
   // Get all customers
   const  {searchParams}  = new URL(request.url)
  // if search query type is equal to order
  // return the order get all order function
   if(searchParams.get('type') === 'orders')
      return getAllOrders();
  // else return customer function
   return getAllCustomers();
}

//create cutomer -> order
export async function POST(request: NextRequest){
  try {
    //Get data
    const data =  await request.json()
    const customerObject = data.customers;
    const orderObject = data.orders;
    const items = data.orderItems;

    //check if custmer exist

    const existCustomer = await database.listDocuments(
    process.env.APPWRITE_DATABASE_ID as string, // database id
   process.env.APPWRITE_CUSTOMERS_COLLECTION_ID as string, //collection id
   [Query.equal('email', [customerObject.email])]
  )

 let newCustomer;

  if(existCustomer.total === 0){
      newCustomer = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID as string, // database id
     process.env.APPWRITE_CUSTOMERS_COLLECTION_ID as string, //collection id
      ID.unique(),
      customerObject
    )
  }



 // create order items
  let itemNumber = 1;
  const order_item = []
  try {
    for (const item of items) {
      
      const res = await database.createDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_ORDER_ITEM_COLLECTION_ID!,
        // ID.custom('order_item_'+itemNumber.toString()),
        ID.unique(),
        {
          product_id: item.id.toString(),
          quantity: item.quantity,
          price_at_purchase: item.price
        }
      );
  
      order_item.push(res.$id)
      itemNumber++;
    }
  } catch (error) {
    return getError(error)
  }
  
 //create status
 const orderStatus  = await createAndUpdateStatus(orderObject.status);

  const order = await database.createDocument(
    process.env.APPWRITE_DATABASE_ID as string, // database id
   process.env.APPWRITE_ORDER_COLLECTION_ID as string, //collection id
    orderObject.orderId.toString(),
    {
      customer_id: newCustomer ? newCustomer.$id : existCustomer.documents[0].$id,
      order_item: [...order_item],
      order_date: orderObject.order_data,
      total_amount: orderObject.total_amount,
      status: [orderStatus.$id],
    }
  )


  return NextResponse.json({success: true, order: order})
  } catch (error) {
    console.log(error)
    return getError(error)
  }
}


// Help function
/**
 * @returns NextResponse with List of customers document | error object
 */
async function getAllCustomers(){
  try {
    const result = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID as string, // database id
      process.env.APPWRITE_CUSTOMERS_COLLECTION_ID as string, //collection id
      [] // queries
    )
    return NextResponse.json(result);

  } catch (error) {
    return getError(error)
  }
}

/**
 * @returns  NextResponse with List of orders document | error object
 */
async function getAllOrders(){
  try {
    const result = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID as string, // database id
      process.env.APPWRITE_ORDER_COLLECTION_ID as string, //collection id
      [] // queries
    )
    return NextResponse.json(result);

  } catch (error) {
    console.log(error)
    return getError(error)
  }
}

const createAndUpdateStatus = async (currentStatus: any, statusId?: any) => {
   //create status
  try {
    let orderStatus:any;
    
    if(statusId){ //update status
     
      orderStatus = await database.updateDocument(
        process.env.APPWRITE_DATABASE_ID as string, // database id
        process.env.APPWRITE_STATUS_ID as string,
        statusId, // document id
        { 
          // date is the only thing to be updated
          date: getStringDate(),
        }
       )
    }else{ //create new status
      orderStatus = await database.createDocument(
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

// get string date
