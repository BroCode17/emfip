import React from 'react'
import Stripe from 'stripe'
import CheckoutForm from './_stripe/checkoutform';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

//create stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type PaymentType = {
  totalAmount: number;
}

const Payment = async ({params, searchParams} : { params: {amount: string}, searchParams?: {[key:string]: string[] | undefined}}) => {
  const c = cookies()
  const state = JSON.parse(c.get('state')!.value)
  if(!state){
    return
  }
  //create payment intent
  // 19.90 * 100 => 1989.9999999999998
  // unless toFixed() is apply to get 1990
  const totalAmount =Number(( state.totalAmount * 100).toFixed(2))

  console.log(totalAmount)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount,
    currency: 'USD',
    metadata: {},
    automatic_payment_methods: {enabled: true}
  })


  if(paymentIntent.client_secret === null){
    throw Error('Stripe failed to create payment')
  }

  return (
    <div className=" pb-10 w-full flex flex-col justify-center items-center h-screen gap-3  bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">

    <CheckoutForm clientSecret={paymentIntent.client_secret} state={state} />
  </div>
  )
}

export default Payment
