'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from '@/hooks/use-toast'
import { useInViewContext } from './inviewcontext'
import { useToast } from './_context/toast/toast-context'
import { useRouter } from 'next/navigation'
import { useAppContext } from './_context/appcontext'


const formSchema = z.object({
  full_name: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  zip_code: z.string().regex(/^\d{5}(-\d{4})?$/, {
    message: "Please enter a valid ZIP code.",
  }),
})

export default function ProceedToCheckoutModal() {
  const { showCheckout, setShowCheckout } = useInViewContext()
  const [isOpen, setIsOpen] = useState(showCheckout || false)
  const router = useRouter()
  const toast = useToast()
  const {updateCustomer, customerInfo, saveState} = useAppContext()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      address: "",
      city: "",
      zip_code: "",
    },
  })

  const handleSetShowCheckout = () => setShowCheckout(false)

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically send the form data to your server
    // and then redirect to the payment page
    // console.log(values)
    updateCustomer(values)

    saveState();
    // Simulate redirect to payment page
    toast?.open("Redirecting to payment page...")
    setTimeout(() => {
      // setIsOpen(false)
      // setShowCheckout(false)
      // router.push('/payment')
      console.log(customerInfo)
    }, 3000)
  }
  if (!showCheckout)
    return

  return (
    <Dialog open={showCheckout} onOpenChange={handleSetShowCheckout}>
      {/* <DialogTrigger asChild>
        <Button variant="default" onClick={() => setIsOpen(true)}>Proceed to Checkout</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px] bg-lightAlmond border-black border">
        <DialogHeader>
          <DialogTitle>Checkout Information</DialogTitle>
          <DialogDescription>
            Please provide your details to proceed to payment.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Bro Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="bro@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="New York" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP Code</FormLabel>
                  <FormControl>
                    <Input placeholder="12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Proceed to Payment</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
