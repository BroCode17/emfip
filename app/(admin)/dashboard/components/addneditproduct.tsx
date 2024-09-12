'use client'
import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { DialogDescription } from '@radix-ui/react-dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { ErrorMap, Product, ProductActionType } from '@/lib'


export interface ProductFromDB {
  $id?: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string[];
}

interface ProductFormProps {
  product?: ProductFromDB;
  onSubmit: (product: Product, action?: string) => void;
  onClose: () => void;
  showDeleteModal?: boolean,
  isError?: string;
  allErrors: ErrorMap
}

export function ProductForm({ product, onSubmit, showDeleteModal, onClose, isError, allErrors }: ProductFormProps) {

  const [formData, setFormData] = useState<Product>({
    name: product?.name || '',
    price: product?.price || 0,
    stock: product?.stock || 0,
    description: product?.description || '',
    image: undefined,
  })
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(product?.image[1] || '')
  const fileInputRef = useRef<HTMLInputElement>(null)


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev: any) => ({ ...prev, image: file }))
      setPreviewUrl(URL.createObjectURL(file))
      setError(null)
    }

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    //Check if showDeleteModal is true || product is present
    // This founction is for update and delete
    if (product) {

      formData.id = product?.$id // document id
      formData.imageId = product.image[0] // image id
      // Case for delete
      if (showDeleteModal) {
        //add the id field
        onSubmit(formData, 'delete')
        return;
      }
      // Case for update
      onSubmit(formData, 'update')
      return
    }


    //make some validation
    const isErrorFound = Object.values(formData).some((value) => value === '' || value === undefined)
    if (!product && isErrorFound) {
      setError('All field are required')
      return;
    }

    onSubmit(formData as any)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      {error || isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error ? error : isError}</AlertDescription>
        </Alert>
      )}
      {showDeleteModal ? <div>

        <Label htmlFor="name">Confirm Item to be deleted name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div> :
        <>
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`${allErrors.has('name') && 'border-destructive'}`}
            />
            {allErrors.has('name') && <p className='text-xs text-destructive'>{allErrors.get('name')}</p>}
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
              className={`${allErrors.has('price') && 'border-destructive'}`}
            />
            {allErrors.has('price') && <p className='text-xs text-destructive'>{allErrors.get('price')}</p>}
          </div>
          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              required
              className={`${allErrors.has('stock') && 'border-destructive'}`}
            />
            {allErrors.has('stock') && <p className='text-xs text-destructive'>{allErrors.get('stock')}</p>}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className={`${allErrors.has('description') && 'border-destructive'}`}
            />
            {allErrors.has('description') && <p className='text-xs text-destructive'>{allErrors.get('description')}</p>}
          </div>

          <div className='w-full'>
            <Label htmlFor="image" className='mr-4'>Product Image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              {product ? 'Change Image' : 'Select Image'}
            </Button>
            {allErrors.has('image') && <p className='text-xs text-destructive'>{allErrors.get('image')}</p>}
            {previewUrl && (
              <div className="mt-2">
                <img src={previewUrl} alt="Product preview" className="w-32 h-32 object-cover rounded" />
              </div>
            )}
          </div>
        </>
      }

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" className={`${showDeleteModal && 'bg-red-500 font-bold'}`}>{showDeleteModal ? 'Delete' : product ? 'Update Product' : 'Add Product'}</Button>
      </div>
    </form>
  )
}

interface ProductModalProps {
  product?: ProductFromDB;
  showDeleteModal?: boolean;
  onSubmit: (product: Product, action?: string) => void
  isError?: string,
  allErrors: ErrorMap
}

export function ProductModal({ product, onSubmit, showDeleteModal, isError, allErrors }: ProductModalProps) {
  const [isOpen, setIsOpen] = useState(false)



  const handleSubmit = (product: Product, action?: string) => {
    onSubmit(product, action)
    //setIsOpen(false)
  }


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className={`mx-auto`}>
        {product ? <span role='button' onClick={() => setIsOpen(true)} className={`${showDeleteModal && 'text-white font-bold'}`}>{showDeleteModal ? 'Delete' : 'Edit'}</span> :
          <Button >Add New Product</Button>
        }

      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{showDeleteModal ? 'Delete Product' : product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>

        <DialogDescription className='sr-only'>Product Form</DialogDescription>
        <ProductForm
          product={product}
          onSubmit={handleSubmit}
          onClose={() => setIsOpen(false)}
          showDeleteModal={showDeleteModal}
          isError={isError}
          allErrors={allErrors}
        />

      </DialogContent>
    </Dialog>
  )
}
