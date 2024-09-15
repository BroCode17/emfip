'use client'

import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'

type AutoSlidingSliderProps = {
    images: { url: string }[]
    interval?: number
}

export default function AutoSlidingSlider({ images, interval = 20 }: AutoSlidingSliderProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [scrollPosition, setScrollPosition] = useState(0)

    useEffect(() => {
        const scrollContainer = scrollRef.current
        if (!scrollContainer) return

        const scroll = () => {
            setScrollPosition((prevPosition) => {
                const newPosition = prevPosition + 1
                const maxScroll = scrollContainer.scrollWidth / 2 // Half of the total width due to duplication

                if (newPosition >= maxScroll) {
                    // When we reach the middle, reset to the start without visual jump
                    scrollContainer.scrollLeft = 0
                    return 0
                }
                return newPosition
            })
        }

        const intervalId = setInterval(scroll, interval)

        return () => clearInterval(intervalId)
    }, [interval])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollPosition
        }
    }, [scrollPosition])

    const renderImages = () => {
        // We duplicate the images to create a seamless loop
        return [...images, ...images].map((img, index) => (
            <div key={index} className="flex-shrink-0 w-60 h-40 mx-3 md:w-72 md:h-44">
                <Image
                    src={`/images/${img.url}.jpeg`}
                    alt={`Image ${index % images.length + 1}`}
                    className="w-full h-full object-cover rounded-xl bg-black/5 dark:bg-white/10"
                    width={400}
                    height={400}
                />
            </div>
        ))
    }

    return (
        <div className="relative w-full overflow-hidden">
            <div className="absolute z-10 left-0 bg-gradient-to-r from-lightAlmond  w-1/6 h-full dark:from-black" />
            <div
                ref={scrollRef}
                className="flex overflow-x-hidden"
                style={{ width: '100%', height: '200px' }}
            >
                {renderImages()}
            </div>
            <div className="absolute z-10 top-0 right-0 bg-gradient-to-l from-lightAlmond  dark:from-black   w-1/6 h-full" />
        </div>
    )
}
