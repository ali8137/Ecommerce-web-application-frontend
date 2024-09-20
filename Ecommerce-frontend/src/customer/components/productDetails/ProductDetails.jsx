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

import { useState } from 'react'
// import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import { Box, Rating } from '@mui/material'
import LinearProgressWithLabel from './LinearProgressWithLabel'
import ProductReviewCard from './ProductReviewCard'
// import { useNavigate } from 'react-router-dom'

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  discountPrice: '$99',
  discountPercent: '20%',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XS', inStock: false },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])

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


  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
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
        </nav>
        {/* TODO: I think i will delete this later because i have already a nav bar. or might leave it and sync it with the nav bar, not sure */}

        <div>
          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:flex lg:max-w-7xl lg:flex-row lg:gap-x-8 lg:px-8 lg:pt-16 ">
            <div className="lg:w-1/2">
              {/* Image gallery */}
              <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                <div className="col-span-3 aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block">
                  <img
                    alt={product.images[0].alt}
                    src={product.images[0].src}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="hidden col-span-3 px-16 mt-10 lg:grid lg:grid-cols-3 lg:gap-x-8">
                  {/* display is hidden always except for large screens it will be "grid" */}
                  <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img
                      alt={product.images[1].alt}
                      src={product.images[1].src}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
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
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="mt-4 lg:mt-0 lg:w-1/2 ">
              <h1 className="text-2xl font-bold mb-7 tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
              <h2 className="sr-only">Product information</h2>
              <div className="flex gap-5">
                <p className="text-xl font-semibold tracking-tigh">
                  {product.discountPrice}
                </p>
                <p className="text-xl text-gray-400 line-through tracking-tigh">
                  {product.price}
                </p>
                <p className="text-l self-end tracking-tigh text-green-600">
                  {product.discountPercent} off
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

              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <fieldset aria-label="Choose a color" className="mt-4">
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="flex items-center space-x-3"
                    >
                      {product.colors.map((color) => (
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
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    {/* <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a> */}
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {product.sizes.map((size) => (
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
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

                  // onSubmit={handleSubmit}
                >
                  Add to cart
                </button>
              </form>
              <div className="py-10 lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
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
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{product.details}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* reviews and ratings */}
        <section className="mx-10">
          <h1 className='font-semibold text-lg mb-2'>Reviews and Ratings</h1>
          <div className="flex justify-between border-gray-100 border-2 rounded-lg">
            <div className="w-2/3 flex flex-col mt-6 gap-10">
              {[0, 1, 2, 3, 5, 6, 7, 8, 9].map((item) => (
                <ProductReviewCard key={item}/>
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
