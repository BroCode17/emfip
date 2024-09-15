'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface SmoothScrollLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

const SmoothScrollLink: React.FC<SmoothScrollLinkProps> = ({ href, children, className }) => {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // Push the href to the router to update the URL
    router.push(href)

    // Extract the id from the href
    const id = href.split('#')[1]
    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}

export default SmoothScrollLink
