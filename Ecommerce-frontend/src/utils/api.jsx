import axios from "axios";

const url = "http://localhost:8088/api";


// get products based on the category:
export async function getProductsByCategory(categoryId) {
    /* TODO: the values of the categoryId are based on the values of 
  the categories in the database */
// or:
// export async function getProducts(params = {}) {
// params = {} above is an object that will contain the values of the keys of the object passed to the function getProducts()
    try {
        // const {
        //     categoryId = null
        // } = params;

        const queryParams = new URLSearchParams();
        queryParams.append("categoryId", categoryId);

        const response = await axios(url + "/products/products-criteria-apiV2?" + queryParams.toString());
        // console.log("products of a category", response.data);
        return response.data;
    }
    catch(error) {
        console.error(error);
        // console.log("error response", error);
        throw error;
        // or
        // throw new Error(error.message || "an error occurred while fetching the data");
        // or
        // throw {
        //     message: error.message,
        //     statusText: error.response.status
        // }
    }
}


// get all categories:
export async function getCategories() {
    try {
        const response = await axios(url + "/categories");
        // console.log("categories", response.data);
        return response.data;
    }
    catch(error) {
      console.error('error', error)
      throw error
      // or
      // throw new Error(error.message || "an error occurred while fetching the data");
      // or
      // throw {
      //     message: error.message,
      //     statusText: error.response.status
      // }
    }
}




// get attributes of product table in the database:
export async function getProductAttributes() {
// or:
// export async function getProducts(params = {}) {
// params = {} above is an object that will contain the values of the keys of the object passed to the function getProducts()
    try {

        const response = await axios(url + "/products/product-attributes");
        // console.log("products of a category", response.data);
        return response.data;
    }
    catch(error) {
        console.error(error);
        // console.log("error response", error);
        throw error;
        // or
        // throw new Error(error.message || "an error occurred while fetching the data");
        // or
        // throw {
        //     message: error.message,
        //     statusText: error.response.status
        // }
    }
}

// send the data of the product to be added to the cart by the user:
export async function addCartItem(cartItem) {
  // or:
  // export async function addCartItem(params = {}) {
  // params = {} above is an object that will contain the values of the keys of the object passed to the function getProducts()
  try {
    const response = await axios.post(url + '/cart/addCartItem', cartItem, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // console.log("adding cart item response", response.data);
    // return response.data
  } catch (error) {
    console.error(error)
    // console.log("error response", error);
    throw error
    // or
    // throw new Error(error.message || "an error occurred while fetching the data");
    // or
    // throw {
    //     message: error.message,
    //     statusText: error.response.status
    // }
  }
}