import { Client, Databases, ID, Storage } from "node-appwrite";
import { NextRequest, NextResponse } from "next/server";
import {object, string, z} from 'zod'
import { getError } from "@/lib/logger";

const createProductImageSchema = z.instanceof(File, {message: 'Required'}).refine((file:File) => file.size === 0 || file.type.startsWith('image/'))

const imageSchema = z.instanceof(File, { message: 'Required' })
  .optional() // Mark the image field as optional
  .refine(
    (file?: File) => {
      if (!file) return true; // If no file, it's optional, so pass
      return file.size === 0 || file.type.startsWith('image/'); // Validate if file exists
    },
    { message: 'Invalid file type' }
  );

const imageObj = z.instanceof(File, {message: 'Image is required'})

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
  image: z.any().optional()
})



const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.coerce.number().min(5, 'Price must be greater than or equal $5'),
  stock: z.coerce.number().min(1, 'Stock must be greater than or equal 1'),
  image: createProductImageSchema.refine((file:File) => file.size > 0, 'Required').optional()
})

//get all product
export async function GET(request: NextRequest){

  // For all product
  return getAllProducts();
}

/**
 * @param request
 * @returns success or error
 */
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
  const imageId = request.nextUrl.searchParams.get('imageId')
  const documentId:any = response.get('id')
  const validateObj = editProductSchema.safeParse(Object.fromEntries(response.entries()))

  if(!validateObj.success){
    const error = validateObj.error?.formErrors.fieldErrors
    return NextResponse.json({success: false, error})
  }
  return updateProduct(validateObj.data, documentId, imageId!)
}


export async function DELETE(request: NextRequest){
  const searchParams = request.nextUrl.searchParams;
  const imageId = searchParams.get('imageId')
  const documentId = searchParams.get('productId')

  return deleteProduct(documentId!, imageId!)

}
async function imageUploader(type: ImageActionType, imageObject?: any, imageId?: string) {
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
          await storage.deleteFile(
            process.env.APPWRITE_IMAGE_COLLECTION_ID as string,
            imageId!,
          )
          result = await storage.createFile(
            process.env.APPWRITE_IMAGE_COLLECTION_ID as string,
              ID.unique(),
              imageObject,
            )
          break;
        default:
          await storage.deleteFile(
            process.env.APPWRITE_IMAGE_COLLECTION_ID as string,
            imageId!,
          )
          break;
      }
      // ['role:member'],

    return {imageId: result?.$id, imageUrl: getImageUrl(result?.$id as string)}
  } catch (error) {
    console.log(error)
    return getError(error)
  }
}


async function createProduct(product: any){
  try {
     const {imageId, imageUrl} = await imageUploader
      (ImageActionType.UPLOAD, product.image) as any

      await db.createDocument(
        process.env.APPWRITE_DATABASE_ID as string,
        process.env.APPWRITE_PRODUCTS_COLLECTION_ID as string,
        ID.unique(),
        {
          name: product.name,
          image: [imageId, imageUrl],
          price: product.price,
          stock: product.stock,
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
async function updateProduct(product: any, documentId:string, imgId: string){
  try {
    const {name, price, stock, description} = product
    const objectToBeUpdated:any = {
      name,
      price,
      stock,
      description
    }
    // Because of zod validation ->
    // this is how checking for underfined must be implemented
    if( [product.image][0] !== 'undefined'){
      const {imageId, imageUrl } = await imageUploader(ImageActionType.UPDATE, product.image, imgId) as any
      objectToBeUpdated.image = [imageId, imageUrl]
    }
    const res = await db.updateDocument(
      process.env.APPWRITE_DATABASE_ID as string,
      process.env.APPWRITE_PRODUCTS_COLLECTION_ID as string,
      documentId,
      {...objectToBeUpdated}
    )
    return NextResponse.json({success: true, message: 'Product updated successfully'})
  } catch (error) {
    console.log(error)
    return getError(error)
  }
}

// Get image url
const getImageUrl = (imageId: string) => {
  return `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_IMAGE_COLLECTION_ID}/files/${imageId}/preview?project=${process.env.APPWRITE_PROJECT_KEY}`
}

// Delete document
async function deleteProduct(ducomentId: string, imageId: string) {
  try {

    //delete image
    imageUploader(ImageActionType.DELETE, null , imageId)
    const res = await db.deleteDocument(
      process.env.APPWRITE_DATABASE_ID as string,
      process.env.APPWRITE_PRODUCTS_COLLECTION_ID as string,
      ducomentId
    )
    return NextResponse.json({res})
  } catch (error) {
    console.log(error)
    return getError(error)
  }
}
