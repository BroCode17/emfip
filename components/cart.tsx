'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Plus, Minus, X } from "lucide-react"
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

export default function Cart() {
  const [quantity, setQuantity] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  // Get checkout context
  const { setShowCheckout } = useInViewContext();

  const productPrice = 19.99
  const shippingCost = 0 // Free shipping

  const incrementQuantity = () => setQuantity(q => q + 1)
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1))
  const proceedToCheckout = () => {
    setIsOpen(false)
    setShowCheckout(true)

  }
  const subtotal = productPrice * quantity
  const total = subtotal + shippingCost

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {quantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {quantity}
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
        {quantity > 0 ? (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between bg-white rounded-lg px-4">
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/woooo.jpg"
                  alt="Wool Dryer Balls"
                  width={40}
                  height={40}
                  className="w-16 h-16 rounded-md object-cover"

                />
                <div>
                  <h3 className="font-medium">Eco-Friendly Wool Dryer Balls</h3>
                  <p className="text-sm text-gray-500">Set of 6</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center  py-2 space-y-1">
                <Button variant="outline" size="icon" onClick={decrementQuantity}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full text-center"
                />
                <Button variant="outline" size="icon" onClick={incrementQuantity}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="border-t-2 border-black  pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between mt-2 font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
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
