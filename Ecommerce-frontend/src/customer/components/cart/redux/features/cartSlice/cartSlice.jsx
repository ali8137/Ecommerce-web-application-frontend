import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'http://localhost:8088/api'
// TODO: add the above url in the development .env.development file

const authToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWRAZ21haWwuY29tIiwiaWF0IjoxNzM5NTM3MzkyLCJleHAiOjE3NDA0MDEzOTJ9.IsXGRK049-yLacKA5r8d2HtlQvtVLdBPOooIZMg0tj8'
// TODO: change the way to get the auth token (using localStorage, redux, httpOnly cookies, sessionStorage, etc...)
// TODO: add an global interceptor in the utility class that will add/attach the auth token to the request headers

const initialState = {
  cartItems: [],
  totalAmount: 0,
  subTotalPrice: 0,
}

// TODO: add the "get cart items(from the backend API)" async action
// TODO: documentation: the below function will always return an array of one cart
// get the cart items inside the cart:
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (/*params = {},*/ thunkAPI) => {
    try {
      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios(url + '/cart/get-carts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
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

// clear cart:
export const clearCartRequest = createAsyncThunk(
  'cart/clearCartRequest',
  async (/*params = {},*/ thunkAPI) => {
    try {
      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      // TODO: by database design, there is only one cart for a user
      const response = await axios.delete(url + '/cart/remove-all-carts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      })
      // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor
      // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add the interceptor) and then apply the get, post, put, delete methods

      return response.data
    } catch (err) {
      console.error('error clearing cart', err.toJSON?.() || err)
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

// add cart item:
export const addToCartRequest = createAsyncThunk(
  'cart/addToCartRequest',
  async (params = {}, thunkAPI) => {
    try {
      const { productData = {} } = params

      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios.post(
        url + '/cart/add-cart-item',
        productData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor

      // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add the interceptor) and then apply the get, post, put, delete methods

      return response.data
    } catch (err) {
      console.error('error adding cart item to the cart', err.toJSON?.() || err)
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

// remove cart item:
export const removeFromCartRequest = createAsyncThunk(
  'cart/removeFromCartRequest',
  async (/*params = {},*/ thunkAPI) => {
    try {
      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios.delete(url + '/cart-item/remove-cart-item', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      })

      return response.data
    } catch (err) {
      console.error('error removing cart item', err.toJSON?.() || err)
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

// increase cart item:
export const increaseItemQuantityRequest = createAsyncThunk(
  'cart/increaseItemQuantityRequest',
  async (params = {}, thunkAPI) => {
    try {
      const { cartItemId = null } = params

      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios.put(
        url + '/cart-item/increment-cart-item/' + cartItemId,
        {}, // empty request body
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor

      // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add the interceptor) and then apply the get, post, put, delete methods

      return response.data
    } catch (err) {
      console.error('error increasing cart item', err.toJSON?.() || err)
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

// decrease cart item:
export const decreaseItemQuantityRequest = createAsyncThunk(
  'cart/decreaseItemQuantityRequest',
  async (params = {}, thunkAPI) => {
    try {
      const { cartItemId = null } = params

      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios.put(
        url + '/cart-item/decrement-cart-item/' + cartItemId,
        {}, // empty request body
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor

      // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add the interceptor) and then apply the get, post, put, delete methods

      return response.data
    } catch (err) {
      console.error('error decreasing cart item', err.toJSON?.() || err)
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartClientSide: (state) => {
      state.cartItems = []
      state.totalAmount = 0
      state.subTotalPrice = 0
    },
    removeFromCartClientSide: (state, action) => {
      const { cartItemId: itemId } = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
    },
    increaseItemQuantityClientSide: (state, action) => {
      const { cartItemId: itemId } = action.payload
      const thisItem = state.cartItems.find((item) => item.id === itemId)
      thisItem.quantity++

      state.totalAmount++
      state.subTotalPrice += thisItem.product.price
    },
    decreaseItemQuantityClientSide: (state, action) => {
      const { cartItemId } = action.payload
      const thisItem = state.cartItems.find((item) => item.id === cartItemId)
      thisItem.quantity--

      state.totalAmount--
      state.subTotalPrice -= thisItem.product.price
    },
    // TODO: to change the UI beside/after calling the backend server, instead of having the above reducers and executing their dispatch() calls inside components beside calling async thunk actions. we can just use async thunk and inside the extra-reducers of this thunk we can access the parameters passed to the async thunk action through "action.meta.arg"
  },
  extraReducers: (builder) => {
    builder
      // get user cart(s):
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false
        console.log('action.payload', action.payload)
        state.cartItems = action.payload[0].cartItems
        state.totalAmount = action.payload[0].cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        )
        state.subTotalPrice = action.payload[0].totalPrice
        console.log(
          'isLoading',
          state.isLoading,
          'cartItems',
          state.cartItems,
          'totalAmount',
          state.totalAmount,
          'subTotalPrice',
          state.subTotalPrice
        )
      })
      .addCase(getCartItems.rejected, (state /*, action*/) => {
        state.isLoading = false
        state.cartItems = []
      })
      // add product to cart:
      .addCase(addToCartRequest.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToCartRequest.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartItems = action.payload[0].cartItems
        state.totalAmount++
      })
      .addCase(addToCartRequest.rejected, (state /*, action*/) => {
        state.isLoading = false
      })
      // increase product in cart:
      .addCase(increaseItemQuantityRequest.pending, (state) => {
        state.isLoading = true
      })
      .addCase(increaseItemQuantityRequest.fulfilled, (state /*, action*/) => {
        state.isLoading = false
      })
      .addCase(increaseItemQuantityRequest.rejected, (state /*, action*/) => {
        state.isLoading = false
      })
      // decrease product from cart:
      .addCase(decreaseItemQuantityRequest.pending, (state) => {
        state.isLoading = true
      })
      .addCase(decreaseItemQuantityRequest.fulfilled, (state /*, action*/) => {
        state.isLoading = false
      })
      .addCase(decreaseItemQuantityRequest.rejected, (state /*, action*/) => {
        state.isLoading = false
      })
      // remove product from cart:
      .addCase(removeFromCartRequest.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeFromCartRequest.fulfilled, (state /*, action*/) => {
        state.isLoading = false
      })
      .addCase(removeFromCartRequest.rejected, (state /*, action*/) => {
        state.isLoading = false
      })
      // clear user cart(s):
      .addCase(clearCartRequest.pending, (state) => {
        state.isLoading = true
      })
      .addCase(clearCartRequest.fulfilled, (state /*action*/) => {
        state.isLoading = false
      })
      .addCase(clearCartRequest.rejected, (state /*, action*/) => {
        state.isLoading = false
      })
  },
})

export const {
  clearCartClientSide,
  removeFromCartClientSide,
  increaseItemQuantityClientSide,
  decreaseItemQuantityClientSide,
} = cartSlice.actions

export default cartSlice.reducer
