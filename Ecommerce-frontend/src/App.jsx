import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Navigation from './customer/components/navigation/Navigation.jsx'
import HorizontalLinearStepper from './customer/components/checkout/HorizontalLinearStepper'
// import HomePage from './pages/HomePage.jsx'
// import Product from './customer/components/product/Product.jsx'
// import ProductDetails from './customer/components/productDetails/ProductDetails.jsx'
// import CartContainer from './customer/components/cart/CartContainer.jsx'

function App() {

  return (
    <>
    <BrowserRouter>
        <Navigation/>
        {/* <HomePage /> */}
        {/* <Product /> */}
        {/* <ProductDetails /> */}
        {/* <CartContainer/> */}
        <HorizontalLinearStepper />
    </BrowserRouter>
    </>
  )
}

export default App















// import {
//   BrowserRouter,
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from 'react-router-dom'
// import './App.css'
// // import Navigation from './customer/components/navigation/Navigation.jsx'
// import HorizontalLinearStepper from './customer/components/checkout/HorizontalLinearStepper'
// import HomePage from './pages/HomePage'
// import { action } from './customer/components/checkout/DeliveryAddressForm'
// // import HomePage from './pages/HomePage.jsx'
// // import Product from './customer/components/product/Product.jsx'
// // import ProductDetails from './customer/components/productDetails/ProductDetails.jsx'
// // import CartContainer from './customer/components/cart/CartContainer.jsx'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/" element={<HorizontalLinearStepper />} />
//       <Route path="/submit" action={action} element={<HomePage />} />
//     </>
//   )
// )

// function App() {
//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   )
// }

// export default App
