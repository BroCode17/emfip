import { getError } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { Client, Databases } from "node-appwrite";

//create client
const client = new Client()
.setEndpoint(process.env.APPWRITE_END_POINT!)
.setProject(process.env.APPWRITE_PROJECT_KEY!);

//create connetion
const database = new Databases(client);


export async function GET(request:NextRequest){
   // Get all customers
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
