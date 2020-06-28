import React from 'react'
import Lottie from 'react-lottie'
import animationData from './21837-movie-clapper-board.json'

export const LoadingAnimation = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <section className="loading-animation">
      <div className="lottie">
        <Lottie 
            options={defaultOptions}
            height="100%"
            width="100%"
          />
      </div>
    </section>
  )
}