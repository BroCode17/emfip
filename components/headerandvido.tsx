'use client'
import React from 'react'
import Header from './header'
import AutoPlayVideoSlider from './videobanner'
import { useInViewContext } from './inviewcontext'

const HeaderAndVideo = () => {
  const { isVideoVisible } = useInViewContext()
  console.log(isVideoVisible)
  return (
    <>
      <Header />
      <AutoPlayVideoSlider />
    </>
  )
}

export default HeaderAndVideo
