// import React from 'react'

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
'use client'

import { 
  useEffect,
    // useRef, 
    useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid'
import ProductCard from './ProductCard'
// import {women_dress} from '../../data/women_dress'
import { filters } from './filterData'


import { 
  // useParams,
    // BrowserRouter, 
    // Routes, 
    // Route, 
    // Link, 
    useSearchParams } from "react-router-dom";
import { getCategories, getProductAttributes } from '../../../utils/api'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/features/products/productsSlice';
import { Pagination } from '@mui/material'






// // below are sort options that we can apply on the products
// const sortOptions = [
//   { name: 'Price: Low to High', href: '#', current: false },
//   { name: 'Price: High to Low', href: '#', current: false },
// ]



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
// - the above utility function is used to combine the styles passed to it that are not
//   null, false, undefined and empty strings and join them into a single string

export default function Product() {
  // this state is for the mobile dialog
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // const refElement = useRef(null)
  // this was added to refer to the component "Link" in the filters section below

  const [subCategories, setSubCategories] = useState([])
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false)
  const [error, setError] = useState(null)

  const {
    products,
    isLoading: isLoadingProducts,
    paginationData,
  } = useSelector((store) => store.products)
  // - the above "isLoading: isLoadingProducts" means to get the value of the "isLoading" key in
  //   the "products" object and store it in the "isLoadingProducts" variable
  // console.log("products", products)

  const [pageNbr, setPageNbr] = useState(1)
  // const [sortingOption, setsortingOption] = useState('id')

  const [productAttributes, setProductAttributes] = useState([])

  const dispatch = useDispatch()

  // associating the filter options with the searchParams to enable filtering logic ----------- beginning
  const [searchParams, setSearchParams] = useSearchParams()

  // the below function is to update the url search params based on the checkbox state of the checkbox input elements
  const handleCheckboxChange = (paramKey, paramValue, event) => {
    if (event.target.checked) {
      handleCheckedChange(paramKey, paramValue)
    } else {
      handleUncheckedChange(paramKey, paramValue)
    }
  }

  const handleCheckedChange = (paramKey, paramValue) => {
    setSearchParams((prevParams) => {
      // the type of prevParams is a "URLSearchParams" object. this is part of web api. this type acts similar to a map but used specifically for url query params

      // if (paramKey === 'Color' && prevParams.has(paramKey)) {
      //     prevParams.append(paramKey, paramValue)

      //     // console.log(paramKey, paramValue)
      // }
      // else{
      //     prevParams.set(paramKey, paramValue)
      // }

      if (prevParams.has(paramKey)) {
        prevParams.append(paramKey, paramValue.toString())

        // console.log(paramKey, paramValue)
      } else {
        prevParams.set(paramKey, paramValue.toString())
      }

      return prevParams
      // the returned value is the new value of "searchParams" that the function "setSearchParams()" will set
    })
  }

  const handleUncheckedChange = (paramKey, paramValue) => {
    setSearchParams((prevParams) => {
      // if (
      //   paramKey === 'Color' &&
      //   prevParams.getAll(paramKey).length > 1
      // ) {

      //     // console.log(prevParams.getAll(paramKey))

      //     const allColors = prevParams.getAll(paramKey)

      //     const remainingColors = allColors.filter(
      //         (color) => color !== paramValue
      //     )

      //     prevParams.delete(paramKey)

      //     remainingColors.forEach((color) => prevParams.append(paramKey, color))

      //     // remainingColors.forEach((color) => console.log(color))
      //     // console.log(prevParams.getAll(paramKey))

      //     return prevParams
      // }
      // else {
      //     prevParams.delete(paramKey)
      //     // return prevParams
      //         //   with "delete()" method of the "URLSearchParams" object, we don't need to return the new value of "searchParams"\
      //         //   the above statement is completely wrong
      // }

      if (
        //   paramKey === 'Color' &&
        prevParams.getAll(paramKey).length > 1
        //   no need to add "?" here or to handle some edge cases because these edge cases won't happen because we have checking then un-checking
      ) {
        // console.log(prevParams.getAll(paramKey))

        const allValues = prevParams.getAll(paramKey)

        const remainingValues = allValues.filter(
          (value) => value !== paramValue.toString()
        )

        prevParams.delete(paramKey)

        remainingValues.forEach((value) => prevParams.append(paramKey, value))

        // remainingValue.forEach((value) => console.log(value))
        // console.log(prevParams.getAll(paramKey))

        return prevParams
      } else {
        prevParams.delete(paramKey)
        return prevParams
        // with "delete()" method of the "URLSearchParams" object, we don't need to return the new value of "searchParams"
        // the above statement is completely wrong
      }
    })
  }

  // the below method is to update the checkbox state of the checkbox input elements -in the filters down below- based on the value of the url query/search params
  const getCheckBoxStateFromUrl = (paramKey, paramValue) => {
    return searchParams.getAll(paramKey).includes(paramValue) === true
    // includes() method is a method of the "Array" object, and the getAll() method returns an array object indeed
  }

  // associating the filter options with the searchParams to enable filtering logic ----------- end

  // console.log('rendering')

  // // enabling filter logic ----------- beginning
  // const colorFilter = searchParams.getAll('Color')
  // const sizeFilter = searchParams.getAll('Size')
  // const priceFilter = searchParams.getAll('Price')

  // const colorFilteredProducts =
  //   colorFilter.length > 0
  //     ? women_dress.filter(
  //         (product) =>
  //           colorFilter.includes(product.color.toLowerCase())
  //       )
  //     : women_dress

  // const colorAndSizeFilteredProducts =
  //      sizeFilter.length > 0
  //     ? colorFilteredProducts.filter(
  //         (product
  //             // , index
  //         ) => {

  //         const array = sizeFilter.map((sizeParamValue) =>
  //             product.size.some((size) => (size.name === sizeParamValue) && (size.quantity > 0))
  //         )

  //         // console.log("array" + index, array)

  //         return !array.includes(false)

  //         // && priceFilter.includes(product.price)
  //     })
  //     : colorFilteredProducts

  // const filteredProducts =
  //  priceFilter.length > 0
  //     ? colorAndSizeFilteredProducts.filter(
  //         (product) => {

  //             const booleanArray = priceFilter.map((price) => {

  //                 const priceFilterOptions = filters.at(2).options

  //                 const optionWithPriceAsValue = priceFilterOptions.find((priceOption) =>
  //                     priceOption.value >= price
  //                 // no need for more conditions because the price options array is sorted in increasing order
  //                 )

  //                 const IndexAtPriceFilterArray = priceFilterOptions.indexOf(optionWithPriceAsValue);

  //                 // console.log("price", price)
  //                 // console.log("product discounted price", product.discountedPrice)
  //                 // console.log('optionWithPriceAsValue', optionWithPriceAsValue)
  //                 // console.log(
  //                 //   'filters',
  //                 //   priceFilterOptions.at(IndexAtPriceFilterArray + 1).value
  //                 // )
  //                 // console.log('index', IndexAtPriceFilterArray)
  //                 return (product.discountedPrice > price) && ((IndexAtPriceFilterArray === (priceFilterOptions.length - 1)) || product.discountedPrice <= priceFilterOptions.at(IndexAtPriceFilterArray + 1).value)
  //             })

  //             // console.log('booleanArray', booleanArray)

  //             return booleanArray.includes(true)

  //     })
  //     : colorAndSizeFilteredProducts

  // // console.log(filteredProducts)

  // // enabling filter logic ----------- end

  // TODO: add a filter icon on the top left side of the filters section of this component

  // finished-TODO: implementing the sorting logic ----------- beginning
  // related to the above note: implementing sorting logic in the frontend is not a good approach

  // finished-TODO: implementing the paging logic ----------- beginning
  // related to the above note: implementing pagination logic in the frontend is not a good approach

  // was trying to access the dynamic URL params of the route of this react component "Product"
  // const {categoryName, productsectionName, productItemName} = useParams()

  // console.log('category', categoryName, 'section', productsectionName, 'item', productItemName)

  // finished-TODO: remove the filtering,sorting and paging logic from being executed in the frontend and do that in the backend

  // finished-TODO: access the products (to be displayed in this react component) returned by the async action of the "products" redux reducer

  // TODO: the below must be better done using router loader function instead
  // finished-TODO: - we could have made the getCategories() to be a thunk function inside
  //         redux toolkit slice (categorySlice in this case). both solutions/approaches
  //         are good to go
  // related to the above note: i don't think it is that necassary to do the above TODO
  useEffect(() => {
    const fetchCategories = async () => {
      setIsCategoriesLoading(true)
      try {
        const response = await getCategories()

        // console.log("response: ", response);
        setSubCategories(response)
      } catch (err) {
        console.error('error fetching categories: ', err)
        setError(err)
      } finally {
        setIsCategoriesLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // finished-TODO: we could have made the below function to call the async thunk function "getProducts()". but
  // the below approach is better I believe
  // related to the above note: i don't think it is that necassary to do the above TODO
  const handleCategoryClick = (categoryId) => {
    setSearchParams((/*prevParams*/) => {
      // console.log("prevParams", prevParams.keys())

      // const newSearchParams = new URLSearchParams(prevParams);
      const newSearchParams = new URLSearchParams()

      // for (const param of prevParams.keys()) {
      //   console.log("param", param)
      //   prevParams.delete(param);
      // }

      // - URLSearchParams is mutable, and hence mutating prevParams (either setting/addign a new param to
      //   it, or deleting a param from it, ...) and then returning it as a result of this setSearchParams()
      //   function will result in unexepected behavior. because react rerenders when there is a new object
      //   instance replacing the previous object instance of the corresponding state variable

      newSearchParams.set('categoryId', categoryId)

      return newSearchParams
    })
  }

  // TODO: the below must be better done using router loader function instead. to do that, for 
  // the below state variable pageNbr, we better use searchParams and not state variable(useState)
  useEffect(() => {
    dispatch(
      getProducts({
        categoryId: searchParams.get('categoryId'),
        colors: searchParams.getAll('Color'),
        sizes: searchParams.getAll('Size'),
        pricesData: searchParams.getAll('Price'),
        pageNumber: pageNbr - 1,
        // - in the above line, pageNumber is the key and "pageNbr - 1" is the value
        // TODO: developer-constraint: - pageNumber values are 0, 1, 2, 3, ... and not 1, 2, 3, 4, ... and that's why
        //   the "-1" was added in the code line above
        // sortBy: sortingOption
        // finished-TODO: it would have been better if we added the above state variables "pageNbr" and "sortingOption" to the redux
        // related to the above note: adding "pageNbr" is not necassary as we could use searchParams instead. and using
        // searchParams instead of "pageNbr" is a better option/approach as well
        sortBy: searchParams.get('sortBy') || "id",
        // toolkit state of the slice productsSlice rather than creating them as dedicated state
        // variables in this component
      })
    )
    // - the above means pass an object with the key categoryId and the value of the key
    //   is the value of the variable searchParams.get('categoryId')
  }, [dispatch, searchParams, pageNbr /*, sortingOption*/])


  // finished-TODO: we could have made the below function to call the async thunk function "getProducts()". but
  // the below approach is better I believe
  // related to the above note: i don't think it is that necassary to do the above TODO
  const handleChange = (event, value) => {
    setPageNbr(value)

    // console.log("pageNbr", pageNbr);

    setSearchParams((prevParams) => {
      // const newSearchParam = new URLSearchParam(prevParams);
      const newSearchParams = new URLSearchParams(prevParams)

      newSearchParams.set('pageNumber', value - 1)

      return newSearchParams
    })
  }
  // - the above is just to get access to the current value of the
  //   page in the <Pagination> component



  // TODO: the below must be better done using router loader function instead
  // finished-TODO: - we could have made the getProductAttributes() to be a thunk function inside
  //         redux toolkit slice (productAttributesSlice in this case). both solutions/approaches
  //         are good to go
  // related to the above note: i don't think it is that necassary to do the above TODO
  useEffect(() => {
    const fetchProductAttributes = async () => {
      // setIsAttributesLoading(false)
      try {
        const response = await getProductAttributes()
        setProductAttributes(response)
      } catch (err) {
        console.error('error fetching product attributes: ', err)
        // setAttributesError(err);
      } finally {
        // setIsAttributesLoading(false);
      }
    }

    fetchProductAttributes()
  }, [])



  // finished-TODO: we could have made the below function to call the async thunk function "getProducts()". but
  // the below approach is better I believe
  // related to the above note: i don't think it is that necassary to do the above TODO
  const handleSortingOptionClick = (sortingOption) => {
    setSearchParams((prevParams) => {
      const newSearchParams = new URLSearchParams(prevParams)

      newSearchParams.set('sortBy', sortingOption)

      return newSearchParams
    })
  }

  useEffect(() => {
    setSearchParams((/* prevParams */) => {
      
      const initialSearchParams = new URLSearchParams();

      initialSearchParams.set("categoryId", 6);

      return initialSearchParams;
    })
  }, [])

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog ----- beginning*/}
        <Dialog
          open={mobileFiltersOpen}
          //   the dialog is open if the variable "mobileFiltersOpen" is true. this usually happens by us clicking on a certain button outside the dialog headless ui component
          onClose={setMobileFiltersOpen}
          //   the above is similar (not equivalent) to "onClose={() => setMobileFiltersOpen(false)}". for the above line, the handler of the event triggered by the event listener onclose() will pass an argument (true or false) to the function inside onClose(), when the user close the dialog, dialog will internally pass false to the onClose() handler
          //   the above two props must always be present for a dialog component
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />
          {/* this is to provide a backdrop effect behind the dialog panel */}

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {subCategories?.map((category) => (
                    <li key={category.id}>
                      <Button
                        variant="text"
                        size="small"
                        sx={{ color: 'black', margin: '0px', padding: '0px' }}
                        // TODO: UI-UX: add hover and active styles
                        onClick={() => {
                          handleCategoryClick(category.id)
                        }}
                      >
                        {category.path}
                      </Button>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    // key prop is required here because we have a list of components
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>
        {/* Mobile filter dialog ----- end*/}

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* this section is for the "new arrival" statement and the buttons beside it at the same level in the top  ----------- beginning */}
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              {/* this menu is for the sort options --------- beginning */}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {/* before fetching attributes from the backend -------- beginning */}
                  {/* <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? 'font-medium text-gray-900'
                              : 'text-gray-500',
                            'block px-4 py-2 text-sm data-[focus]:bg-gray-100'
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div> */}
                  {/* before fetching attributes from the backend -------- end */}

                  <div className="py-1">
                    {productAttributes.map((option) => (
                      <MenuItem
                        key={option}
                        onClick={() => handleSortingOptionClick(option)}
                      >
                        <a
                          // href={option.href}
                          className={classNames(
                            option
                              ? 'font-medium text-gray-900'
                              : 'text-gray-500',
                            // TODO: the above styling might need some modification to have better UI/UX
                            'block px-4 py-2 text-sm data-[focus]:bg-gray-100'
                          )}
                        >
                          {option}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
              {/* this menu is for the sort options --------- end */}

              {/* this button is for the squares 2x2 icon ----- beginning */}
              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button>
              {/* this button is for the squares 2x2 icon ----- end */}

              {/* this button is for the filter icon. it displays the dialog in case of mobile screens ----- beginning */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
              {/* this button is for the filter icon. it displays the dialog in case of mobile screens ----- end */}
            </div>
          </div>
          {/* this section is for the "new arrival" statement and the buttons beside it at the same level in the top  ----------- end */}

          {/* for laptop screen ------ beginning*/}
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* inside the below form component resides the filters implemented by using the Disclosure headless ui component  ---------- beginning*/}
              {/* when changing the below filter, you have to change also the above filter for the new feature you're implementing to work well with both the desktop screens and the mobile ones */}
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                {isCategoriesLoading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {!isCategoriesLoading && !error && (
                  <ul
                    role="list"
                    className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                  >
                    {subCategories?.map((category) => (
                      <li key={category.id}>
                        <Button
                          variant="text"
                          size="small"
                          sx={{ color: 'black', margin: '0px', padding: '0px' }}
                          // TODO: UI-UX: add hover and active styles
                          onClick={() => {
                            handleCategoryClick(category.id)
                          }}
                        >
                          {category.path}
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            {/* <Link 
                                to="products?type=jedi" 
                                ref={refElement}
                            /> */}

                            {/* {setIsChecked((prevItems) => 
                                [...prevItems, option.checked]
                            )} */}

                            <input
                              defaultValue={option.value}
                              // defaultChecked={option.checked}
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              // onClick={() => {refElement.current.click()}}

                              checked={getCheckBoxStateFromUrl(
                                section.name,
                                option.value.toString()
                              )}
                              onChange={(event) =>
                                handleCheckboxChange(
                                  section.name,
                                  option.value,
                                  event
                                )
                              }
                              // we can pass event to an event listener callback function. inside the definition of this callback function we can pass and access variables from outside the definition of this function like for example "section.name" in the above line
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
              {/* inside the below form component resides the filters implemented by using the Disclosure headless ui component  ---------- end*/}

              {/* here is where we have to add the custom data of ours ----- beginning */}
              {/* Product grid */}
              <div className="lg:col-span-3 border-2">
                {isLoadingProducts && <div>Loading...</div>}
                {!isLoadingProducts && (
                  <div className="flex flex-wrap justify-center bg-white py-5">
                    {/* before fetching the data from the backend ------ beginning */}
                    {/* {filteredProducts.map(
                    (product) => (
                      <ProductCard {...product} key={product.id} />
                    )
                    //   key prop must be added always
                  )} */}
                    {/* before fetching the data from the backend ------ end */}
                    {products?.map(
                      (product) => (
                        <ProductCard {...product} key={product.id} />
                      )
                      //   key prop must be added always
                    )}
                  </div>
                )}
                <div className="flex justify-center">
                  <Pagination
                    // count={15}
                    count={paginationData?.totalPages}
                    color="secondary"
                    page={pageNbr}
                    // - the above "page" prop was added to get access to the current value of the
                    //   page in the <Pagination> component. page and pageNbr are synced together, when
                    //   one of them change, the other will follow it and change also, to maintain
                    //   their equivalence

                    // size='small'
                    // defaultPage={3}
                    // siblingCount={2}
                    // boundaryCount={2}

                    sx={{ mb: '2em' }}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* here is where we have to add the custom data of ours ----- end */}
            </div>
          </section>
          {/* for laptop screen ------ end*/}
        </main>
      </div>
    </div>
  )
}
