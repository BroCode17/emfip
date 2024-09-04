import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Leaf, Clock, Zap } from "lucide-react"
import AutoSlidingSlider from "./slider"
import { infinityScrollImages } from "@/utils/data";
import { ReviewForm } from "./reviewbox";
import { cn } from "@/lib/utils"
import Image from "next/image"
import DraggableView360 from "./dragableview"
import ProceedToCheckoutModal from "./checkoutdialog"
import ShowCaseSlider from "./showcaseslider"

const SectionWrapper = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => {
  return <section className={cn(`max-w-[1200px] mx-auto px-4 md:px-6`, className)} id={id}>
    {children}
  </section>
}


export default function Main() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="z-40">
        <ProceedToCheckoutModal />
      </div>
      <main className="flex-1">
        <SectionWrapper className="h-[500px]">
          <div className="h-[400px] flex items-center">
            <div className=" ">
              <h3 className="text-gray-500">Eco-Friendly Laundry Solutions</h3>
              <h1 className="base-header -ml-1">Empfip Wool Dryer Balls</h1>
              <p className="mt-10">Make your laundry softer, reduce drying time, and save money with our eco-friendly wool dryer balls.</p>
            </div>
          </div>
        </SectionWrapper>
        <SectionWrapper className="space-y-10">
          <div className="space-y-2">
            <div className="flex gap-1">
              <svg
                className="w-8 h-auto fill-zinc-900 dark:fill-zinc-50 md:w-10 max-lg:self-end bg-amber-200"
                viewBox="0 0 35 36"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: 'none' }}
              >
                <path d="M17.833 35.056C15.337 26.509 9.379 21.045 0.740997 17.964C10.633 16.295 15.641 9.936 17.833 0.873001C21.825 10.05 27.402 15.993 34.925 17.964C26.459 21.374 20.738 27.052 17.833 35.056Z"></path>
              </svg>
              <h1 className="base-header">Softer Laundry, Naturally</h1>
              <svg
                className="w-11 h-auto fill-zinc-900 dark:fill-zinc-50 md:w-13 max-lg:self-start bg-amber-200 "
                viewBox="0 0 30 31"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.6591 0.630493C11.0871 7.12849 7.49706 11.6875 0.40506 12.8845C6.59706 15.0935 10.8691 19.0105 12.6591 25.1385C14.7411 19.4005 18.8431 15.3295 24.9131 12.8845C19.5201 11.4705 15.5211 7.21049 12.6591 0.630493Z"
                  style={{ transform: 'none', transformOrigin: '12.6591px 12.8845px' }}
                ></path>
                <path
                  d="M23.511 18.045C22.714 21.338 20.895 23.648 17.301 24.255C20.439 25.374 22.604 27.359 23.511 30.464C24.566 27.556 26.645 25.494 29.721 24.255C26.988 23.538 24.961 21.379 23.511 18.045Z"
                  style={{ transform: 'none', transformOrigin: '23.511px 24.2545px' }}
                ></path>
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-10">Discover the benefits of our wool dryer balls. Eco-friendly, cost-effective, and perfect for every load.</p>
          </div>
          <AutoSlidingSlider images={infinityScrollImages} />
        </SectionWrapper>
        <SectionWrapper className="w-full py-12 md:py-24 lg:py-32 xl:py-48 sm:flex sm:justify-center">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-[1fr_400px] md:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                alt="Wool Dryer Balls"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                src="/images/product.jpg"
                width={600}
                height={600}
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Eco-Friendly Wool Dryer Balls
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Reduce drying time, save energy, and soften your clothes naturally with our premium wool dryer balls.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 fill-primary" />
                  <Star className="w-5 h-5 fill-primary" />
                  <Star className="w-5 h-5 fill-primary" />
                  <Star className="w-5 h-5 fill-primary" />
                  <Star className="w-5 h-5 fill-primary" />
                  <span className="text-sm font-medium">4.9 (2,354 reviews)</span>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <a href="#buy-now">
                    <Button className="w-full">Buy Now</Button>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </SectionWrapper>
        {/* <DraggableView360 images={infinityScrollImages} height={600} width={600} /> */}
        {/* Benefits */}
        {/* Product ShowCase */}

        <ShowCaseSlider />

        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container  max-w-[1200px] mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">Benefits</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Leaf className="w-12 h-12 text-green-500" />
                <h3 className="text-xl font-bold">Eco-Friendly</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  100% natural and biodegradable, reducing plastic waste from dryer sheets.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Clock className="w-12 h-12 text-blue-500" />
                <h3 className="text-xl font-bold">Time-Saving</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Reduces drying time by up to 25%, saving you time and energy.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Zap className="w-12 h-12 text-yellow-500" />
                <h3 className="text-xl font-bold">Static Reducer</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Naturally reduces static cling without the use of chemicals.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* How to use */}
        <section className="bg-gray-100">
          <SectionWrapper id="how-to-use" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">How to Use</h2>
              <ol className="space-y-4 list-decimal list-inside">
                <li className="text-lg">Add 3-6 wool dryer balls to your dryer with your wet laundry.</li>
                <li className="text-lg">Run your dryer as normal, but check it earlier as drying time may be reduced.</li>
                <li className="text-lg">Remove your laundry and enjoy softer, less static-prone clothes!</li>
                <li className="text-lg">Store the wool dryer balls in a dry place for next use.</li>
              </ol>
            </div>
          </SectionWrapper>
        </section>
        {/* Buy Now */}
        <section id="buy-now" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <SectionWrapper>
            <div className="container">
              <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Make the Switch?</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Get your set of 6 premium wool dryer balls today and start enjoying softer, faster-drying laundry while
                    reducing your environmental impact.
                  </p>
                </div>
                <div className="flex flex-col space-y-4 lg:justify-center">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Eco-Friendly Wool Dryer Balls</h3>
                    <p className="text-xl font-bold">$19.99</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Set of 6 | Free Shipping</p>
                  </div>
                  <div className="space-y-2">
                    <Input placeholder="Enter your email" type="email" />
                    <Button className="w-full">Add to Cart</Button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    30-day money-back guarantee. No questions asked.
                  </p>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </section>
        {/* Add review Section */}
        {/* <SectionWrapper>
          <ReviewForm />
        </SectionWrapper> */}
      </main>

    </div >
  )
}
