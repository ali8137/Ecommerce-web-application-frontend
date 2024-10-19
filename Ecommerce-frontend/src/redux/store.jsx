import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../customer/components/cart/redux/features/cartSlice/cartSlice";
import modalReducer from "../customer/components/cart/redux/features/modal/modalSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        modal: modalReducer,
    },
})