
import Tracking from '@/components/order-tracking'
import React from 'react'

const OrderTracking = ({searchParams}: {searchParams: {orderId: string}}) => {
  
  
  return <section className='flex h-screen w-full items-center  bg-gradient-to-t from-lightAlmond to-gray-100'>
  <div className='md:w-[500px]   mx-auto'>
  <Tracking/>
  </div>
  </section>
}

export default OrderTracking