// every component imported in this file must be used in it

// the code in this file was copied from https://tailwindui.com/components/ecommerce/components/store-navigation

'use client'

import {
  Fragment,
  // useEffect,
  // useRef,
  useState,
} from 'react'
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
  // useClose,
} from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { navigation } from './navigationData'
import { useSelector } from 'react-redux'
import {
  NavLink,
  // useLocation,
  // useNavigate,
  // useParams,
  // useSearchParams,
} from 'react-router-dom'
import LocalMallIcon from '@mui/icons-material/LocalMall'

export default function Navigation() {
  const [open, setOpen] = useState(false)

  // added the below to try changing css styles using useRef() and scrolling
  // const navbar = useRef(null);
  // or
  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > window.innerHeight * 1) {
  //       setIsScrolled(true);
  //     }
  //     else {
  //       setIsScrolled(false);
  //     }
  //   } ;

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const { totalAmount } = useSelector((store) => store.cart)

  // removed "/women" or "/men" routes because adding them is bringing bad UX -------- beginning
  // // the below are used to sync between the URL params "/women" or "/men" and the clicking of the <PopoverButton> (thus the open state of the <PopoverPanel>) ------------- beginning
  // const navigate = useNavigate()
  // // const [searchParams, setSearchParams] = useSearchParams()
  // const { categoryName } = useParams()
  // const buttonrefs = useRef([])
  // const location = useLocation()

  // // console.log(location)

  // const isPathStopsAtDynamicParam = location.pathname === `/${categoryName}`

  // useEffect(() => {
  //   // console.log('render')

  //   // console.log(buttonrefs.current)

  //   // console.log(categoryName)

  //   if (categoryName !== undefined && isPathStopsAtDynamicParam) {
  //     // "undefined" and not "null" above
  //     // we could have used "categoryName?" down below in the condition
  //     navigation.categories.forEach((category) => {
  //       if (category.name.toLowerCase() === categoryName.toLowerCase()) {
  //         buttonrefs.current[category.index].click()

  //         // console.log(buttonrefs.current[category.index])
  //         // console.log(categoryName)
  //         // console.log(category.name)
  //       }
  //       // console.log(category.name)
  //     })
  //   }
  //   // the above logic will work, but due to <React.StrictMode> during development stage, thw above code will be executed twice and hence the display of the <popoverPanel> will not happen, the <PopoverButton> will be clicked twice

  //   // if (categoryName === 'Women') {
  //   //   buttonrefs.current.click()
  //   // }
  // }, [categoryName, buttonrefs, isPathStopsAtDynamicParam])
  // // the below are used to sync between the URL params "/women" or "/men" and the clicking of the <PopoverButton> (thus the open state of the <PopoverPanel>) ------------- end
  // removed "/women" or "/men" routes because adding them is bringing bad UX -------- end

  // useEffect(() => {
  //   console.log('render')
  // })

  // was trying to use the below to programmatically close the <PopoverPanel> down below
  // const close = useClose()


  // TODO: access the "authentication" (register, login, logout and user profile ) redux reducer to send requests to the backend to register, login, logout and get the user profile
  
  return (
    <div className="bg-white">
      {/* this part is for mobile screens --------- beginning */}
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
                  {navigation.categories.map((category) => (
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
                {navigation.categories.map((category) => (
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
                            <li key={item.name} className="flow-root">
                              <a
                                href={item.href}
                                className="-m-2 block p-2 text-gray-500"
                              >
                                {item.name}
                              </a>
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

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign in
                </a>
              </div>
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Create account
                </a>
              </div>
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

      {/* this part is for mobile screens --------- end */}

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav
          aria-label="Top"
          className={
            `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`
            // ${isScrolled ? '' : ''}
            // the above is just to play around with css and javascript
          }
          // ref={navbar}
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
                {/* <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </a> */}
                <NavLink to="/">
                  <span className="sr-only">Your Company</span>
                  {/* <img
                    alt=""
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  /> */}
                  <LocalMallIcon
                    // fontSize="large"
                    sx={{ color: 'blue', fontSize: 45 }}
                  />
                </NavLink>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton
                          // below is some playing around
                          // onClick={() => navigate(`/${category.name}`)}
                          // onClick={() => setSearchParams(`/${category.name}`)}

                          // removed "/women" or "/men" routes because adding them is bringing bad UX -------- beginning
                          // ref={(element) =>
                          //   (buttonrefs.current[category.index] = element)
                          // }
                          // array of references

                          // onClick={() => {
                          //   // console.log('clicked')
                          //   navigate(`/${category.name.toLowerCase()}`)
                          // }}
                          // removed "/women" or "/men" routes because adding them is bringing bad UX -------- end

                          className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600"
                        >
                          {category.name}
                        </PopoverButton>
                      </div>

                      <PopoverPanel
                        transition
                        className="absolute z-10 h-[78vh] inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                        // i have added the css style "z-10" in order to resolve the problem of the panel not appearing. and i added also the css style "h-[78vh]"
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
                                              {/* <a
                                            href={item.href}
                                            className="hover:text-gray-800"
                                          >
                                            {item.name}
                                          </a> */}
                                              <NavLink
                                                to={`${category.name.toLowerCase()}/${section.name.toLowerCase()}/${item.name.toLowerCase()}`}
                                                // the above will concatenate the above path to the path of the parent route of this component
                                                // to={item.href}
                                                // href={item.href}
                                                className="hover:text-gray-800"
                                                onClick={close}
                                                // the "close" prop is provided by headless UI. the above line woll triger the closing of the <PopoverPanel>
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

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Sign in
                  </a>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Create account
                  </a>
                </div>

                {/* <div className="hidden lg:ml-8 lg:flex">
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-gray-800"
                  >
                    <img
                      alt=""
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div> */}

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
                  {/* <a
                    href="#"
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
                  </a> */}
                  <NavLink
                    to='shopping-cart'
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
