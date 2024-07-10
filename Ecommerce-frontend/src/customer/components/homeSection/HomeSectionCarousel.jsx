import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import HomeSectionProduct from './HomeSectionProduct'
import { Button, useMediaQuery } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import { useMemo, useState } from 'react';




const responsive = {
  0: {
    items: 1,
  },
  720: {
    items: 3,
  },
  1024: {
    items: 5.5,
  },
};



// I don't know why the below shows an error, although it is not a react error but I think one of the extensions i have is causing this or vscode itself is causing this
// related to the above note: the issue got solved by adding React.memo as a separate line below 
// React.memo() below prevent the re-rendering of the below component in case its parent re-renders unless the cause of rerendering of the parent component is the prop passed to the below component
const HomeSectionCarousel = (prop) => {

  const {dataObject} = prop;
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  // or method 2 (without using library):
  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // useEffect(() => {
    
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 768);
  //   }


  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize)
  //   }
  // })
  
  // const products = men_shirts.map((product) => <HomeSectionCarouselItem image={product.imageUrl} brand={product.brand} title={product.title} key={product.id} />)
  const products = useMemo(() => dataObject.map((product) => (
    <HomeSectionProduct {...product} key={product.id} />
  )), []);
  // used useMemo() just to improve performance and avoid redoing the same functionality during each re-render
  
  const slidePrev = () => setActiveIndex(activeIndex - 1)
  const slideNext = () => setActiveIndex(activeIndex + 1)

  return (
    <div className="relative px-4 lg:px-8 border-[1px] border-gray-300 rounded-sm p-8 m-8 pt-[5rem] text-purple-600">
      <AliceCarousel
        mouseTracking
        items={products}
        responsive={responsive}
        controlsStrategy="alternate"
        disableButtonsControls
        disableDotsControls
        activeIndex={activeIndex}
      />

      {!(isMobile) && (activeIndex != 0) &&
        <Button
          // size="small"
          variant="contained"
          className="z-50"
          sx={{
            position: 'absolute',
            top: '47%',
            left: '-10px',
            backgroundColor: 'black',
            ariaLabel: 'prev',
            ':hover': {
              backgroundColor: 'rgba(50, 50, 50)',
            },
            transform: 'rotate(90deg)',
          }}
          onClick={slidePrev}
        >
          <KeyboardArrowLeftIcon sx={{ transform: 'rotate(-90deg)' }} />
        </Button>
      }

      {!(isMobile) && (activeIndex != products.length - 5) && 
        <Button
          // size="small"
          variant="contained"
          className="z-50"
          sx={{
            position: 'absolute',
            top: '48%',
            right: '-10px',
            backgroundColor: 'black',
            ariaLabel: 'next',
            ':hover': {
              backgroundColor: 'rgba(50, 50, 50)',
            },
            transform: 'rotate(90deg)',
          }}
          onClick={slideNext}
        >
          <KeyboardArrowRightIcon sx={{ transform: 'rotate(-90deg)' }} />
        </Button>
      }
    </div>
  )
};


export default HomeSectionCarousel;