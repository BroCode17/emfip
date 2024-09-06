import { getError } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { Client, Databases, ID} from "node-appwrite";

//create client
const client = new Client()
.setEndpoint(process.env.APPWRITE_END_POINT!)
.setProject(process.env.APPWRITE_PROJECT_KEY!);

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
    const data = await request.json()
    const customerObject = data.customers;
    const orderObjext = data.orders;

  const customerDoc = await database.createDocument(
    process.env.APPWRITE_DATABASE_ID as string, // database id
   process.env.APPWRITE_CUSTOMERS_COLLECTION_ID as string, //collection id
    ID.unique(),
    customerObject
  )

  await database.createDocument(
    process.env.APPWRITE_DATABASE_ID as string, // database id
   process.env.APPWRITE_ORDER_COLLECTION_ID as string, //collection id
    ID.unique(),
    {
      customer_id: customerDoc.$id,
      ...orderObjext
    }
  )
  return NextResponse.json({crated: true})
  } catch (error) {
    console.error(error);
    return NextResponse.json({crated: false})
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
