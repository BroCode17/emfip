'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Plus, Minus, X, DeleteIcon, Trash2 } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import { useInViewContext } from './inviewcontext'
import { useAppContext } from './_context/appcontext'
import { OrderItem } from '@/lib'
import { formatToLocaleCurrency } from '@/lib/utils'

export default function Cart() {
  const {cartItems, updateItemQuantity, totalAmount, removeFromCart} = useAppContext()
  const [isOpen, setIsOpen] = useState(false)
  // Get checkout context
  const { setShowCheckout } = useInViewContext();

  const shippingCost: number = 0 // Free shipping

  const incrementQuantity = (product: OrderItem) => {

    updateItemQuantity(product, product.quantity + 1)
  }
  const decrementQuantity = (product: OrderItem) => updateItemQuantity(product, Math.max(1, product.quantity -1))
  const proceedToCheckout = () => {
    setIsOpen(false)
    setShowCheckout(true)

  }


  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className='bg-lightAlmond/90'>
        <SheetHeader>
          <SheetTitle className='tracking-tighter font-bold '>Your Cart</SheetTitle>
          <SheetDescription>Review your items before checking out</SheetDescription>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <div className="mt-8 space-y-4">
            {
              cartItems.map((item:OrderItem) => (
                <div className="flex items-center justify-between bg-white rounded-lg px-4" key={item.$id}>
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.image[1]}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item?.set || 'Set of 6'}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center  py-2 space-y-1 w-1/3">
                   <div className='flex w-full gap-2'>
                   <Button variant="outline" size="icon" onClick={() => incrementQuantity(item)} className='w-1/2'>
                    <Plus className="h-4 w-4" />
                  </Button>
                   <Button variant="outline" size="icon" onClick={() => decrementQuantity(item)} className='w-1/2'>
                    <Minus className="h-4 w-4" />
                  </Button>
                   </div>
                   <Button asChild variant='outline'>
                   <span
                    className="w-full text-center cursor-not-allowed focus-within:cursor-not-allowed "
                  >{item.quantity}</span>
                   </Button>
                   <Button variant="destructive" size="icon" onClick={() => removeFromCart(item)} className='w-full'>
                    <Trash2 className="h-4 w-4" />
                  </Button>

                </div>
              </div>
              ))
            }
            <div className="border-t-2 border-black  pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatToLocaleCurrency(Number(totalAmount || 0.0))}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between mt-2 font-bold">
                <span>Total</span>
                <span>{formatToLocaleCurrency(Number(totalAmount || 0.0))}</span>
              </div>
            </div>
            <Button className="w-full mt-4" onClick={proceedToCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="font-medium text-lg mb-2">Your cart is empty</h3>
            <p className="text-gray-500 text-center mb-4">Add some eco-friendly wool dryer balls to get started!</p>
            <Button onClick={() => setIsOpen(false)}>Continue Shopping</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
