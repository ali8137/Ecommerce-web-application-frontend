import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { mainCarouselData } from './mainCarouselData'

const images = mainCarouselData.map((image) => (
  <img
    className="cursor-pointer w-[100vw] h-[70vh] pt-3 rounded-xl object-auto"
    role="presentation"
    src={image.imageSrc}
    alt={image.imageAlt}
    key={image.id}
  />
))

const MainCarousel = () => {
  return (
    <AliceCarousel
      // mouseTracking
      infinite
      autoPlay
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
    />
  )
}

export default MainCarousel
