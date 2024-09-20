'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Check, Truck, Calendar, ArrowRight } from 'lucide-react'
import { formatToLocaleCurrency, getFormattedFutureDate } from '@/lib/utils'
import { useAppContext } from '@/components/_context/appcontext'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function OrderConfirmation({params} : {params: {orderId: string}}) {
  const router = useRouter()
  const {cartItems, totalAmount, resetState} = useAppContext()
  const[backUpOrderId, setBackUpOrderId] = useState<string>()

 useEffect(() => {
    const od = Cookies.get('orderId');
    if(od && params.orderId){
      setBackUpOrderId(od)
    }
 }, [params.orderId])

 // In case user navigate back instead of user btn
 useEffect(() => {
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    Cookies.remove('state')
    Cookies.remove('orderId');
    sessionStorage.setItem('isNavigatingBack', 'true');
  };

 
  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, []);

 const handleGoHome = () => {
    // Remove dependency cookies from applicaton storage
    Cookies.remove('orderId');
    resetState()
    router.replace('/')
    
 }
  return (
    <div className="min-h-screen bg-gradient-to-tr from-lightAlmond/60 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-center">
              <div className="bg-green-100 rounded-full p-2">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="mt-5 text-center text-3xl font-extrabold text-gray-900 ">
              Thank you for your order!
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              We&apos;re excited for you to start using your new Emfip Wool Dryer Balls!
            </p>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <dl className="divide-y divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Order number</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{params.orderId || backUpOrderId}</dd>
                </div>
                <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Estimated delivery</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      {getFormattedFutureDate(4)}
                    </div>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
              <div className="mt-4 bg-gray-50 rounded-lg py-6 px-4 sm:px-6">
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-200">
                    {cartItems.map((item, index) => (
                      <li key={index} className="flex items-center justify-between py-4">
                        <div className="flex items-center">
                          <Image
                            src={item.image[1]}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="rounded-md"
                          />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{formatToLocaleCurrency(item.price)}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-lg font-bold text-gray-900">{formatToLocaleCurrency(totalAmount)}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900">What&apos;s next?</h2>
              <div className="mt-4 bg-gray-50 rounded-lg py-6 px-4 sm:px-6">
                <div className="flex items-center">
                  <Truck className="h-8 w-8 text-black mr-3" />
                  <p className="text-sm text-black/90">
                    We&apos;re preparing your Wool Dryer Balls for shipment. You&apos;ll receive a shipping confirmation email with tracking information once your order is on its way.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black/90 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"

                onClick={handleGoHome}
              >
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}