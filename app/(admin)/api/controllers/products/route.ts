import { Client, Databases, ID, Storage } from "node-appwrite";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/lib";
import {z} from 'zod'
import { getError } from "@/lib/logger";

const imageSchema = z.instanceof(File, {message: 'Required'}).refine((file:File) => file.size === 0 || file.type.startsWith('image/'))

const imageObj = z.instanceof(Object, {message: 'Image is required'})

// create client
const client = new Client()
.setEndpoint(process.env.APPWRITE_END_POINT as string)
.setProject(process.env.APPWRITE_PROJECT_KEY as string)

// create database object
const db = new Databases(client)

const enum ImageActionType {
  UPLOAD = 'upload',
  UPDATE = 'update',
  DELETE = 'delete',
  GET = 'get'
}

// Validation Schema
const editProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.coerce.number().min(5, 'Price must be greater than or equal $5'),
  stock: z.coerce.number().min(1, 'Stock must be greater than or equal 1'),

})
const productSchema = editProductSchema.extend({
  image: imageSchema.refine((file:File) => file.size > 0, 'Required')
})

//get all product
export async function GET(request: NextRequest){

  // For all product
  return getAllProducts();
}



export async function POST(request: NextRequest){
 const response =  await request.formData();
 const validation = productSchema.safeParse(Object.fromEntries(response.entries()))

 console.log(validation.data)
  if(!validation.success){
   console.log(validation.error.formErrors.fieldErrors);
  }

  return await createProduct(validation.data)
}


// Update route
export async function PUT(request: NextRequest){
  const response = await request.formData();
  const validateObj = editProductSchema.safeParse(Object.fromEntries(response.entries()))
  if(!validateObj.success){
    const error = validateObj.error?.formErrors.fieldErrors
    return NextResponse.json({success: false, error})
  }
  //console.log(validateObj.error?.formErrors.fieldErrors)
  return NextResponse.json({success: true})
}

async function imageUploader(type: ImageActionType, imageObject?: any) {
  const storage = new Storage(client);
  try {
      let result = undefined
      switch (type) {
        case ImageActionType.UPLOAD:
          result = await storage.createFile(
          process.env.APPWRITE_IMAGE_COLLECTION_ID as string,
            ID.unique(),
            imageObject,
          )
          break;
        case ImageActionType.UPDATE:
          break;

        default:
          result = await storage.getFilePreview(
            process.env.APPWRITE_IMAGE_COLLECTION_ID as string,
            '66df10f1002bb5d598a7'
          )
          break;
      }
      // ['role:member'],

    return result
  } catch (error) {
    console.log(error)
    return getError(error)
  }
}


async function createProduct(product: any){
  try {
      const {$id: imageId} = await imageUploader
      (ImageActionType.UPLOAD, product.image)
      const image_url = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_IMAGE_COLLECTION_ID}/files/${imageId}/preview?project=${process.env.APPWRITE_PROJECT_KEY}`
      const result = await db.createDocument(
        process.env.APPWRITE_DATABASE_ID as string,
        process.env.APPWRITE_PRODUCTS_COLLECTION_ID as string,
        ID.unique(),
        {
          product_name: product.name,
          image_url,
          price: product.price,
          stock_quantity: product.stock,
          description: product.description
        }
      )

      return NextResponse.json({success: true, message: 'Product added successfully'})
  } catch (error) {
    console.log(error)
    return getError(error)
  }
}

// Get all product
async function getAllProducts() {
  try {
    const res = await db.listDocuments(
      process.env.APPWRITE_DATABASE_ID as string,
      process.env.APPWRITE_PRODUCTS_COLLECTION_ID as string,
      []
    )
    return NextResponse.json(res)
  } catch (error) {
    return getError(error)
  }
}

//update product
async function updateProduct(product: any){

}
