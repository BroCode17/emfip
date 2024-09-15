import { notFound } from 'next/navigation'
import React from 'react'
import Stripe from 'stripe'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const SuccessPaymentPage = async ({searchParams} : {searchParams : {payment_intent: string}}) => {
    const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent)

    if(paymentIntent.metadata.orderReference === null) return notFound()

    //check for order refresh in db

    const isSuccess = paymentIntent.status === 'succeeded'

  return (
    <div>{isSuccess ? "Success" : " Error"}</div>
  )
}

export default SuccessPaymentPage