
'use client'
import { ShoppingCart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Cart from './cart'
import { useInViewContext } from './inviewcontext'

const Header = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const { isVideoVisible } = useInViewContext()

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
          setIsVisible(false)
        } else { // if scroll up show the navbar
          setIsVisible(true)
        }

        // remember current page location to use in the next move
        setLastScrollY(window.scrollY)
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar)
      }
    }
  }, [lastScrollY])
  return (

    <header className={`px-4 lg:px-6 h-14 flex items-center  sticky top-0 z-50 w-full  ${!isVideoVisible ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' : 'bg-lightAlmond'} transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} `}>
      <a className="flex items-center justify-center" href="#">
        <ShoppingCart className="h-6 w-6" />
        <span className="sr-only">Eco Laundry Co.</span>
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <a className="text-sm font-medium hover:underline underline-offset-4" href="#benefits">
          Benefits
        </a>
        <a className="text-sm font-medium hover:underline underline-offset-4" href="#how-to-use">
          How to Use
        </a>
        <a className="text-sm font-medium hover:underline underline-offset-4" href="#buy-now">
          Buy Now
        </a>
        <Cart />
      </nav>
    </header >
  )
}

export default Header
