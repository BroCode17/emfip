'use client'
import { useState, useEffect } from 'react'
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
import { X } from "lucide-react"
import { DialogDescription } from '@radix-ui/react-dialog'

interface Product {
  id?: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
}

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Product | string) => void;
  onClose: () => void;
  showDeleteModal?: boolean
}

export function ProductForm({ product, onSubmit, showDeleteModal, onClose }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    image: '',
  })

  useEffect(() => {
    if (product) {
      setFormData(product)
    }
  }, [product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    //Check if showDeleteModal is true
    if (showDeleteModal) {
      onSubmit(product?.id!)
      return;
    }
    onSubmit(formData)

  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
            />
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
            />
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
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
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
  product?: Product;
  showDeleteModal?: boolean;
  onSubmit: (product: Product | string) => void;
}

export function ProductModal({ product, onSubmit, showDeleteModal }: ProductModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (formData: Product | string) => {
    onSubmit(formData)
    setIsOpen(false)
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
        />

      </DialogContent>
    </Dialog>
  )
}
