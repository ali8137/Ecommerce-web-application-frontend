// get all orders
// get orders with certain criteria (status, date, ...)

import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// display all products
// display filtered products
// display one product
// display ratings and reviews of a product

const url = 'http://localhost:8088/api'
// TODO: it is better to add the above url in the development .env.development file

const authToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWRAZ21haWwuY29tIiwiaWF0IjoxNzM5NTM3MzkyLCJleHAiOjE3NDA0MDEzOTJ9.IsXGRK049-yLacKA5r8d2HtlQvtVLdBPOooIZMg0tj8'
// TODO: change the way to get the auth token (using localStorage, redux, httpOnly cookies, sessionStorage, etc...)
// TODO: add an global interceptor in the utility class that will add/attach the auth token to the request headers

const initialState = {
//   orders: [],
// above is for the history of orders
  currentOrder: null,
  isLoading: false,
}

// add user order:
export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (/*params = {},*/ thunkAPI) => {
    // params = {} above is an object that will contain the values of the keys of the object passed to the function getProducts()
    // or:
    // async ({ productId = null }, thunkAPI) => {
    try {
      //   const { productId = null } = params
      // - the above variables will store the values of the keys of params object. and if they
      //   don't exist, then they will be assigned the default values specified above

      // console.log('product id', productId)

      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios.post(
        url + '/orders/place-order',
        {},
        {
          headers: {
            // 'Content-Type': 'application/json',
            // Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      // or:
      // const response = await axios(`${url}/${productId}`);
      // console.log("product", response.data)

      // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor

      // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add
      // the interceptor) and then apply the get, post, put, delete methods

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  // reducers: {
  //     actionFunction1: (state, action) => {
  //       // - action parameter is to get the payload, which is the data that is
  //       //   passed to the action function actionFunction1
  //       // - the initial value of the "state" above is "initialState"
  //       // - logic here
  //     },
  //     actionFfunction2: (state) => {
  //         // logic here
  //     }
  // },
  extraReducers: (builder) => {
    builder
      // get all products category-wise, filtered, sorted and paginated:
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(placeOrder.fulfilled, (state/*, action*/) => {
        // - action parameter here includes the payload, which is the data being
        //   fetched/returned from the above API call getProducts
        state.isLoading = false
      })
      .addCase(placeOrder.rejected, (state /*, action*/) => {
        // - action parameter here includes the payload, which is the
        //   error message in this case
        state.isLoading = false
      })
  },
})

// export const {
//     actionFunction1,
//     actionFunction2
// } = productsSlice.actions;

export default ordersSlice.reducer
