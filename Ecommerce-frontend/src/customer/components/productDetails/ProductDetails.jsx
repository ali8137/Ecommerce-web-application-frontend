/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
'use client'

import { useEffect, useState } from 'react'
// import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import { Box, Rating } from '@mui/material'
import LinearProgressWithLabel from './LinearProgressWithLabel'
import ProductReviewCard from './ProductReviewCard'
import { Form, redirect, useActionData, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../../../redux/features/products/productsSlice'
import { addCartItem } from '../../../utils/api'
// import { useNavigate } from 'react-router-dom'



{/* before fetching the data from the backend ----- beginning */}
// const product = {
//   name: 'Basic Tee 6-Pack',
//   price: '$192',
//   discountPrice: '$99',
//   discountPercent: '20%',
//   href: '#',
//   breadcrumbs: [
//     { id: 1, name: 'Men', href: '#' },
//     { id: 2, name: 'Clothing', href: '#' },
//   ],
//   images: [
//     {
//       src: 'https://tailwindui.com/plus/img/ecommerce-images/product-quick-preview-02-detail.jpg',
//       alt: 'Two each of gray, white, and black shirts laying flat.',
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
//       alt: 'Model wearing plain black basic tee.',
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
//       alt: 'Model wearing plain gray basic tee.',
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
//       alt: 'Model wearing plain white basic tee.',
//     },
//   ],
//   colors: [
//     { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
//     { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
//     { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
//   ],
//   sizes: [
//     { name: 'XS', inStock: false },
//     { name: 'S', inStock: true },
//     { name: 'M', inStock: true },
//     { name: 'L', inStock: true },
//   ],
//   description:
//     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//   highlights: [
//     'Hand cut and sewn locally',
//     'Dyed with our proprietary colors',
//     'Pre-washed & pre-shrunk',
//     'Ultra-soft 100% cotton',
//   ],
//   details:
//     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// }
{/* before fetching the data from the backend ----- end */}
const reviews = { href: '#', average: 4, totalCount: 117 }







// - note that when having two forms inside one route/page, then whenn using action function, we need to 
//   add a hidden <input> html element with the same name inside both forms. and based on this input 
//   element, we can specify the logic of each form inside the action function.
// - another way is to create a handleSubmit() function instead of an action function. and inside
//   it we prevent the default behavior, and we can use the event parameter passed by default into 
//   this function. and in case there is two forms, then add an id for each form, and based on the 
//   id value, you specify the logic of each form inside the handleSubmit() function
export const addProductToCartAction = async ({request}) => {
  
  const formData = await request.formData();

  const productData = {
    color: formData.get("color"),
    size: formData.get("size")
  };

  console.log("productData: ", productData);


  if (!productData.color || !productData.size) {
    return {
      message: "Please select a color and size"
    }
  }
  
  // the below path is the path that the user will be redirected into after the success of the API call/request:
  // const pathName = new URL(request.url).searchParams.get("searchParam1");
  // const pathName = "";
  const pathName = new URL(request.url);
  console.log("pathName: ", pathName);
  // the above url is the current url of the frontend page

  // send the request to the backend
  try {
    await addCartItem(productData)
    
    // return redirect(pathName)
    // return null;
    return;
    // - the action function must return a result always, if you don't want to 
    //   return anything, then return null or just return
  }
  catch (err) {
    console.error('error: ', err)
    return err
    // - the action function must return a result always, if you don't want to
    //   return anything, then return null or just return

    // setError(err)
  } /*finally {
    setIsCategoriesLoading(false)
  }*/



}





function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
  // for rating MUI component
  const [ratingValue, setRatingValue] = useState(2)

  // for rating LinearProgress MUI component
  const [
    progress,
    // , setProgress
  ] = useState(60)

  // const navigate = useNavigate()

  // const handleSubmit = (event) => {
  //   event.preventDefault()

  //   navigate('')
  // }

  // TODO: implement back-to-productListings-route button

  // TODO: access the data fetched by the loader function present in the react component <ProductOverview>

  // const routeParam = useParams();
  const { productId } = useParams()
  // console.log("routeParam", productId);

  const { product, isLoading: isProductLoading } = useSelector(
    (store) => store.products
  )

  // console.log('product', product, ' isProductLoading', isProductLoading)

  const dispatch = useDispatch()

  const [selectedColor, setSelectedColor] = useState(
    // product?.qtyPerSizeAndColors[0]?.productColor || ''
    null
  )
  const [selectedSize, setSelectedSize] = useState(
    // product?.qtyPerSizeAndColors[0]?.productSize || ''
    null
  )
  // - the above are the default values of the properties "color" and "size" of 
  //   the product in case the user haven't choosen any option


  const actionErrorResponse = useActionData();
  // the error returned by the action function addProductToCartAction. this helps for better UX


  // TODO: the below must be better done using router loader function instead
  useEffect(() => {
    if (productId) {
      dispatch(
        getProductById({
          productId: productId,
          // or:
          // productId
        })
      )
    }
  }, [dispatch, productId])

  // this version of the function getBackgroundColor is not working as expected due to tailwind purging i believe ----- beginning
  // this version can provide some insights on how to have a twilwind dynamic conditional styling as reusable as possible
  // const getBackgroundColor = (color) => {
  //   const colorMap = {
  //     red: 'bg-red-500',
  //     blue: 'bg-blue-500',
  //     green: 'bg-green-500',
  //     yellow: 'bg-yellow-500',
  //     black: 'bg-black',
  //   }

  //   return colorMap[color.toLowerCase()] || 'bg-gray-200'
  // }
  // this version of the function getBackgroundColor is not working as expected due to tailwind purging i believe ----- end

  // this version of the function getBackgroundColor is not working as expected due to tailwind purging i believe ----- beginning
  // this version can provide some insights on how to have a twilwind dynamic conditional styling as reusable as possible
  // const getBackgroundColor = (color) => {
  //   const lowerCaseColor = color.toLowerCase();
  //   const allowedColors = ['red', 'blue', 'green', 'yellow', 'black'];

  //   if (allowedColors.includes(lowerCaseColor)) {
  //       return `bg-${lowerCaseColor}-500`;
  //   }

  //   return 'bg-gray-200'; // Default fallback
  // };
  // this version of the function getBackgroundColor is not working as expected due to tailwind purging i believe ----- end

  // this version of the function getBackgroundColor is not working as expected due to tailwind purging i believe ----- beginning
  // this version of the function getBackgroundColor is not working as expected due to tailwind purging i believe ----- beginning
  // const getBackgroundColor = (color) => {
  //   console.log("color", color)

  //   // return color ? "bg-" + color + "-500" : "bg-gray-200"
  //   // return color ? `bg-${color.toLowerCase()}-500` : "bg-gray-200"

  //   const lowerCaseColor = color.toLowerCase();

  //   if (lowerCaseColor === "black") {
  //     return 'bg-black'
  //   }

  //   return color ? `bg-${lowerCaseColor}-500` : "bg-gray-200"
  // }
  // this version of the function getBackgroundColor is not working as expected due to tailwind purging i believe ----- end

  // TODO: documentation: this function dynamically changes the css style using plain css and not tailwind css 
  const getBackgroundColor = (color) => {
    // console.log("color", color)

    document.documentElement.style.setProperty('--dynamic-bg-color', color)

    return { backgroundColor: color }
  }

  // const productColorsUnrepeated = new Set();
  // const productSizesUnrepeated = new Set();
  // - using the above variables is wrong, because when adding new elements
  //   to them. this addtion won't be reflected (won't cause a re-render)

  const [productColorsUnrepeated /*setProductColorsUnrepeated*/] = useState(
    new Set()
  )
  const [productSizesUnrepeated /*setProductSizesUnrepeated*/] = useState(
    new Set()
  )
  //  TODO: documentation: the above variables are to remove the repetition in
  // the colors and sizes of the same product

  useEffect(() => {
    productColorsUnrepeated.clear()
    productSizesUnrepeated.clear()

    product?.qtyPerSizeAndColors?.forEach((element) => {
      productColorsUnrepeated.add(element.productColor)
    })

    product?.qtyPerSizeAndColors?.forEach((element) => {
      productSizesUnrepeated.add(element.productSize)
    })
  }, [
    product?.qtyPerSizeAndColors,
    productColorsUnrepeated,
    productSizesUnrepeated,
  ])

  // useEffect(() => {
  //   document.documentElement.style.setProperty('--dynamic-bg-color', color);
  // }, [])

  // TODO: fetching ratings and reviews

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* before fetching the data from the backend ----- beginning */}
        {/* <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav> */}
        {/* before fetching the data from the backend ----- end */}
        {/* finished-TODO: I think i will delete this later because i already have a nav bar. or might leave it and sync it with the nav bar, not sure */}
        {/* TODO: you can make the above nav to be flexible, dynamic and lously coupled with the backend fetched data or with route/URL */}

        {isProductLoading ? (
          <h1>Loading...</h1>
        ) : (
          // TODO: it is better to show an avatar/template image or certain effect to prevent the bad
          // UX resulting from the upper react component (the product info component) being not initially
          // rendered, while the lower component (the rating and review section being rendered)
          // related to the above note: I think this will not be needed when i implement the fetching
          // of rating and reviews
          <div>
            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:flex lg:max-w-7xl lg:flex-row lg:gap-x-8 lg:px-8 lg:pt-16 ">
              <div className="lg:w-1/2">
                {/* Image gallery */}
                <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                  {/* before fetching the data from the backend ----- beginning */}
                  {/* <div className="col-span-3 aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block">
                  <img
                    alt={product.images[0].alt}
                    src={product.images[0].src}
                    className="h-full w-full object-cover object-center"
                  />
                </div> */}
                  {/* <div className="hidden col-span-3 px-16 mt-10 lg:grid lg:grid-cols-3 lg:gap-x-8">
                  {/* display is hidden always except for large screens it will be "grid" */}
                  {/* <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img
                      alt={product.images[1].alt}
                      src={product.images[1].src}
                      className="h-full w-full object-cover object-center"
                    />
                  </div> */}
                  {/* <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img
                      alt={product.images[2].alt}
                      src={product.images[2].src}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg">
                    <img
                      alt={product.images[3].alt}
                      src={product.images[3].src}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div> */}
                  {/* before fetching the data from the backend ----- end */}
                  {product?.images?.map((image, index) => {
                    if (index === 0) {
                      return (
                        <div
                          key={`${image?.src}-${image?.alt}`}
                          className="col-span-3 aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block"
                        >
                          <img
                            alt={image.alt || ''}
                            src={image.src || ''}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      )
                    }
                  })}
                  <div className="hidden col-span-3 px-16 mt-10 lg:grid lg:grid-cols-3 lg:gap-x-8">
                    {product?.images?.map((image, index) => {
                      if (index >= 0) return
                      {
                        /* // display is hidden always
                                               except for large screens it will
                                               be "grid" */
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                          <img
                            alt={image.alt || ''}
                            src={image.src || ''}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      }
                    })}
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="mt-4 lg:mt-0 lg:w-1/2 ">
                <h1 className="text-2xl font-bold mb-7 tracking-tight text-gray-900 sm:text-3xl">
                  {product?.name || 'failed to fetch product name'}
                </h1>
                <h2 className="sr-only">Product information</h2>
                <div className="flex gap-5">
                  <p className="text-xl font-semibold tracking-tigh">
                    {product?.price}$
                  </p>
                  <p className="text-xl text-gray-400 line-through tracking-tigh">
                    {/* {product.price} */}
                  </p>
                  <p className="text-l self-end tracking-tigh text-green-600">
                    {/* {product.discountPercent} */}
                    off
                  </p>
                </div>

                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">ratings and Reviews</h3>
                  <div className="flex items-center">
                    {/* TODO: backend job */}
                    <div className="flex items-center">
                      {/* {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          reviews.average > rating
                            ? 'text-gray-900'
                            : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                      />
                    ))} */}

                      <Rating
                        name="half-rating"
                        value={ratingValue}
                        onChange={(event, newValue) => {
                          setRatingValue(newValue)
                        }}
                        precision={0.5}
                      />
                    </div>
                    <div className="ml-3 text-sm font-medium opacity-50 text-gray-600">
                      12653 ratings
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                    <a
                      href={reviews.href}
                      className="ml-3 text-sm font-medium text-indigo-600 hover:text-fuchsia-600"
                    >
                      {reviews.totalCount} reviews
                    </a>
                  </div>
                </div>

                {/* <form className="mt-10"> */}
                <Form method="post" className="mt-10">
                  {/* Colors */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                    <fieldset aria-label="Choose a color" className="mt-4">
                      <RadioGroup
                        value={selectedColor}
                        // - The selectedColor variable holds the value of the currently selected radio button (that is, child <Radio> component)
                        onChange={setSelectedColor}
                        // - the above will set the selectedColor variable to the value of the radio button that is clicked. when changing
                        //   the value of the selectedColor variable, the <RadioGroup> component will have a new value of "value" prop, which
                        //   is equal to the value of the "value" prop of the <Radio> component that is currently just clicked
                        className="flex items-center space-x-3"
                        // Form:
                        name="color"
                      >
                        {/* {product.colors.map((color) => (
                        <Radio
                          key={color.name}
                          value={color}
                          aria-label={color.name}
                          className={classNames(
                            color.selectedClass,
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1'
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              'h-8 w-8 rounded-full border border-black border-opacity-10'
                            )}
                          />
                        </Radio>
                      ))} */}

                        {Array.from(productColorsUnrepeated).map((color) => (
                          <Radio
                            // key={`${sizeAndColor?.productColor}-${sizeAndColor?.productSize}`}
                            // // the above was done to ensure the uniquness of the key prop
                            key={color}
                            value={color}
                            aria-label={color}
                            className={classNames(
                              // color.selectedClass,
                              'ring-gray-300',
                              'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1'
                            )}
                          >
                            {/* {console.log(
                                'sizeAndColor?.productColor',
                                sizeAndColor?.productColor,
                                'sizeAndColor', sizeAndColor,
                                'Array.from(productColorsUnrepeated)', 
                                Array.from(productColorsUnrepeated)
                              )} */}
                            {/* {console.log(
                                // 'color',
                                // color,
                                'Array.from(productColorsUnrepeated)', 
                                Array.from(productColorsUnrepeated)
                              )} */}
                            <span
                              aria-hidden="true"
                              style={getBackgroundColor(color)}
                              className={classNames(
                                // color.class,
                                // `bg-${sizeAndColor?.productColor}-500`,
                                // `bg-${color.toLowerCase()}-500`,
                                // `${getBackgroundColor(
                                //   color
                                // )}`,
                                `h-8 w-8 rounded-full border border-black border-opacity-10`
                              )}
                            />
                          </Radio>
                        ))}
                      </RadioGroup>
                    </fieldset>
                  </div>

                  {/* Sizes */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size
                      </h3>
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Size guide
                      </a>
                    </div>

                    <fieldset aria-label="Choose a size" className="mt-4">
                      <RadioGroup
                        value={selectedSize}
                        // - The selectedSize variable holds the value of the currently selected radio button (that is, child <Radio> component)
                        onChange={setSelectedSize}
                        // - the above will set the selectedSize variable to the value of the radio button that is clicked. when changing
                        //   the value of the selectedSize variable, the <RadioGroup> component will have a new value of "value" prop, which
                        //   is equal to the value of the "value" prop of the <Radio> component that is currently just clicked
                        className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                        // Form
                        name="size"
                      >
                        {/* {product.sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={classNames(
                            size.inStock
                              ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6'
                          )}
                        >
                          <span>{size.name}</span>
                          {size.inStock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))} */}

                        {Array.from(productSizesUnrepeated).map((size) => (
                          <Radio
                            // key={`${sizeAndColor?.productColor}-${sizeAndColor?.productSize}`}
                            // // the above was done to ensure the uniquness of the key prop
                            key={size}
                            value={size}
                            // disabled={!size.inStock}
                            className={classNames(
                              // size.inStock ?
                              // 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              //   : 'cursor-not-allowed bg-gray-50 text-gray-200',
                              'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6'
                            )}
                          >
                            <span>{size}</span>
                            {/* before fecthing data from the backend ------- beginning */}
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                            />
                            {/* {size.inStock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                            />
                          ) :  */}
                            {/* (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              stroke="currentColor"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                            >
                              <line
                                x1={0}
                                x2={100}
                                y1={100}
                                y2={0}
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                          ) */}
                            {/* before fecthing data from the backend ------- end */}
                          </Radio>
                        ))}
                      </RadioGroup>
                    </fieldset>
                  </div>

                  <button
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

                    // onSubmit={handleSubmit}
                    // onSubmit={() => addProductToCartAction()}

                    // disabled={!selectedSize || !selectedColor}
                    // // disable the button if the user hasn't choosen any option
                  >
                    Add to cart
                  </button>

                  {actionErrorResponse && (
                    <p className="mt-3 text-sm text-red-600">
                      {actionErrorResponse.message}
                    </p>
                  )}

                </Form>
                <div className="py-10 lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="space-y-6">
                      <p className="text-base text-gray-900">
                        {product?.description ||
                          'failed to fetch product description'}
                      </p>
                    </div>
                  </div>

                  {/* before fecthing data from the backend ----- beginning */}
                  {/* <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    Highlights
                  </h3>

                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {product.highlights.map((highlight) => (
                        <li key={highlight} className="text-gray-400">
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div> */}
                  {/* before fecthing data from the backend ----- end */}

                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">
                      Details
                    </h2>

                    {/* <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{product.details}</p>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* reviews and ratings */}
        <section className="mx-10">
          <h1 className="font-semibold text-lg mb-2">Reviews and Ratings</h1>
          <div className="flex justify-between border-gray-100 border-2 rounded-lg">
            <div className="w-2/3 flex flex-col mt-6 gap-10">
              {[0, 1, 2, 3, 5, 6, 7, 8, 9].map((item) => (
                <ProductReviewCard key={item} />
              ))}
            </div>
            <div className="w-1/3 flex flex-col">
              <h3 className="text-xl font-semibold mt-6">Products Rating</h3>
              {/* TODO: backend job */}
              <div className="flex items-center">
                <Rating
                  name="half-rating"
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue)
                  }}
                  precision={0.5}
                />
                <div className="ml-3 text-sm font-medium opacity-50 text-gray-600">
                  12653 ratings
                </div>
              </div>
              <Box sx={{ width: '100%' }} className="mt-6 flex flex-col gap-1">
                <LinearProgressWithLabel value={progress + 25} className="" />
                <LinearProgressWithLabel value={progress} />
                <LinearProgressWithLabel value={progress - 25} />
                <LinearProgressWithLabel value={progress - 50} />
              </Box>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
