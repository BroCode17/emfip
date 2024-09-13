'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Check, Truck, Calendar, ArrowRight } from 'lucide-react'
import { formatToLocaleCurrency, getFormattedFutureDate } from '@/lib/utils'
import { useAppContext } from '@/components/_context/appcontext'

export default function OrderConfirmation() {
  // In a real application, you would fetch this data from your backend
  const {cartItems, totalAmount} = useAppContext()

  const orderDetails = {
    orderNumber: '12345',
    estimatedDelivery: 'June 15, 2023',
    items: [
      { name: 'Wool Dryer Balls', quantity: 6, price: 19.99 },
    ],
    total: 19.99,
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{orderDetails.orderNumber}</dd>
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
              <div className="mt-4 bg-blue-50 rounded-lg py-6 px-4 sm:px-6">
                <div className="flex items-center">
                  <Truck className="h-6 w-6 text-blue-600 mr-3" />
                  <p className="text-sm text-blue-700">
                    We&apos;re preparing your Wool Dryer Balls for shipment. You&apos;ll receive a shipping confirmation email with tracking information once your order is on its way.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}