import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Navigation from './customer/components/navigation/Navigation.jsx'
// import HomePage from './pages/HomePage.jsx'
import Product from './customer/components/product/Product.jsx'

function App() {

  return (
    <>
    <BrowserRouter>
        <Navigation/>
        {/* <HomePage /> */}
        <Product />
    </BrowserRouter>
    </>
  )
}

export default App
