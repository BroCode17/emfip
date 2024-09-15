'use client'
import { Phone } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
import LegalLinks from './legal-link'

const Footer = () => {
  const pathname = usePathname()

  if(pathname.includes('/payment'))
    return
  return (
    <>
      <footer className=" flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-100">
        <p className="text-xs text-gray-500 dark:text-gray-400 flex">© 2024 Emfip LLC. All rights reserved | 
          <a href='tel:+1-902-241-3443' className='flex ml-1 cursor-pointer '>
            <Phone size={16} />
             +1 (902)-241-3443
            </a>
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
         <LegalLinks />
        </nav>
      </footer>
    </>
  )
}

export default Footer
