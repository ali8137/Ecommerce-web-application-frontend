import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// display all products
// display filtered products
// display one product
// display ratings and reviews of a product


const url = "http://localhost:8088/api/products";

const initialState = {
    products: [],
    paginationData: {},
    product: null,
    isLoading: false
    // - since each of the above data variables are used in different 
    //   routes, we can use the above isLoading variable as a common isLoading 
    //   variable for all of them
    // TODO: developer-constraint: isLoading is used for all the above data variables. in case the 
    // business logic states/dictates otherwise, then you have to add new isLoading variables for each of 
    // the above data variables and you have to change how the isLoading variable is managed in the below 
    // reducers
}


// get all products category-wise, filtered, sorted and paginated:
export const getProducts = createAsyncThunk(
    "products/getProducts",
    async (params = {}, thunkAPI) => {
      // params = {} above is an object that will contain the values of the keys of the object passed to the function getProducts()
      // or:
      // - async ({ categoryId = null, colors = [], sizes = [], pricesData = [], pageNumber = 0,
      //   pageSize = 10, sortBy = 'id', sortDirection = 'ASC', thunkAPI) => {
      try {
        const {
          categoryId = null,
          colors = [],
          sizes = [],
          pricesData = [],

          pageNumber = 0,
          pageSize = 10,
          sortBy = 'id',
          sortDirection = 'ASC'
          // or
          // sortDirection = 'DESC'
          // - i could have choosen not to not add the above 3 parameters, because their
          //   default values are specified in the backend
        } = params
        // - the above variables will store the values of the keys of params object. and if they
        //   don't exist, then they will be assigned the default values specified above

        const queryParams = new URLSearchParams()
        if (categoryId) queryParams.append('categoryId', categoryId)
        if (colors.length > 0) queryParams.append('colors', colors.join(','))
        if (sizes.length > 0) queryParams.append('sizes', sizes.join(','))
        if (pricesData.length > 0)
          queryParams.append('pricesData', pricesData.join(','))
        // if (pageNumber)
        queryParams.append('page', pageNumber)
        // if (pageSize)
        queryParams.append('pageSize', pageSize)
        // if (sortBy)
        queryParams.append('sortBy', sortBy)
        queryParams.append('sortDirection', sortDirection)

        // console.log("query params", queryParams.toString())

        const response = await axios(
          url + '/products-criteria-apiV2?' + queryParams.toString()
        )
        // or:
        // const response = await axios(`${url}/products-criteria-api?${queryParams.toString()}`);
        // console.log("products", response.data)
        return response.data
      } catch (err) {
        console.error("error fetching products", err.toJSON?.() || err)
        return thunkAPI.rejectWithValue({ error: err.message })
      }
    }
)



// get one product by id:
export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (params = {}, thunkAPI) => {
    // params = {} above is an object that will contain the values of the keys of the object passed to the function getProducts()
    // or:
    // async ({ productId = null }, thunkAPI) => {
    try {
      const { productId = null } = params
      // - the above variables will store the values of the keys of params object. and if they
      //   don't exist, then they will be assigned the default values specified above

      // console.log('product id', productId)

      const response = await axios(url + '/' + productId)
      // or:
      // const response = await axios(`${url}/${productId}`);
      // console.log("product", response.data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)






const productsSlice = createSlice({
    name: "products",
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
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                // - action parameter here includes the payload, which is the data being 
                //   fetched/returned from the above API call getProducts
                state.isLoading = false;
                state.products = action.payload.content;
                // console.log("isLoading", state.isLoading, "products", state.products);
                state.paginationData = action.payload.page;
            })
            .addCase(getProducts.rejected, (state/*, action*/) => {
                // - action parameter here includes the payload, which is the 
                //   error message in this case
                state.isLoading = false;
                state.products = [];
                state.paginationData = {};
            })
            // get one product by id:
            .addCase(getProductById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                // - action parameter here includes the payload, which is the data being 
                //   fetched/returned from the above API call getProducts
                state.isLoading = false;
                state.product = action.payload;
                // console.log("isLoading", state.isLoading, "product", state.product);
            })
            .addCase(getProductById.rejected, (state/*, action*/) => {
                // - action parameter here includes the payload, which is the 
                //   error message in this case
                state.isLoading = false;
                state.product = {};
                // console.log("isLoading", state.isLoading, "product", state.product);
            })
    }
})



// export const {
//     actionFunction1,
//     actionFunction2
// } = productsSlice.actions;

export default productsSlice.reducer;