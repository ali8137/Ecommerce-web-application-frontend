// import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { mainCarouselData } from './mainCarouselData'
// both imports above are from https://www.npmjs.com/package/react-alice-carousel


// const items = [
//   <div className="item" data-value="1" key="1"
//     > 1
//   </div>,
//   <div className="item" data-value="2" key="2"
//     > 2
//   </div>,
//   <div className="item" data-value="3" key="3"
//     > 3
//   </div>,
//   <div className="item" data-value="4" key="4"
//     > 4
//   </div>,
//   <div className="item" data-value="5" key="5"
//     > 5
//   </div>,
// ]
// // for the above array, when copying it from react-alice-carousel website, we must add key={index}
// // the reason why we must add the key prop above is because the above array is an array of jsx components. that's why there must be a key prop for each jsx component

const images = mainCarouselData.map((image) => <img className='cursor-pointer w-[100vw] h-[70vh] pt-3 rounded-xl object-auto' 
  role ="presentation" src={image.imageSrc} alt={image.imageAlt} key={image.id} />
  // role="presentation" is just part of aria to display the role of the component for someone who has a disability, I am not sure though
)

const MainCarousel = () => {
  
  return (
  <AliceCarousel
    // mouseTracking
    infinite
    autoPlay
    // autoPlay will happen as long as the mouse is not ont the carousel component
    autoPlayInterval={1000}
    animationDuration={1000}
    // disableDotsControls
    disableButtonsControls
    // responsive={{
    //   0: {
    //     items: 1
    //   },
    //   1024: {
    //     items: 1
    //   }
    // }}
    items={images}
  />)
}


export default MainCarousel