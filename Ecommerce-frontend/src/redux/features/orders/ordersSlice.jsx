import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// get all orders
// get orders with certain criteria (status, date, ...)

const url = 'http://localhost:8088/api'
// TODO: it is better to add the above url in the development .env.development file

// const authToken =
//   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWRAZ21haWwuY29tIiwiaWF0IjoxNzQxOTQ4MDMxLCJleHAiOjE3NDI4MTIwMzF9.NqOKy5-v-2IrO1PCvorSkXPLmEKKvsHRGiUCm9p0QtQ'
// const authToken = localStorage.getItem("token")
// the above variable will be calculated onlt once when this file is loaded, and it won't be updated, thus use the below instead
const authToken = () => localStorage.getItem("token") || null;
// finished-TODO: change the way to get the auth token (using localStorage, redux, httpOnly cookies, sessionStorage, etc...)
// TODO: add an global interceptor in the utility class that will add/attach the auth token to the request headers

const initialState = {
  //   orders: [],
  // above is for the history of orders
  currentOrder: null,
  isLoading: false,
}


// get the orders of the user:
export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (/*params = {},*/ thunkAPI) => {
    try {
      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios(url + '/orders/get-orders', {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${authToken}`,
          Authorization: `Bearer ${authToken()}`,
        },
      })
      // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor
      // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add the interceptor) and then apply the get, post, put, delete methods

      return response.data
    } catch (err) {
      console.error('error fetching cart(s)', err.toJSON?.() || err)
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)


// get the user current/latest order:
export const getUserCurrentOrder = createAsyncThunk(
  'orders/getUserCurrentOrder',
  async (/*params = {},*/ thunkAPI) => {
    try {
      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios(url + '/orders/user-current-order', {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${authToken}`,
          Authorization: `Bearer ${authToken()}`,
        },
      })
      // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor
      // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add the interceptor) and then apply the get, post, put, delete methods

      return response.data
    } catch (err) {
      console.error('error fetching cart(s)', err.toJSON?.() || err)
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)



// add user order:
export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (/*params = {},*/ thunkAPI) => {
    try {
      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios.post(
        url + '/orders/place-order',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${authToken}`,
            Authorization: `Bearer ${authToken()}`,
          },
        }
      )

      // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor
      // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add the interceptor) and then apply the get, post, put, delete methods

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  extraReducers: (builder) => {
    builder
      // get orders:
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrders.fulfilled, (state /*, action*/) => {
        state.isLoading = false
      })
      .addCase(getOrders.rejected, (state /*, action*/) => {
        state.isLoading = false
      })
      // get user current order:
      .addCase(getUserCurrentOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserCurrentOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentOrder = action.payload
        // console.log("currentOrder", state.currentOrder)
      })
      .addCase(getUserCurrentOrder.rejected, (state /*, action*/) => {
        state.isLoading = false
        state.currentOrder = null
      })
      // place order:
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(placeOrder.fulfilled, (state /*, action*/) => {
        state.isLoading = false
      })
      .addCase(placeOrder.rejected, (state /*, action*/) => {
        state.isLoading = false
      })
  },
})

export default ordersSlice.reducer
