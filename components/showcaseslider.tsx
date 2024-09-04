'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const carouselItems = [
  {
    image: "1",
    alt: "Wool dryer balls in action",
    title: "Efficient Drying",
    description: "Reduce drying time by up to 25%"
  },
  {
    image: '2',
    alt: "Soft fabrics",
    title: "Natural Softener",
    description: "Soften your clothes without chemicals"
  },
  {
    image: "3",
    alt: "Eco-friendly laundry",
    title: "Eco-Friendly",
    description: "Reduce your carbon footprint"
  }
]

const ShowCaseSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselItems.length) % carouselItems.length)
  }
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex justify-center">
      <div className="container px-4 md:px-6 space-y-10">
        <h2 className="base-header text-center ">Product Showcase</h2>
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {carouselItems.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <img
                    src={`/images/products/${item.image}.jpg`}
                    alt={item.alt}
                    className="w-full md:w-1/2 h-[600px] object-contain rounded-lg"
                  />
                  <div className="md:w-1/2 text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div className="flex justify-center mt-4">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 mx-1 rounded-full ${currentSlide === index ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShowCaseSlider
