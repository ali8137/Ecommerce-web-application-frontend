'use client'

import { useEffect, useState } from 'react'
import { Radio, RadioGroup } from '@headlessui/react'
import { Box, Rating } from '@mui/material'
import LinearProgressWithLabel from './LinearProgressWithLabel'
import ProductReviewCard from './ProductReviewCard'
import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  useParams,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../../../redux/features/products/productsSlice'
import {
  addToCartRequest,
  increaseItemQuantityClientSide,
  increaseItemQuantityRequest,
} from '../cart/redux/features/cartSlice/cartSlice'

const reviews = { href: '#', average: 4, totalCount: 117 }

export const addProductToCartAction =
  (store) =>
  async ({ request /*, context*/ }) => {
    const formData = await request.formData()

    // access the product state from the redux store:
    const state = store.getState()
    const product = state.products.product

    // access the form data to build the cart item object and pass it to the backend:
    const productData = {
      color: formData.get('color'),
      size: formData.get('size'),
      product: {
        id: product.id,
      },
    }

    // if the user did not select a color or size, then return an error message:
    if (!productData.color || !productData.size) {
      return {
        message: 'Please select a color and size',
      }
    }

    try {
      // send the request to the backend:
      const cartItems = store.getState().cart.cartItems
      const existsInCart = cartItems.find(
        (item) =>
          item.product.id === productData.product.id &&
          item.color === productData.color &&
          item.size === productData.size
      )
      if (existsInCart) {
        try {
          store.dispatch(
            increaseItemQuantityRequest({ cartItemId: existsInCart.id })
          )
        } catch (error) {
          console.error(error)
          return
        }

        store.dispatch(
          increaseItemQuantityClientSide({ cartItemId: existsInCart.id })
        )
      } else store.dispatch(addToCartRequest({ productData: productData }))

      // redirect the user to the next route/page, which is the shopping cart page:
      return redirect('/shopping-cart')
    } catch (err) {
      console.error('error adding product to cart: ', err)
      return err
    } /*finally {
    setIsCategoriesLoading(false)
  }*/
  }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
  // for rating MUI component:
  const [ratingValue, setRatingValue] = useState(2)

  // for rating LinearProgress MUI component:
  const [progress /*, setProgress*/] = useState(60)

  // TODO: implement back-to-productListings-route button

  // TODO: access the data fetched by the loader function present in the react component <ProductOverview>

  // TODO: implement sending the user rating into the backend by either dedicating a state variable to store this rating, or by using a form

  const { productId } = useParams()
  // console.log("product", productId)

  const { product, isLoading: isProductLoading } = useSelector(
    (store) => store.products
  )

  const dispatch = useDispatch()

  // default values of the properties "color" and "size" of the product:
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)

  // the error returned by the action function addProductToCartAction. this helps for better UX:
  const actionErrorResponse = useActionData()

  // react router Form navigation:
  const navigation = useNavigation()

  // TODO: the below must be better done using router loader function instead
  useEffect(() => {
    if (productId) {
      dispatch(
        getProductById({
          productId: productId,
        })
      )
    }
  }, [dispatch, productId])

  // TODO: documentation: this function dynamically changes the css style using plain css and not tailwind css
  const getBackgroundColor = (color) => {
    // console.log("color", color)

    document.documentElement.style.setProperty('--dynamic-bg-color', color)

    return { backgroundColor: color }
  }

  const [productColorsUnrepeated /*, setProductColorsUnrepeated*/] = useState(
    new Set()
  )
  const [productSizesUnrepeated /*, setProductSizesUnrepeated*/] = useState(
    new Set()
  )
  //  TODO: documentation: the above variables are to remove the repetition in the colors and sizes of the same product

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

  // TODO: fetch ratings and reviews

  return (
    <div className="bg-white">
      <div className="pt-6">
        {isProductLoading ? (
          <h1>Loading...</h1>
        ) : (
          // TODO: it is better to show an avatar/template image or certain effect to prevent the bad UX resulting from the upper react component (the product info component) being not initially rendered, while the lower component (the rating and review section being rendered) related to the above note: I think this will not be needed when i implement the fetching of rating and reviews
          <div>
            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:flex lg:max-w-7xl lg:flex-row lg:gap-x-8 lg:px-8 lg:pt-16 ">
              <div className="lg:w-1/2">
                {/* Image gallery */}
                <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
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

                {/* react router Form */}
                <Form method="post" className="mt-10" replace>
                  {/* Colors */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                    <fieldset aria-label="Choose a color" className="mt-4">
                      <RadioGroup
                        value={selectedColor}
                        // set the selectedColor variable to the value of the radio button that is clicked:
                        onChange={setSelectedColor}
                        className="flex items-center space-x-3"
                        // for Form:
                        name="color"
                      >
                        {Array.from(productColorsUnrepeated).map((color) => (
                          <Radio
                            key={color}
                            value={color}
                            aria-label={color}
                            className={classNames(
                              'ring-gray-300',
                              'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1'
                            )}
                          >
                            <span
                              aria-hidden="true"
                              style={getBackgroundColor(color)}
                              className={classNames(
                                `h-8 w-8 rounded-full border border-black border-opacity-10`
                              )}
                            />
                          </Radio>
                          // TODO: remove the focus from the radio button just after the user clicks on the radio button, for better UX
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
                        // set the selectedSize variable to the value of the radio button that is clicked:
                        onChange={setSelectedSize}
                        className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                        // for Form:
                        name="size"
                      >
                        {Array.from(productSizesUnrepeated).map((size) => (
                          <Radio
                            key={size}
                            value={size}
                            // disabled={!size.inStock}
                            className={classNames(
                              'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6'
                            )}
                          >
                            <span>{size}</span>
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                            />
                          </Radio>
                          // TODO: remove the focus from the radio button just after the user clicks on the radio button, for better UX
                        ))}
                      </RadioGroup>
                    </fieldset>
                  </div>

                  <button
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    // onSubmit={handleSubmit}
                    // disabled={!selectedSize || !selectedColor}
                    // using react router Form navigation:
                    disabled={navigation.state === 'submitting'}
                  >
                    {/* using react router Form navigation: */}
                    {navigation.state === 'submitting'
                      ? 'Adding...'
                      : 'Add to cart'}
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

                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">
                      Details
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* reviews and ratings */}
        {/* TODO: add a component where the user can enter his reviews and send them into the backend*/}
        {/* TODO: make this section responsive to small screens */}
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
