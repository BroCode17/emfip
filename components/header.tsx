'use client'
import { ShoppingCart } from 'lucide-react'
import React, { useEffect, useState, useRef } from 'react'
import Cart from './cart'
import { useInViewContext } from './inviewcontext'
import { usePathname } from 'next/navigation'
import SmoothScrollLink from './scrolllink'
import Image from 'next/image'

const Header = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const { isVideoVisible } = useInViewContext()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined' && headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight
        const currentScrollY = window.scrollY

        if (currentScrollY <= headerHeight) {
          // Always show the header when at the top of the page
          setIsVisible(true)
        } else if (currentScrollY > lastScrollY) {
          // Hide the header when scrolling down
          setIsVisible(false)
        } else {
          // Show the header when scrolling up
          setIsVisible(true)
        }

        setLastScrollY(currentScrollY)
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

  if(pathname.includes('/payment'))
    return null

  return (
    <header 
      ref={headerRef}
      className={`px-4 lg:px-6 h-14 flex items-center sticky top-0 z-50 w-full 
        ${!isVideoVisible ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' : 'bg-lightAlmond'} 
        transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <a className="flex items-center justify-center" href="/">
        <Image  
          src='/images/logo.png'
          width={64}
          height={60}
          alt='Emfip'
          property='on'
          className='object-contain w-16 h-auto'
        />
        <span className="sr-only">Emfip Wool Laundry Co.</span>
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <SmoothScrollLink className="text-sm font-medium hover:underline underline-offset-4" href="#benefits">
          Benefits
        </SmoothScrollLink>
        <SmoothScrollLink className="text-sm font-medium hover:underline underline-offset-4" href="#how-to-use">
          How to Use
        </SmoothScrollLink>
        <SmoothScrollLink className="text-sm font-medium hover:underline underline-offset-4" href="#buy-now">
          Buy Now
        </SmoothScrollLink>
        <Cart />
      </nav>
    </header>
  )
}

export default Header