'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface DraggableView360Props {
  images: any[]
  width: number
  height: number
}

export default function DraggableView360({ images, width, height }: DraggableView360Props) {
  const [currentPosition, setCurrentPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>()

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false)
    const handleTouchEnd = () => setIsDragging(false)

    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchend', handleTouchEnd)
      cancelAnimationFrame(requestRef.current!)
    }
  }, [])

  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return

    const deltaX = clientX - startX
    setStartX(clientX)

    setCurrentPosition((prevPosition) => {
      const newPosition = prevPosition - deltaX / 5
      return newPosition - Math.floor(newPosition / images.length) * images.length
    })
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => handleDragStart(e.clientX)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => handleDragMove(e.clientX)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => handleDragStart(e.touches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => handleDragMove(e.touches[0].clientX)

  const getInterpolatedIndices = () => {
    const index1 = Math.floor(currentPosition) % images.length
    const index2 = (index1 + 1) % images.length
    const t = currentPosition % 1
    return { index1, index2, t }
  }

  const { index1, index2, t } = getInterpolatedIndices()

  return (
    <div
      ref={containerRef}
      className="relative cursor-grab active:cursor-grabbing select-none"
      style={{ width: `${width}px`, height: `${height}px` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      role="img"
      aria-label="360 degree view of product"
    >
      <Image
        src={`/images/${images[index1].url}`}
        alt={`Product view ${index1 + 1}`}
        fill
        style={{ objectFit: 'contain', opacity: 1 - t }}
        sizes={`(max-width: ${width}px) 100vw, ${width}px`}
        priority
      />
      <Image
        src={`/images/${images[index2].url}.jpeg`}
        alt={`Product view ${index2 + 1}`}
        fill
        style={{ objectFit: 'contain', opacity: t }}
        sizes={`(max-width: ${width}px) 100vw, ${width}px`}
        priority
      />
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
        Click and drag to rotate
      </div>
    </div>
  )
}
