import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { women_dress } from '../../../../../data/women_dress'
import axios from 'axios'

// TODO: there will be definitely more changes for this file

const url = 'http://localhost:8088/api'
// TODO: add the above url in the development .env.development file

const authToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWRAZ21haWwuY29tIiwiaWF0IjoxNzM5NTM3MzkyLCJleHAiOjE3NDA0MDEzOTJ9.IsXGRK049-yLacKA5r8d2HtlQvtVLdBPOooIZMg0tj8'
// TODO: change the way to get the auth token (using localStorage, redux, httpOnly cookies, sessionStorage, etc...)
// TODO: add an global interceptor in the utility class that will add/attach the auth token to the request headers

const initialState = {
  cartItems: [],
  // cartItems: women_dress.slice(0, 3),
  totalAmount: 0,
  subTotalPrice: 0,
}

// TODO: add the "get cart items(from the backend API)" async action
// TODO: documentation: the below function will always return an array of one cart
// get the cart items inside the cart:
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (/*params = {},*/ thunkAPI) => {
    // params = {} above is an object that will contain the values of the keys of the object passed to the function getProducts()
    // or:
    // - async ({ categoryId = null, colors = [], sizes = [], pricesData = [], pageNumber = 0,
    //   pageSize = 10, sortBy = 'id', sortDirection = 'ASC', thunkAPI) => {
    try {
      // const {
      //   categoryId = null,
      //   colors = [],
      //   sizes = [],
      //   pricesData = [],

      //   pageNumber = 0,
      //   pageSize = 10,
      //   sortBy = 'id',
      //   sortDirection = 'ASC'
      //   // or
      //   // sortDirection = 'DESC'
      //   // - i could have choosen not to not add the above 3 parameters, because their
      //   //   default values are specified in the backend
      // } = params
      // // - the above variables will store the values of the keys of params object. and if they
      // //   don't exist, then they will be assigned the default values specified above

      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios(url + '/cart/get-carts', {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
          Authorization: `Bearer ${authToken}`,
        },
      })
      // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor

      // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add 
      // the interceptor) and then apply the get, post, put, delete methods

      console.log('user carts: ', response.data)
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
    // params = {} above is an object that will contain the values of the keys of the object passed to the function getProducts()
    // or:
    // - async ({ categoryId = null, colors = [], sizes = [], pricesData = [], pageNumber = 0,
    //   pageSize = 10, sortBy = 'id', sortDirection = 'ASC', thunkAPI) => {
    try {
      // const {
      //   categoryId = null,
      //   colors = [],
      //   sizes = [],
      //   pricesData = [],

      //   pageNumber = 0,
      //   pageSize = 10,
      //   sortBy = 'id',
      //   sortDirection = 'ASC'
      //   // or
      //   // sortDirection = 'DESC'
      //   // - i could have choosen not to not add the above 3 parameters, because their
      //   //   default values are specified in the backend
      // } = params
      // // - the above variables will store the values of the keys of params object. and if they
      // //   don't exist, then they will be assigned the default values specified above

      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      // TODO: by database design, there is only one cart for a user
      const response = await axios.delete(url + '/cart/remove-all-carts', {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
          Authorization: `Bearer ${authToken}`,
        },
      })
      // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor

      // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add
      // the interceptor) and then apply the get, post, put, delete methods

      // console.log("user carts: ", response.data)
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
    // params = {} above is an object that will contain the values of the keys of the object passed to the function getProducts()
    // or:
    // - async ({ categoryId = null, colors = [], sizes = [], pricesData = [], pageNumber = 0,
    //   pageSize = 10, sortBy = 'id', sortDirection = 'ASC', thunkAPI) => {
    try {
      // const {
      //   categoryId = null,
      //   colors = [],
      //   sizes = [],
      //   pricesData = [],

      //   pageNumber = 0,
      //   pageSize = 10,
      //   sortBy = 'id',
      //   sortDirection = 'ASC'
      //   // or
      //   // sortDirection = 'DESC'
      //   // - i could have choosen not to not add the above 3 parameters, because their
      //   //   default values are specified in the backend
      // } = params
      // // - the above variables will store the values of the keys of params object. and if they
      // //   don't exist, then they will be assigned the default values specified above

      const { productData = {} } = params

      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios.post(
        url + '/cart/add-cart-item',
        productData,
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor

      // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add 
      // the interceptor) and then apply the get, post, put, delete methods

      // console.log("user carts: ", response.data)
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
    // params = {} above is an object that will contain the values of the keys of the object passed to the function getProducts()
    // or:
    // - async ({ categoryId = null, colors = [], sizes = [], pricesData = [], pageNumber = 0,
    //   pageSize = 10, sortBy = 'id', sortDirection = 'ASC', thunkAPI) => {
    try {
      // const {
      //   categoryId = null,
      //   colors = [],
      //   sizes = [],
      //   pricesData = [],

      //   pageNumber = 0,
      //   pageSize = 10,
      //   sortBy = 'id',
      //   sortDirection = 'ASC'
      //   // or
      //   // sortDirection = 'DESC'
      //   // - i could have choosen not to not add the above 3 parameters, because their
      //   //   default values are specified in the backend
      // } = params
      // // - the above variables will store the values of the keys of params object. and if they
      // //   don't exist, then they will be assigned the default values specified above

      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios.delete(url + '/cart-item/remove-cart-item', {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
          Authorization: `Bearer ${authToken}`,
        },
      })

      // console.log("user carts: ", response.data)
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
    // params = {} above is an object that will contain the values of the keys of the object passed to the function getProducts()
    // or:
    // - async ({ categoryId = null, colors = [], sizes = [], pricesData = [], pageNumber = 0,
    //   pageSize = 10, sortBy = 'id', sortDirection = 'ASC', thunkAPI) => {
    try {
      // const {
      //   categoryId = null,
      //   colors = [],
      //   sizes = [],
      //   pricesData = [],

      //   pageNumber = 0,
      //   pageSize = 10,
      //   sortBy = 'id',
      //   sortDirection = 'ASC'
      //   // or
      //   // sortDirection = 'DESC'
      //   // - i could have choosen not to not add the above 3 parameters, because their
      //   //   default values are specified in the backend
      // } = params
      // // - the above variables will store the values of the keys of params object. and if they
      // //   don't exist, then they will be assigned the default values specified above

      const { cartItemId = null } = params

      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios.put(
        url + '/cart-item/increment-cart-item/' + cartItemId,
        {}, // empty request body
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor

      // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add 
      // the interceptor) and then apply the get, post, put, delete methods

      // console.log("user carts: ", response.data)
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
    // params = {} above is an object that will contain the values of the keys of the object passed to the function getProducts()
    // or:
    // - async ({ categoryId = null, colors = [], sizes = [], pricesData = [], pageNumber = 0,
    //   pageSize = 10, sortBy = 'id', sortDirection = 'ASC', thunkAPI) => {
    try {
      // const {
      //   categoryId = null,
      //   colors = [],
      //   sizes = [],
      //   pricesData = [],

      //   pageNumber = 0,
      //   pageSize = 10,
      //   sortBy = 'id',
      //   sortDirection = 'ASC'
      //   // or
      //   // sortDirection = 'DESC'
      //   // - i could have choosen not to not add the above 3 parameters, because their
      //   //   default values are specified in the backend
      // } = params
      // // - the above variables will store the values of the keys of params object. and if they
      // //   don't exist, then they will be assigned the default values specified above

      const { cartItemId = null } = params

      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios.put(
        url + '/cart-item/decrement-cart-item/' + cartItemId,
        {}, // empty request body
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor

      // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add 
      // the interceptor) and then apply the get, post, put, delete methods

      // console.log("user carts: ", response.data)
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
  // before integrating the backend ---------- beginning
  // reducers: {
  //   clearCart: (state) => {
  //     state.cartItems = []

  //     // the below two lines are not necassary because the total amount and total price are updated using "useEffect" everytime a change happens to the "cartItems" state variable
  //     // state.totalAmount = 0
  //     // state.subTotalPrice = 0
  //   },

  //   removeItem: (state, action) => {
  //     const itemId = action.payload
  //     state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
  //   },

  //   increaseItem: (state, action) => {
  //     const itemId = action.payload
  //     // console.log(itemId)
  //     const thisItem = state.cartItems.find((item) => item.id === itemId)
  //     // "thisItem" is a reference that points to the item with the same id as the "itemId"
  //     thisItem.amount++
  //     // console.log(thisItem)
  //   },

  //   decreaseItem: (state, action) => {
  //     const itemId = action.payload
  //     const thisItem = state.cartItems.find((item) => item.id === itemId)
  //     // "thisItem" is a reference that points to the item with the same id as the "itemId"

  //     // if(thisItem.amount === 1) {
  //     //   thisItem.amount = 0
  //     //   return
  //     // }
  //     // we can't use the above logic because the correct user experience necessitates that when the user decreases the amount of an item to 0, the item should be removed from the cart
  //     thisItem.amount--
  //   },

  //   // the below function will calculate the total amount and the total price of all the cartItems
  //   calculateTotals: (state) => {
  //     let amount = 0
  //     let total = 0
  //     state.cartItems.forEach((item) => {
  //       amount += item.amount
  //       total += item.amount * item.discountedPrice
  //     })
  //     state.totalAmount = amount
  //     state.subTotalPrice = total
  //   },
  // },
  // before integrating the backend ---------- end

  reducers: {
    clearCartClientSide: (state) => {
      state.cartItems = []
      state.totalAmount = 0
      state.subTotalPrice = 0
    },

    // addToCartClientSide: (state, action) => {
    //   // const itemId = action.payload
    //   const {cartItemId} = action.payload
    // },

    removeFromCartClientSide: (state, action) => {
      const {cartItemId: itemId } = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
    },

    increaseItemQuantityClientSide: (state, action) => {
      const {cartItemId: itemId } = action.payload
      // console.log(itemId)
      const thisItem = state.cartItems.find((item) => item.id === itemId)
      // "thisItem" is a reference that points to the item with the same id as the "itemId"
      thisItem.quantity++
      // console.log(thisItem)

      state.totalAmount++
      state.subTotalPrice += thisItem.product.price
    },

    decreaseItemQuantityClientSide: (state, action) => {
      // const itemId = action.payload
      const { cartItemId } = action.payload
      const thisItem = state.cartItems.find((item) => item.id === cartItemId)
      // "thisItem" is a reference that points to the item with the same id as the "itemId"

      // if(thisItem.amount === 1) {
      //   thisItem.amount = 0
      //   return
      // }
      // we can't use the above logic because the correct user experience necessitates that when the user decreases the amount of an item to 0, the item should be removed from the cart
      thisItem.quantity--

      state.totalAmount--
      state.subTotalPrice -= thisItem.product.price
    },
    // TODO: to change the UI beside/after calling the backend server, instead of having the above
    // reducers and executing their dispatch() calls inside components beside calling
    // async thunk actions. we can just use async thunk and inside the extra-reducers of this 
    // thunk we can access the parameters passed to the async thunk action through "action.meta.arg"
  },
  extraReducers: (builder) => {
    builder
      // get user cart(s):
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        // - action parameter here includes the payload, which is the data being
        //   fetched/returned from the above API call getProducts
        state.isLoading = false
        console.log('action.payload', action.payload)
        state.cartItems = action.payload[0].cartItems
        state.totalAmount = action.payload[0].cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        )
        // - knowing that the above does not cause any security vulnerability
        // - another approach is to change the database design in the backend so that
        //   Cart entity class includes totalQuantity. and then change the logic
        //   inside the service methods based on that
        // - another approach is to create a response DTO in the backend that includes totalQuantity, where
        //   the Cart entity/object instance retrieved from the database is mapped to this
        //   response DTO, by adding the quantities of the individual cartItems
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
        // - action parameter here includes the payload, which is the
        //   error message in this case
        state.isLoading = false
        state.cartItems = []
        // state.paginationData = {};
        // console.error('error getting cart items')
      })
      // add product to cart:
      .addCase(addToCartRequest.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToCartRequest.fulfilled, (state, action) => {
        // - action parameter here includes the payload, which is the data being
        //   fetched/returned from the above API call getProducts
        state.isLoading = false
        state.cartItems = action.payload[0].cartItems
        state.totalAmount++
        // - knowing that the above does not cause any security vulnerability
        // or:
        // state.totalAmount = action.payload[0].cartItems.length
        // - another approach is to change the database design in the backend so that
        //   Cart entity class includes totalQuantity. and then change the logic
        //   inside the service methods based on that
        // - another approach is to create a response DTO in the backend that includes totalQuantity, where
        //   the Cart entity/object instance retrieved from the database is mapped to this
        //   response DTO, by adding the quantities of the individual cartItems
        // state.subTotalPrice = action.payload[0].totalPrice
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
      .addCase(addToCartRequest.rejected, (/*state, action*/) => {
        // - action parameter here includes the payload, which is the
        //   error message in this case
        // state.isLoading = false
        // state.cartItems = []
        // state.paginationData = {};
        // console.error('error adding cart item')
      })
      // increase product in cart:
      .addCase(increaseItemQuantityRequest.pending, (state) => {
        state.isLoading = true
      })
      .addCase(increaseItemQuantityRequest.fulfilled, (state /*, action*/) => {
        // - action parameter here includes the payload, which is the data being
        //   fetched/returned from the above API call getProducts
        state.isLoading = false
        // state.cartItems = action.payload[0].cartItems
        // state.totalAmount++
        // - knowing that the above does not cause any security vulnerability
        // or:
        // state.totalAmount = action.payload[0].cartItems.length
        // - another approach is to change the database design in the backend so that
        //   Cart entity class includes totalQuantity. and then change the logic
        //   inside the service methods based on that
        // - another approach is to create a response DTO in the backend that includes totalQuantity, where
        //   the Cart entity/object instance retrieved from the database is mapped to this
        //   response DTO, by adding the quantities of the individual cartItems
        // state.subTotalPrice = action.payload[0].totalPrice
        // console.log(
        //   'isLoading',
        //   state.isLoading,
        //   'cartItems',
        //   state.cartItems,
        //   'totalAmount',
        //   state.totalAmount,
        //   'subTotalPrice',
        //   state.subTotalPrice
        // )
      })
      .addCase(increaseItemQuantityRequest.rejected, (state /*, action*/) => {
        // - action parameter here includes the payload, which is the
        //   error message in this case
        state.isLoading = false
        // state.cartItems = []
        // state.paginationData = {};
        // console.error('error getting cart items')
      })
      // decrease product from cart:
      .addCase(decreaseItemQuantityRequest.pending, (state) => {
        state.isLoading = true
      })
      .addCase(decreaseItemQuantityRequest.fulfilled, (state /*, action*/) => {
        // - action parameter here includes the payload, which is the data being
        //   fetched/returned from the above API call getProducts
        state.isLoading = false
        // state.cartItems = action.payload[0].cartItems
        // state.totalAmount--
        // - knowing that the above does not cause any security vulnerability
        // or:
        // state.totalAmount = action.payload[0].cartItems.length
        // - another approach is to change the database design in the backend so that
        //   Cart entity class includes totalQuantity. and then change the logic
        //   inside the service methods based on that
        // - another approach is to create a response DTO in the backend that includes totalQuantity, where
        //   the Cart entity/object instance retrieved from the database is mapped to this
        //   response DTO, by adding the quantities of the individual cartItems
        // state.subTotalPrice = action.payload[0].totalPrice
        // console.log(
        //   'isLoading',
        //   state.isLoading,
        //   'cartItems',
        //   state.cartItems,
        //   'totalAmount',
        //   state.totalAmount,
        //   'subTotalPrice',
        //   state.subTotalPrice
        // )
      })
      .addCase(decreaseItemQuantityRequest.rejected, (state /*, action*/) => {
        // - action parameter here includes the payload, which is the
        //   error message in this case
        state.isLoading = false
        // state.cartItems = []
        // state.paginationData = {};
        // console.error('error getting cart items')
      })
      // remove product from cart:
      .addCase(removeFromCartRequest.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeFromCartRequest.fulfilled, (state /*, action*/) => {
        // - action parameter here includes the payload, which is the data being
        //   fetched/returned from the above API call getProducts
        state.isLoading = false
        // state.cartItems = action.payload[0].cartItems
        // state.totalAmount = action.payload[0].cartItems.length
        // - knowing that the above does not cause any security vulnerability
        // - another approach is to change the database design in the backend so that
        //   Cart entity class includes totalQuantity. and then change the logic
        //   inside the service methods based on that
        // - another approach is to create a response DTO in the backend that includes totalQuantity, where
        //   the Cart entity/object instance retrieved from the database is mapped to this
        //   response DTO, by adding the quantities of the individual cartItems
        // state.subTotalPrice = action.payload[0].totalPrice
        // console.log(
        //   'isLoading',
        //   state.isLoading,
        //   'cartItems',
        //   state.cartItems,
        //   'totalAmount',
        //   state.totalAmount,
        //   'subTotalPrice',
        //   state.subTotalPrice
        // )
      })
      .addCase(removeFromCartRequest.rejected, (state /*, action*/) => {
        // - action parameter here includes the payload, which is the
        //   error message in this case
        state.isLoading = false
        // state.cartItems = []
        // state.paginationData = {};
        // console.error('error getting cart items')
      })
      // clear user cart(s):
      .addCase(clearCartRequest.pending, (state) => {
        state.isLoading = true
      })
      .addCase(clearCartRequest.fulfilled, (state, /*action*/) => {
        // - action parameter here includes the payload, which is the data being
        //   fetched/returned from the above API call getProducts

        state.isLoading = false;
        // console.log(
        //   'isLoading',
        //   state.isLoading,
        //   'cartItems',
        //   state.cartItems,
        //   'totalAmount',
        //   state.totalAmount,
        //   'subTotalPrice',
        //   state.subTotalPrice
        // )
      })
      .addCase(clearCartRequest.rejected, (state /*, action*/) => {
        // - action parameter here includes the payload, which is the
        //   error message in this case
        state.isLoading = false
        // state.cartItems = []
        // state.paginationData = {};
        // console.error('error getting cart items')
      })
  },
})

// export const {
//   clearCart,
//   removeItem,
//   increaseItem,
//   decreaseItem,
//   calculateTotals,
// } = cartSlice.actions

export const {
  clearCartClientSide,
  removeFromCartClientSide,
  increaseItemQuantityClientSide,
  decreaseItemQuantityClientSide,
} = cartSlice.actions

export default cartSlice.reducer
