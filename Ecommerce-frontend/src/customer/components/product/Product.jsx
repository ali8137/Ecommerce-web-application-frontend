'use client'

import { useEffect, useState } from 'react'
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
import { filters } from './filterData'

import { useSearchParams } from 'react-router-dom'
import {
  // getCategories,
  getProductAttributes,
} from '../../../utils/api'
// import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../../redux/features/products/productsSlice'
import { Pagination } from '@mui/material'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Product() {
  // for the mobile dialog
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // const [subCategories, setSubCategories] = useState([])
  // const [isCategoriesLoading, setIsCategoriesLoading] = useState(false)
  // const [error, setError] = useState(null)

  const {
    products,
    isLoading: isLoadingProducts,
    paginationData,
  } = useSelector((store) => store.products)

  const [pageNbr, setPageNbr] = useState(1)

  const [productAttributes, setProductAttributes] = useState([])

  const dispatch = useDispatch()

  // associate the filter options with the searchParams to enable filtering logic
  const [searchParams, setSearchParams] = useSearchParams()

  // update the url search params based on the checkbox state of the checkbox input elements
  const handleCheckboxChange = (paramKey, paramValue, event) => {
    if (event.target.checked) {
      handleCheckedChange(paramKey, paramValue)
    } else {
      handleUncheckedChange(paramKey, paramValue)
    }
  }

  const handleCheckedChange = (paramKey, paramValue) => {
    setSearchParams((prevParams) => {
      if (prevParams.has(paramKey)) {
        prevParams.append(paramKey, paramValue.toString())
      } else {
        prevParams.set(paramKey, paramValue.toString())
      }

      return prevParams
    })
  }

  const handleUncheckedChange = (paramKey, paramValue) => {
    setSearchParams((prevParams) => {
      if (prevParams.getAll(paramKey).length > 1) {
        const allValues = prevParams.getAll(paramKey)

        const remainingValues = allValues.filter(
          (value) => value !== paramValue.toString()
        )

        prevParams.delete(paramKey)

        remainingValues.forEach((value) => prevParams.append(paramKey, value))
        return prevParams
      } else {
        prevParams.delete(paramKey)
        return prevParams
      }
    })
  }

  // update the checkbox state of the checkbox input elements -in the filters down below- based on the value of the url query/search params
  const getCheckBoxStateFromUrl = (paramKey, paramValue) => {
    return searchParams.getAll(paramKey).includes(paramValue) === true
  }

  // TODO: add a filter icon on the top left side of the filters section of this component

  // // TODO: the below must be better done using router loader function instead
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     setIsCategoriesLoading(true)
  //     try {
  //       const response = await getCategories()
  //       setSubCategories(response)
  //     } catch (err) {
  //       console.error('error fetching categories: ', err)
  //       setError(err)
  //     } finally {
  //       setIsCategoriesLoading(false)
  //     }
  //   }

  //   fetchCategories()
  // }, [])

  // const handleCategoryClick = (categoryId) => {
  //   setSearchParams((/*prevParams*/) => {
  //     const newSearchParams = new URLSearchParams()

  //     newSearchParams.set('categoryId', categoryId)

  //     return newSearchParams
  //   })
  // }

  // TODO: the below must be better done using router loader function instead. to do that, for the below state variable pageNbr, we better use searchParams and not state variable(useState)
  useEffect(() => {
    dispatch(
      getProducts({
        categoryId: searchParams.get('categoryId'),
        colors: searchParams.getAll('Color'),
        sizes: searchParams.getAll('Size'),
        pricesData: searchParams.getAll('Price'),
        pageNumber: pageNbr - 1,
        // TODO: developer-constraint: - pageNumber values are 0, 1, 2, 3, ... and not 1, 2, 3, 4, ... and that's why we subtract 1 from the pageNbr
        sortBy: searchParams.get('sortBy') || 'id',
      })
    )
  }, [dispatch, searchParams, pageNbr /*, sortingOption*/])

  const handleChange = (event, value) => {
    setPageNbr(value)

    setSearchParams((prevParams) => {
      const newSearchParams = new URLSearchParams(prevParams)

      newSearchParams.set('pageNumber', value - 1)

      return newSearchParams
    })
  }

  // TODO: the below must be better done using router loader function instead
  useEffect(() => {
    const fetchProductAttributes = async () => {
      try {
        const response = await getProductAttributes()
        setProductAttributes(response)
      } catch (err) {
        console.error('error fetching product attributes: ', err)
      } finally {
        // setIsAttributesLoading(false);
      }
    }

    fetchProductAttributes()
  }, [])

  const handleSortingOptionClick = (sortingOption) => {
    setSearchParams((prevParams) => {
      const newSearchParams = new URLSearchParams(prevParams)

      newSearchParams.set('sortBy', sortingOption)

      return newSearchParams
    })
  }

  // useEffect(() => {
  //   setSearchParams((/* prevParams */) => {
  //     const initialSearchParams = new URLSearchParams()

  //     initialSearchParams.set('categoryId', 10)

  //     return initialSearchParams
  //   })
  // }, [])
  // // don't add params in the useEffect above, it is meant to be executed only once at the beginning only
  // // the above useEffect is only used because only products of few categories are there in the database

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          {/* provide a backdrop effect behind the dialog panel */}
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

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
                {/* <h3 className="sr-only">Categories</h3>
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
                </ul> */}

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
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

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              {/* sort options menu */}
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
                  <div className="py-1">
                    {productAttributes
                      // TODO: I believe doing the filtering in the backend in first place would have been better
                      .filter((option) => option !== 'category_id')
                      .map((option) => (
                        <MenuItem
                          key={option}
                          onClick={() => handleSortingOptionClick(option)}
                        >
                          <a
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

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button>

              {/* filter icon button for mobile screens */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* for laptop screen */}
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {/* <h3 className="sr-only">Categories</h3>
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
                )} */}

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

              {/* Product grid */}
              <div className="lg:col-span-3 border-2">
                {isLoadingProducts && <div>Loading...</div>}
                {!isLoadingProducts && (
                  <div className="flex flex-wrap justify-center bg-white py-5">
                    {products?.map((product) => (
                      <ProductCard {...product} key={product.id} />
                    ))}
                  </div>
                )}
                <div className="flex justify-center">
                  <Pagination
                    // count={15}
                    count={paginationData?.totalPages}
                    color="secondary"
                    page={pageNbr}
                    // size='small'
                    // defaultPage={3}
                    // siblingCount={2}
                    // boundaryCount={2}
                    sx={{ mb: '2em' }}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
