import axios from 'axios'

const url = 'http://localhost:8088/api'
// const frontendUrl = "http://localhost:5173";
const authToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWRAZ21haWwuY29tIiwiaWF0IjoxNzM5NTM3MzkyLCJleHAiOjE3NDA0MDEzOTJ9.IsXGRK049-yLacKA5r8d2HtlQvtVLdBPOooIZMg0tj8'
// TODO: change the way to get the auth token (using localStorage, redux, httpOnly cookies, sessionStorage, etc...)
// TODO: add an global interceptor in the utility class that will add/attach the auth token to the request headers

// get products based on the category:
export async function getProductsByCategory(categoryId) {
  //  TODO: the values of the categoryId are based on the values of the categories in the database
  try {
    const queryParams = new URLSearchParams()
    queryParams.append('categoryId', categoryId)

    // TODO: for better readability, the below is better to be written as `${}` rather than ""
    const response = await axios(
      url + '/products/products-criteria-apiV2?' + queryParams.toString(),
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
  } catch (error) {
    console.error('error fetching products: ', error)
    throw error
  }
}

// get all categories:
export async function getCategories() {
  try {
    // TODO: for better readability, the below is better to be written as `${}` rather than ""
    const response = await axios(url + '/categories', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
    // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor
    // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add the interceptor) and then apply the get, post, put, delete methods

    return response.data
  } catch (error) {
    console.error('error fetching categories: ', error)
    throw error
  }
}

// get attributes of product table in the database:
export async function getProductAttributes() {
  try {
    // TODO: for better readability, the below is better to be written as `${}` rather than ""
    const response = await axios(url + '/products/product-attributes', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
    // TODO: replace adding the jwt token here by adding/attaching it through a global interceptor
    // TODO: replace the above by using axios instance (that is axios.create()) (and if wanted, add the interceptor) and then apply the get, post, put, delete methods

    return response.data
  } catch (error) {
    console.error('error fetching product attributes: ', error)
    throw error
  }
}

// create stripe payemnt:
export async function createPaymentWithStripe() {
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
    }

    const lineItems = {
      cartItems: cartItems.map((cartItem) => ({
        id: cartItem.id,
        quantity: cartItem.quantity,
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
  } catch (error) {
    console.error('error creating payment with stripe: ', error)
    throw error
  }
}
