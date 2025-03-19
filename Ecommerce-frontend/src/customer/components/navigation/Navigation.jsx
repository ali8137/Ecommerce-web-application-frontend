'use client'

import { Fragment, useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { navigation } from './navigationData'
// TODO: replace the above navigation in this component with the names of categories from the backend/database
import { useDispatch, useSelector } from 'react-redux'
import {
  // Navigate,
  NavLink,
} from 'react-router-dom'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import { logout } from '../../../redux/features/authentication/authSlice'
import { getCartItems } from '../cart/redux/features/cartSlice/cartSlice'
import { getCategoriesHierarchy } from '../../../utils/api'

export default function Navigation() {
  const [open, setOpen] = useState(false)

  const { totalAmount } = useSelector((store) => store.cart)

  // TODO: access the "authentication" (register, login, logout and user profile ) redux reducer to send requests to the backend to register, login, logout and get the user profile

  const { token } = useSelector((store) => store.auth)
  // const token = localStorage.getItem('token');

  // console.log('navigation token: ', token)
  // console.log('navigation total amount: ', totalAmount)

  const [categoriesHierarchy, setCategoriesHierarchy] = useState([])

  const dispatch = useDispatch()

  // const handleLogicClick = (event) => {
  //   if (!isAuthenticated) {
  //     event.preventDefault() // Prevents navigation
  //     Navigate('/login') // Redirect user to login page instead
  //   } else {
  //     console.log('User is authenticated, navigating...')
  //   }
  // }

  const handleLogout = (/*event*/) => {
    dispatch(logout())
  }

  // TODO: can make the cart icon section (a group of html <div> components) in the <Navigation> component to be a dedicated component
  // itself and hence fetch the cart items whenever this component specifically (isnteadof targetting the whole <Navigation> compponent rerendering) rerenders
  useEffect(() => {
    const fetchCartItems = async () => {
      await dispatch(getCartItems())

      // console.log('navigation get cat items')
    }

    fetchCartItems()

    // console.log('navigaiton useEffect')
  }, [dispatch, token])
  // - useEffect() function does not necessarily run when the component it
  //   is in reredners, but rather when the variables it depends on change

  // TODO: there must be a better way to do this by having the catrgories hierarchy directly mapped in the backend to have a perfect flawless performance:
  // map the categories hierarchy fetched from the backend/database to the navigation data structure:
  const mapCategoryHierarchyToNavigation = (categoriesHierarchy) =>
    categoriesHierarchy.map((category) => ({
      id: category.categoryDTO.path.toLowerCase(),
      index: navigation.categories.find(
        (NavigationCategory) =>
          NavigationCategory.id === category.categoryDTO.path.toLowerCase()
      ).index, // TODO: make this dynamic as well by fetching it from the backend
      name: category.categoryDTO.path,
      featured: navigation.categories.find(
        (NavigationCategory) =>
          NavigationCategory.id === category.categoryDTO.path.toLowerCase()
      ).featured, // TODO: make this dynamic as well by fetching it from the backend
      sections: category.children.map((child) => ({
        id: child.categoryDTO.path.toLowerCase(),
        name: child.categoryDTO.path,
        items: child.children.map((grandChild) => ({
          name: grandChild.categoryDTO.path,
          id: grandChild.categoryDTO.id,
          href:
            category.categoryDTO.path.toLowerCase() +
            '/' +
            child.categoryDTO.path.toLowerCase() +
            '/' +
            grandChild.categoryDTO.path.toLowerCase(),
        })),
      })),
    }))

  useEffect(() => {
    const fetchCategoriesHierarchy = async () => {
      // setIsLoading(true)
      try {
        const data = await getCategoriesHierarchy()
        // setCategoriesHierarchy(data)
        setCategoriesHierarchy(mapCategoryHierarchyToNavigation(data))
      } catch (error) {
        // setError(error)
        console.error(error)
      } finally {
        // setIsLoading(false)
      }
    }

    fetchCategoriesHierarchy()

    // fetchCategoriesHierarchy().then(() => {
    //   mapCategoryHierarchyToNavigation(categoriesHierarchy)
    // })
  }, [])

  // console.log("navigation categories hierarchy: ", categoriesHierarchy)

  return (
    <div className="bg-white">
      {/* mobile screens */}
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {/* {navigation.categories.map((category) => ( */}
                  {categoriesHierarchy.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {/* {navigation.categories.map((category) => ( */}
                {categoriesHierarchy.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <img
                              alt={item.imageAlt}
                              src={item.imageSrc}
                              className="object-cover object-center"
                            />
                          </div>
                          <a
                            href={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            // <li key={item.name} className="flow-root">
                            //   <a
                            //     href={item.href}
                            //     className="-m-2 block p-2 text-gray-500"
                            //   >
                            //     {item.name}
                            //   </a>
                            // </li>
                            <li key={item.name} className="flex">
                              <NavLink
                                // TODO: might think of having a better navigation below, by either navigating to the route or by adding the search param
                                to={`${category.name.toLowerCase()}/${section.name.toLowerCase()}/${item.name.toLowerCase()}?categoryId=${
                                  item.id
                                }`}
                                // the above will concatenate the above path to the path of the parent route of this component
                                // className="hover:text-gray-800"
                                className={`hover:text-gray-800 ${
                                  category.id === 'women' &&
                                  section.id === 'clothing' &&
                                  item.name === 'Dresses'
                                    ? ''
                                    : category.id === 'men' &&
                                      section.id === 'clothing' &&
                                      item.name === 'Tops'
                                    ? ''
                                    : 'cursor-not-allowed text-gray-400'
                                }`}
                                // onClick={close}
                                onClick={
                                  (category.id === 'women' &&
                                    section.id === 'clothing' &&
                                    item.name === 'Dresses') ||
                                  (category.id === 'men' &&
                                    section.id === 'clothing' &&
                                    item.name === 'Tops')
                                    ? close
                                    : (e) => e.preventDefault()
                                }
                                // the "close" prop is provided by headless UI. the above line will triger the closing of the <PopoverPanel>
                              >
                                {item.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            {/* TODO: add a popover panel that will pop to allow the user to either check his profile or Logout */}
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {token ? (
                <div>
                  <div className="flow-root">
                    <NavLink
                      to="/profile"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Profile
                    </NavLink>
                  </div>
                  <div className="flow-root">
                    {/* <button
                      onClick={handleLogout}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Logout
                    </button> */}
                    <NavLink
                      to="/logout"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      onClick={handleLogout}
                    >
                      Logout
                    </NavLink>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flow-root">
                    {/* <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a> */}
                    <NavLink
                      to="/login"
                      // onClick={handleLoginClick}
                      // onClick={() => handleLoginClick()}
                      // the onClick event handle takes place before the navigation to the route in the above "to" prop of this <NavLink />
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </NavLink>
                  </div>
                  <div className="flow-root">
                    {/* <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </a> */}
                    <NavLink
                      to="/register"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </NavLink>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <a href="#" className="-m-2 flex items-center p-2">
                <img
                  alt=""
                  src="https://tailwindui.com/img/flags/flag-canada.svg"
                  className="block h-auto w-5 flex-shrink-0"
                />
                <span className="ml-3 block text-base font-medium text-gray-900">
                  CAD
                </span>
                <span className="sr-only">, change currency</span>
              </a>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* large screens */}
      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav
          aria-label="Top"
          className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`}
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <NavLink to="/">
                  <span className="sr-only">Your Company</span>
                  <LocalMallIcon sx={{ color: 'blue', fontSize: 45 }} />
                </NavLink>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {/* {navigation.categories.map((category) => ( */}
                  {categoriesHierarchy.map((category) => (
                    <Popover key={category.name} className="flex">
                      {/* <Popover key={category?.categoryDTO?.path} className="flex"> */}
                      <div className="relative flex">
                        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
                          {/* {category?.categoryDTO?.path} */}
                          {category.name}
                        </PopoverButton>
                      </div>

                      <PopoverPanel
                        transition
                        className="absolute z-10 h-[78vh] inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                        // added the css style "z-10" in order to resolve the problem of the panel not appearing. and added also the css style "h-[78vh]"
                      >
                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                        {({ close }) => (
                          // the "close" prop is provided by headless UI
                          <div>
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 top-1/2 bg-white shadow"
                            />

                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                  <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                    {category.featured.map((item) => (
                                      <div
                                        key={item.name}
                                        className="group relative text-base sm:text-sm"
                                      >
                                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                          <img
                                            alt={item.imageAlt}
                                            src={item.imageSrc}
                                            className="object-cover object-center"
                                          />
                                        </div>
                                        <a
                                          href={item.href}
                                          className="mt-6 block font-medium text-gray-900"
                                        >
                                          <span
                                            aria-hidden="true"
                                            className="absolute inset-0 z-10"
                                          />
                                          {item.name}
                                        </a>
                                        <p aria-hidden="true" className="mt-1">
                                          Shop now
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                    {category.sections.map((section) => (
                                      <div key={section.name}>
                                        <p
                                          id={`${section.name}-heading`}
                                          className="font-medium text-gray-900"
                                        >
                                          {section.name}
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby={`${section.name}-heading`}
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {section.items.map((item) => (
                                            <li
                                              key={item.name}
                                              className="flex"
                                            >
                                              <NavLink
                                                // TODO: might think of having a better navigation below, by either navigating to the route or by adding the search param
                                                to={`${category.name.toLowerCase()}/${section.name.toLowerCase()}/${item.name.toLowerCase()}?categoryId=${
                                                  item.id
                                                }`}
                                                // the above will concatenate the above path to the path of the parent route of this component
                                                // className="hover:text-gray-800"
                                                className={`hover:text-gray-800 ${
                                                  category.id === 'women' &&
                                                  section.id === 'clothing' &&
                                                  item.name === 'Dresses'
                                                    ? ''
                                                    : category.id === 'men' &&
                                                      section.id ===
                                                        'clothing' &&
                                                      item.name === 'Tops'
                                                    ? ''
                                                    : 'cursor-not-allowed text-gray-400'
                                                }`}
                                                // onClick={close}
                                                onClick={
                                                  (category.id === 'women' &&
                                                    section.id === 'clothing' &&
                                                    item.name === 'Dresses') ||
                                                  (category.id === 'men' &&
                                                    section.id === 'clothing' &&
                                                    item.name === 'Tops')
                                                    ? close
                                                    : (e) => e.preventDefault()
                                                }
                                                // the "close" prop is provided by headless UI. the above line will triger the closing of the <PopoverPanel>
                                              >
                                                {item.name}
                                              </NavLink>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </PopoverPanel>
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>

              {/* TODO: add a popover panel that will pop to allow the user to either check his profile or Logout */}
              <div className="ml-auto flex items-center">
                {token ? (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <NavLink
                      to="/profile"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Profile
                    </NavLink>
                    <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                    {/* <button
                      onClick={handleLogout}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Logout
                    </button> */}
                    <NavLink
                      to="/logout"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      onClick={handleLogout}
                    >
                      Logout
                    </NavLink>
                  </div>
                ) : (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    {/* <a
                    href="#"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  > */}
                    <NavLink
                      to="/login"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </NavLink>
                    {/* </a> */}
                    <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                    {/* <a
                    href="#"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  > */}
                    <NavLink
                      to="/sign-up"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Create account
                    </NavLink>
                    {/* </a> */}
                  </div>
                )}

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="h-6 w-6"
                    />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <NavLink
                    to="shopping-cart"
                    className="group relative -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="absolute z-10 top-[-2px] right-[-10px] ml-2 px-2 bg-gray-300 shadow-sm border rounded-full text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {totalAmount}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
