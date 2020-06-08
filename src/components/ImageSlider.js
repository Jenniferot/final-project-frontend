import React, { useEffect } from 'react'
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
      centerMode
      swipeable={true}
      draggable={false}
      minimumTouchDrag={80}
      arrows={true}
      responsive={responsive}
      ssr={true}
      infinite={false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all 1.5s ease-in-out"
    >
      {props.children}
    </Carousel >
  )
}


/*  <Carousel
      additionalTransfrom={0}
      // autoPlaySpeed={3000}
      swipeable={true}
      draggable={false}
      minimumTouchDrag={80}
      partialVisible
      arrows={true}
      slidesToSlide={3}
      // showDots={true}
      responsive={responsive}
      itemClass="carousel-wrapper"
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      // autoPlay={this.props.deviceType !== "mobile" ? true : false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      // deviceType={this.props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >*/