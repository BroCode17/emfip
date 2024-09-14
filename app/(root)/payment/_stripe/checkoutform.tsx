"use client";
import { useAppContext } from "@/components/_context/appcontext";
import { Button } from "@/components/ui/button";
import { formatToLocaleCurrency, generateOrderId } from "@/lib/utils";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Home } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";



import React, { FormEvent, useEffect, useState } from "react";
type CheckoutFormProps = {
  product?: {};
  clientSecret: string;
  id?: number;
  state: any;
  orderId: string;
};


const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);


const CheckoutForm = ({ clientSecret, state, orderId }: CheckoutFormProps) => {
 useEffect(() => {

 }, [clientSecret])
  return (
    <Elements
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: 'black',
            focusBoxShadow: ''
          }
        },
      }}
      stripe={stripePromise}
    >

      <Form state={state} orderId={orderId}/>
    </Elements>
  );
};

export default CheckoutForm;


const appearance = {
    rules: {
      '.Tab': {
        border: '2px solid #E0E6EB',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)',
      },

      '.Tab:hover': {
        color: 'var(--colorText)',
      },

      '.Tab--selected': {
        borderColor: '#E0E6EB',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)',
      },

      '.Input--invalid': {
        boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)',
      },

      // See all supported class names and selector syntax below
    }
  };

function Form({state, orderId}: {state:any, orderId: string}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();
  const{totalAmount} = useAppContext()
  //customize the appearance
  stripe?.elements({appearance})


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (stripe === null || elements === null || email === null) return;

    setIsLoading(true);
    
    Cookies.set('orderId', orderId)
    //Check for existing orders
    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // return_url: `${process.env.NEXT_PUBLIC_SERVER_URL  || 'https://amoarte.online'}/thankyou`,
         return_url: `http://localhost:3000/thankyou/${orderId}`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unkown error occured");
        }
      })
      .finally(() => setIsLoading(false));
  };

  if(!stripe || !elements){
    return <div>Loading...</div>
  }
  return (
    <>
    <PaymentHeader />
    <form onSubmit={handleSubmit} className="w-[400px] border rounded-md border-muted-foreground p-6">
      {errorMessage && <div className="text-destructive">{errorMessage}</div>}
      {stripe && elements && (
        <>
        <PaymentElement />
        <div className="mt-3">
          <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />
        </div>
        <div className="mt-4 ">
          <Button
            className={`w-full bg-primary text-white ${
              isLoading && "bg-muted-foreground p-4 h-full rounded-sm"
            }`}
            disabled={stripe === null || elements === null}
          >
            {isLoading ? "Processing..." : `Pay ${formatToLocaleCurrency(state.totalAmount)}`}
          </Button>
        </div>
        </>
      )}
    </form>
    </>
  );
}

export const PaymentHeader = () => {
  return (
    <div className="w-[400px] flex justify-between ">
      <h1 className="base-header text-3xl border-r border-primary pr-10 rounded-md">Payment</h1>
      <Button variant='ghost' asChild className="border-l border-primary pl-10 hover:bg-white">
       <Link href='/' className="hover:bg-none">
       <Home />
       &nbsp;Go Home
       </Link>
      </Button>
    </div>
  )
}
