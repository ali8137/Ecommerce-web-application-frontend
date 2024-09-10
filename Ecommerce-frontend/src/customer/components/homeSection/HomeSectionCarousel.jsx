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
  const products = useMemo(() => dataObject?.map((product) => (
    <HomeSectionProduct {...product} key={product.id} />
  )), [dataObject]);
  // used useMemo() just to improve performance and avoid redoing the same functionality during each re-render
  
  const slidePrev = () => setActiveIndex(activeIndex - 1)
  const slideNext = () => setActiveIndex(activeIndex + 1)

  const syncActiveIndex = (e) => 
    // syncActiveIndex takes e as an argument, where e is the event (event object) that changed the state of the slide/carousel, like swiping, clicking, ...
    // e.type is the type of the event that changed the state of the slide/carousel, e.type is equal to "action" when the change is a user-triggered change 
    {
      if(activeIndex !== e.item) {
        // the above condition is to prevent the re-rendering of this component twice when we click on the next button or previous button. one re-rendering when function "slidePrev" or "slideNext" is triggered and another re-rendering when the onSlideChanged triggers the function "syncActiveIndex". but when adding the above condition, the below setter won't be triggered and hence the second re-rendering won't happen.
        // I think the reason why the second re-render is happening is because there is duration of time between the triggering of the two setters, which mean when the interpreter is reading this file, it will pass by the first setter but it won't read the second setter because onSlideChanged is not triggered until after the change of the carousel ends and hence only the first setter will be triggered, which will re-render the component once. then after some amount of time, after the end of the change of the carousel, the second setter will be triggered and hence the second re-render will happen.

        setActiveIndex(e.item)
        // although mouseTracking prop automatically updates the activeIndex when the mouse does swiping effect against the carousel. but this automatic update is within the carousel predefined elements themselves and not for the custom buttons we added here. so, if the mouse swiped, the buttonControls and buttonDots know about this change automatically and update based on that. but when the mouse swipes, the custom buttons we added here won't know, that's why we added the method syncActiveIndex() inside the prop onSlideChanged, to keep the custom buttons updated when the mouse swipes.
        // related to the above not: the reason why this happens is because the mouseTracking prop updates the activeIndex internally and not externally, this means within the carousel itself, that's why the buttons controls and dots controls know about that wile custom buttons i have added didn't knew about the update. in other words, the mouseTracking prop updates the state variables inside the carousel and not outside it, and hence the state active variable "activeIndex" is not updated automatically when the mouse swipes.
  
        // console.log("item: ", e.item);
      }
    }

    // console.log("child component re-render")

  return (
    <div className="relative px-4 py-8 lg:px-8 border-[1px] border-gray-300 rounded-sm m-8">
      <h1 className="text-3xl font-bold mb-4">
        {dataObject[0]?.topLavelCategory+
          ' ' +
        dataObject[0]?.thirdLavelCategory}
      </h1>

      {/* check this chat with chatGPT to better understand react alice carousel "https://chatgpt.com/share/1aacf200-8765-4dba-8435-cd8d96cb41a2" */}
      <AliceCarousel
        // mouseTracking={false}
        // the above is to disable the default mouse tracking feature of the library
        // mouseTracking={isMobile}
        mouseTracking
        items={products}
        responsive={responsive}
        controlsStrategy="alternate"
        disableButtonsControls
        disableDotsControls
        activeIndex={activeIndex}
        // activeIndex is the index of the currently active item, that is the item we are currently looking at in the slide/carousel
        onSlideChanged={syncActiveIndex}
        // onSlideChanged triggers the function it takes as argument AFTER the change(touching, sliding, swiping, clicking) happens to the slide/carousel
        // although mouseTracking prop automatically updates the activeIndex when the mouse does swiping effect against the carousel. but this automatic update is within the carousel predefined elements themselves and not for the custom buttons we added here. so, if the mouse swiped, the buttonControls and buttonDots know about this change automatically and update based on that. but when the mouse swipes, the custom buttons we added here won't know, that's why we added the method syncActiveIndex() inside the prop onSlideChanged, to keep the custom buttons updated when the mouse swipes.
        // related to the above not: the reason why this happens is because the mouseTracking prop updates the activeIndex internally and not externally, this means within the carousel itself, that's why the buttons controls and dots controls know about that wile custom buttons i have added didn't knew about the update. in other words, the mouseTracking prop updates the state variables inside the carousel and not outside it, and hence the state active variable "activeIndex" is not updated automatically when the mouse swipes.
        // onSLideChanged is a function that is called when the slide/carousel changes, like when we slide it by touching the screen for example

        // css styling can't be applied here, apply it to the parent div if you want to
      />

      {!isMobile && activeIndex != 0 && (
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
      )}

      {!isMobile && activeIndex != products.length - 5 && (
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
      )}
    </div>
  )
};


export default HomeSectionCarousel;