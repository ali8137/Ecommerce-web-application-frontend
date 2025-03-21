import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../customer/components/cart/redux/features/cartSlice/cartSlice'
import modalReducer from '../customer/components/cart/redux/features/modal/modalSlice'
import productReducer from '../redux/features/products/productsSlice'
import orderReducer from '../redux/features/orders/ordersSlice'
import authReducer from '../redux/features/authentication/authSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
    products: productReducer,
    orders: orderReducer,
    auth: authReducer

    // TODO: add the authentication (register,login and logout) and user profile reducer
    // TODO: add the "get products(all products, filtered products, sorted products, products with certain crtieria (category, color, size, price, ...))" reducer
    // TODO: add the "get orders (all orders, orders with certain crtieria (status, date, ...))" reducer
  },
})
