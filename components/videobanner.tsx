'use client'
import React, { useState, useEffect, useRef } from 'react'
import { InView } from 'react-intersection-observer'
import { useInViewContext } from './inviewcontext'
type Video = {
  id: string
  src: string
  title: string
}

const videos: Video[] = [
  { id: '1', src: '/video/v2.mp4', title: 'Emfip Woll Dryer Balls' },
  // { id: '2', src: '/placeholder.svg?height=400&width=600', title: 'New Arrivals' },
  // { id: '3', src: '/placeholder.svg?height=400&width=600', title: 'Best Sellers' },
]

export default function AutoPlayVideoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const { isVideoVisible, setIsVideoVisible } = useInViewContext()
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        nextVideo()
      }, 5000) // Change video every 5 seconds
      return () => clearInterval(interval)
    }
  }, [currentIndex, isPlaying])

  useEffect(() => {
    videoRefs.current[currentIndex]?.play()
    return () => {
      videoRefs.current[currentIndex]?.pause()
    }
  }, [currentIndex])

  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
  }

  const prevVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (isPlaying) {
      videoRefs.current[currentIndex]?.pause()
    } else {
      videoRefs.current[currentIndex]?.play()
    }
  }

  return (
    <div className="relative w-full lg:max-h-[600px]">
      <InView as='div' onChange={(inView, entry) => setIsVideoVisible(inView)}>
        <div className="aspect-video overflow-hidden h-full">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`absolute inset-0 transition-opacity duration-300 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                } w-full -z-1`}
            >
              <video
                ref={(el: any) => (videoRefs.current[index] = el)}
                src={video.src}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                aria-label={video.title}
              />
              {/* <div className='top-1/2 flex lg:ml-[360px] absolute z-1 '>
                            <h1 className='text-lightCream text-5xl font-bold hover:hero-text transition duration-75'>Emfip Wool Dryer Balls</h1>
                        </div> */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8 ">
                {/* <h2 className=" text-xl font-bold text-lightAlmond">{video.title}</h2> */}
              </div>
            </div>
          ))}
        </div>
        {/* <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={prevVideo}
                    aria-label="Previous video"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={togglePlayPause}
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? (
                        <Pause className="h-4 w-4" />
                    ) : (
                        <Play className="h-4 w-4" />
                    )}
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={nextVideo}
                    aria-label="Next video"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div> */}
      </InView>
    </div>
  )
}
