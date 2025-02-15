import axios from "axios";

const url = "http://localhost:8088/api";
// const frontendUrl = "http://localhost:5173";
const authToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWRAZ21haWwuY29tIiwiaWF0IjoxNzM5NTM3MzkyLCJleHAiOjE3NDA0MDEzOTJ9.IsXGRK049-yLacKA5r8d2HtlQvtVLdBPOooIZMg0tj8'
// TODO: change the way to get the auth token (using localStorage, redux, httpOnly cookies, sessionStorage, etc...)
// TODO: add an global interceptor in the utility class that will add/attach the auth token to the request headers


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

      const queryParams = new URLSearchParams()
      queryParams.append('categoryId', categoryId)

      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios(
        url + '/products/products-criteria-apiV2?' + queryParams.toString(),
        {
          headers: {
            // 'Content-Type': 'application/json',
            // Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor
      
      // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add 
      // the interceptor) and then apply the get, post, put, delete methods

      // console.log("products of a category", response.data);
      return response.data
    }
    catch(error) {
        console.error("error fetching products: ", error);
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
      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios(url + '/categories', {
        headers: {
          // 'Content-Type': 'application/json',
          // Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
          Authorization: `Bearer ${authToken}`,
        },
      })
      // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor
      
      // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add 
      // the interceptor) and then apply the get, post, put, delete methods

      // console.log("categories", response.data);
      return response.data
    }
    catch(error) {
      console.error('error fetching categories: ', error)
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
      // TODO: for better readability, the below is better to be written as `${}` rather than ""
      const response = await axios(url + '/products/product-attributes', {
        headers: {
          // 'Content-Type': 'application/json',
          // Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
          Authorization: `Bearer ${authToken}`,
        },
      })
      // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor
      
      // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add 
      // the interceptor) and then apply the get, post, put, delete methods

      // console.log("products of a category", response.data);
      return response.data
    }
    catch(error) {
        console.error("error fetching product attributes: ", error);
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

// // send the data of the product to be added to the cart by the user:
// export async function addCartItem(cartItem) {
//   // or:
//   // export async function addCartItem(params = {}) {
//   // params = {} above is an object that will contain the values of the keys of the object passed to the function getProducts()
//   try {
//     const response = await axios.post(url + '/cart/addCartItem', cartItem, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     // console.log("adding cart item response", response.data);
//     // return response.data
//   } catch (error) {
//     console.error("error adding cart item: ", error)
//     // console.log("error response", error);
//     throw error
//     // or
//     // throw new Error(error.message || "an error occurred while fetching the data");
//     // or
//     // throw {
//     //     message: error.message,
//     //     statusText: error.response.status
//     // }
//   }
// }



// // create paypal payemnt:
// export async function createPaymentWithPaypal() {
//   // or:
//   // export async function addCartItem(params = {}) {
//   // params = {} above is an object that will contain the values of the keys of the object passed to the function getProducts()
//   try {
//     const response = await axios.post(url + '/payment/createPayment');
//     // console.log("creating payment with paypal response: ", response.data);
//     return response.data
//   } catch (error) {
//     console.error("error creating payment with paypal: ", error)
//     // console.log("error response", error);
//     throw error
//     // or
//     // throw new Error(error.message || "an error occurred while fetching the data");
//     // or
//     // throw {
//     //     message: error.message,
//     //     statusText: error.response.status
//     // }
//   }
// }


// create stripe payemnt:
export async function createPaymentWithStripe() {
  // or:
  // export async function addCartItem(params = {}) {
  // params = {} above is an object that will contain the values of the keys of the object passed to the function getProducts()
  try {
    const cartItems = [
      {
        id: 1,
        quantity: 1,
        product: {
          id: 1,
          name: 'product 1',
          price: 500,
        },
      },
      {
        id: 2,
        quantity: 2,
        product: {
          id: 2,
          name: 'product 2',
          price: 200,
        },
      },
      {
        id: 3,
        quantity: 3,
        product: {
          id: 3,
          name: 'product 3',
          price: 300,
        },
      },
    ]

    const order = {
      id: 1,
      // total: 600,
    }

    const lineItems = {
      cartItems: cartItems.map((cartItem) => ({
        id: cartItem.id,
        quantity: cartItem.quantity,
        // name: cartItem.product.name,
        // price: cartItem.product.price,
        product: cartItem.product,
      })),
      currency: 'usd',
      orderId: order.id,
      // successUrl: frontendUrl + '/payment/success',
      successUrl: 'https://05db-85-112-89-111.ngrok-free.app',
      // cancelUrl: frontendUrl + '/payment/cancel',
      cancelUrl:
        'https://05db-85-112-89-111.ngrok-free.app/women/clothing/tops?categoryId=6',
    }

    // TODO: for better readability, the below is better to be written as `${}` rather than ""
    const response = await axios.post(
      url + '/payment/create-checkout-session',
      lineItems,
      //   , {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
      {
        headers: {
          // 'Content-Type': 'application/json',
          // Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
    // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor
    
    // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add 
    // the interceptor) and then apply the get, post, put, delete methods

    console.log('creating payment with stripe response: ', response.data)
    return response.data
  } catch (error) {
    console.error('error creating payment with stripe: ', error)
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