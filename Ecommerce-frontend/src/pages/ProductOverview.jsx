// import React from 'react'

import ProductDetails from '../customer/components/productDetails/ProductDetails'

// TODO: add the loader function. this loader function will fetch the product details, and will call the util function requireAuth() function to check if the user is logged in or not

const ProductOverview = () => {

  // TODO: access the single product (to be displayed in this react component) returned by the async action of the "products" redux reducer

  return (
    <div>
      <ProductDetails />
    </div>
  )
}

export default ProductOverview
