import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 670, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
}

export const ImageSlider = (props) => {

  return (

    <Carousel
      swipeable={true}
      draggable={false}
      minimumTouchDrag={80}
      arrows={true}
      slidesToSlide={3}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all 1.5s ease-in-out"
    >
      {props.children}
    </Carousel >
  )
}
