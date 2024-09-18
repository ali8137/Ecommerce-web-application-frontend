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
//       <Route action={action} path="/" element={<HorizontalLinearStepper />} />
//       <Route path="/submit" element={<HomePage />} />
//       {/* <Route path="/submit" action={action} element={<HomePage />} /> */}
//       {/* if we used the action prop inside a route other than the route of the react component that contains the <Form> component which this above action prop is attached/associated/relative to, then in this case the action function inside this react component will mount/rerender the react component of the above route where action prop was added  */}
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
