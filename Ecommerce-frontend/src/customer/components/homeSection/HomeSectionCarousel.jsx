import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import HomeSectionProduct from './HomeSectionProduct'
import { Button, useMediaQuery } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import { useEffect, useMemo, useState } from 'react'
import { getProductsByCategory } from '../../../utils/api'

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
}

const HomeSectionCarousel = (prop) => {
  const { categoryId } = prop
  /* TODO: the values of the categoryId are based on the values of the categories in the database */

  const [products, setProducts] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [categoryTitle, setCategoryTitle] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const data = await getProductsByCategory(categoryId)
        setProducts(data)
      } catch (error) {
        setError(error)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [categoryId])

  useEffect(() => {
    let categoryName = ''
    let currentCategory = products?.content[0]?.category

    while (currentCategory?.parentCategory != null) {
      currentCategory = currentCategory?.parentCategory
    }

    categoryName = currentCategory?.name

    setCategoryTitle(categoryName + ' ' + products?.content[0]?.category.name)
  }, [products])

  const [activeIndex, setActiveIndex] = useState(0)
  const isMobile = useMediaQuery('(max-width: 768px)')
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

  const productsList = useMemo(
    () =>
      products?.content?.map((product) => (
        <HomeSectionProduct {...product} key={product.id} />
      )),
    [products]
  )
  // used useMemo() just to improve performance and avoid redoing the same functionality during each re-render

  const slidePrev = () => setActiveIndex(activeIndex - 1)
  const slideNext = () => setActiveIndex(activeIndex + 1)

  const syncActiveIndex = (e) => {
    if (activeIndex !== e.item) {
      setActiveIndex(e.item)
    }
  }

  if (isLoading) {
    return (
      <div className="m-8">
        <h1 className="text-3xl font-bold">loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="m-8">
        <h1 className="text-3xl font-bold">error: {error.message}</h1>
      </div>
    )
  }

  return (
    <div className="relative px-4 py-8 lg:px-8 border-[1px] border-gray-300 rounded-sm m-8">
      <h1 className="text-3xl font-bold mb-4">{categoryTitle}</h1>
      <AliceCarousel
        mouseTracking // mouseTracking={false} or mouseTracking={isMobile}
        items={productsList}
        responsive={responsive}
        controlsStrategy="alternate"
        disableButtonsControls
        disableDotsControls
        activeIndex={activeIndex} // activeIndex is the index of the currently active item, that is the item we are currently looking at in the slide/carousel
        onSlideChanged={syncActiveIndex} // onSlideChanged triggers the function it takes as argument AFTER the change(touching, sliding, swiping, clicking) happens to the slide/carousel
        // css styling can't be applied here, apply it to the parent div if you want to
      />

      {!isMobile && activeIndex != 0 && (
        <Button
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

      {!isMobile && activeIndex < products?.content.length - 5 && (
        <Button
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
}

export default HomeSectionCarousel
