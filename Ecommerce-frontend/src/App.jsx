import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import './App.css'
// import Navigation from './customer/components/navigation/Navigation.jsx'
import HorizontalLinearStepper from './customer/components/checkout/HorizontalLinearStepper'
import HomePage from './pages/HomePage'
import Layout from './customer/components/routing/Layout'
import Productslisting from './pages/Productslisting'
// import { action } from './customer/components/checkout/DeliveryAddressForm'
// import HomePage from './pages/HomePage.jsx'
// import Product from './customer/components/product/Product.jsx'
import ProductDetails from './customer/components/productDetails/ProductDetails.jsx'
import CartContainer from './customer/components/cart/CartContainer.jsx'
import Order from './customer/components/order/Order.jsx'
import OrderDetails from './customer/components/order/OrderDetails.jsx'
import ProductsLayout from './customer/components/routing/ProductsLayout.jsx'
import ProductOverview from './pages/ProductOverview.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        {/* removed "/women" or "/men" routes because adding them is bringing bad
        UX -------- beginning */}
        {/* <Route path=":categoryName" element={<HomePage />} /> */}
        {/* removed "/women" or "/men" routes because adding them is bringing bad
        UX -------- end */}
        <Route
          path=":categoryName/:productsectionName/:productItemName"
          element={<ProductsLayout />}
        >
          {/* no common layout in this parent route, i used nested routing here for the sake of just having common path URL and i used <Outlet> for alternative swapping between components of the child routes */}
          <Route index element={<Productslisting />} />
          <Route path=":productId" element={<ProductOverview />} />
        </Route>
        <Route path="shoppingCart" element={<CartContainer />} />
        <Route path="checkoutProcess" element={<HorizontalLinearStepper />} />
        <Route path="order" element={<Order />} />
        <Route path="orderDetails" element={<OrderDetails />} />
      </Route>

      {/* the below addition is when i wanted to test the react-router <Form /> */}
      {/* <Route action={action} path="/adasda" element={<HorizontalLinearStepper />} />
      <Route path="/submit" element={<HomePage />} /> */}
      {/* <Route path="/submit" action={action} element={<HomePage />} /> */}
      {/* if we used the action prop inside a route other than the route of the react component that contains the <Form> component which this above action prop is attached/associated/relative to, then in this case the action function inside this react component will mount/rerender the react component of the above route where action prop was added  */}
    </>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

// import { BrowserRouter } from 'react-router-dom'
// import './App.css'
// import Navigation from './customer/components/navigation/Navigation.jsx'
// // import Order from './customer/components/order/Order.jsx'
// import OrderDetails from './customer/components/order/OrderDetails.jsx'
// // import HorizontalLinearStepper from './customer/components/checkout/HorizontalLinearStepper'
// // import HomePage from './pages/HomePage.jsx'
// // import Product from './customer/components/product/Product.jsx'
// // import ProductDetails from './customer/components/productDetails/ProductDetails.jsx'
// // import CartContainer from './customer/components/cart/CartContainer.jsx'

// function App() {

//   return (
//     <>
//     <BrowserRouter>
//         <Navigation/>
//         {/* <HomePage /> */}
//         {/* <Product /> */}
//         {/* <ProductDetails /> */}
//         {/* <CartContainer/> */}
//         {/* <HorizontalLinearStepper /> */}
//         {/* <Order /> */}
//         <OrderDetails />
//     </BrowserRouter>
//     </>
//   )
// }

// export default App
