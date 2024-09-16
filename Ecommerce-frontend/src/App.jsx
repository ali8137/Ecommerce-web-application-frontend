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
