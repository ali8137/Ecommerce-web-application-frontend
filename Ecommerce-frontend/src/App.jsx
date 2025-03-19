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
// import ProductDetails from './customer/components/productDetails/ProductDetails.jsx'
import CartContainer from './customer/components/cart/CartContainer.jsx'
import Order from './customer/components/order/Order.jsx'
import OrderDetails from './customer/components/order/OrderDetails.jsx'
import ProductsLayout from './customer/components/routing/ProductsLayout.jsx'
import ProductOverview from './pages/ProductOverview.jsx'
import { addProductToCartAction } from './customer/components/productDetails/ProductDetails.jsx'
import Payment from './customer/components/payment/Payment.jsx'
import PaymentSuccessCallback from './customer/components/payment/PaymentSuccessCallback.jsx'
import PaymentCancelCallback from './customer/components/payment/PaymentCancelCallback.jsx'
import { store } from './redux/store.jsx'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
// import { getCartItems } from './customer/components/cart/redux/features/cartSlice/cartSlice.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import { isUserAuthenticated } from './redux/features/authentication/authSlice.jsx'
import Logout from './pages/Logout.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* TODO: add the loaders  */}
      {/* TODO: add protection for the suitable endpoints, for better UX */}

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
          {/* no common layout in this parent route, i used nested routing here for the sake of just 
          having common path URL and i used <Outlet> for alternative swapping 
          between components of the child routes */}
          <Route index element={<Productslisting />} />
          <Route
            path=":productId"
            element={<ProductOverview />}
            action={addProductToCartAction(store)}
          />
          {/* the above "store" is the redux store */}
          {/* the above is how we can pass arguments/parameters to an action function */}
        </Route>
        <Route path="shopping-cart" element={<CartContainer />} />
        <Route path="checkout-process" element={<HorizontalLinearStepper />} />
        <Route path="payment" element={<Payment />}>
          <Route index element={<Payment />} />
          <Route path="success" element={<PaymentSuccessCallback />} />
          <Route path="cancel" element={<PaymentCancelCallback />} />
        </Route>
        <Route path="order" element={<Order />} />
        <Route path="order-details" element={<OrderDetails />} />
        {/* TODO: add a route for the profile of the user. and add the definition of its react components (a react component mainly <UserProfile>). and access the user info from the backend through the "authentication" redux reducer (done in react component <Navigation>) */}
        {/* TODO: add a route for the admin dashboard. and add the definition of its react components and its reducx toolkits */}
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<Register />} />
        <Route path="logout" element={<Logout />} />
      </Route>

      {/* the below addition is when i wanted to test the react-router <Form /> */}
      {/* <Route action={action} path="/adasda" element={<HorizontalLinearStepper />} />
      <Route path="/submit" element={<HomePage />} /> */}
      {/* <Route path="/submit" action={action} element={<HomePage />} /> */}
      {/* if we used the action prop inside a route other than the route of the 
      react component that contains the <Form> component which this above action 
      prop is attached/associated/relative to, then in this case the action function 
      inside this react component will mount/rerender the react component of 
      the above route where action prop was added  */}
    </>
  )
)

function App() {

  const dispatch = useDispatch()
  
  useEffect(() => {
    // the below functons are called whenever the website is refreshing
    

    // finished-TODO: it would be better to make the cart items to be fetched when the <Navigation> component rerenderes rather than when the website refreshes. or you can make the cart icon in the <Navigation> component to be a dedicated component and hence fetch the cart items whenever this component rerenders
    // fetch the cart items:
    // dispatch(getCartItems());
    // we can remove this now

    // check if the user is authenticated:
    dispatch(isUserAuthenticated());
  }, [dispatch])

  return (
    <>
      <RouterProvider router={router} /*context={{store}}*/ />
      {/* react router v6 does not support the context prop */}
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
