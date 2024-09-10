"use server"
import {z} from 'zod'

const imageSchema = z.instanceof(File, {message: 'Required'}).refine((file:File) => file.size === 0 || file.type.startsWith('image/'))

// Validation
const productSchema = z.object({
  productName: z.string(),
  description: z.string(),
  price: z.coerce.number().min(1),
  stockQuantity: z.coerce.number().int().min(1),
  image: imageSchema.refine((file:File) => file.size > 0, 'Required')
})

export async function addProduct( formData:FormData) {
  console.log("Called", formData)
  //convert the formdata to object
//  const res =  productSchema.safeParse(Object.fromEntries(formData.entries()))
//  if(!res.success ){
//     return res.error.formErrors.fieldErrors
//  }
//  const data = res.data;
//  console.log(data)

}
