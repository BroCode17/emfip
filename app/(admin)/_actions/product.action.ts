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
