// import React from 'react'

import { Button } from '@mui/material'
import { useSelector } from 'react-redux'

const CartOrderSummary = () => {
  const { subTotalPrice } = useSelector((store) => store.cart)

  return (
    <>
      <h3 className="text-xl font-semibold mt-6 pb-3">Order Summary</h3>
      <hr />
      <div className="space-y-2">
        <div className="flex justify-between font-semibold">
          <p>subtotal</p>
          <div>${subTotalPrice}</div>
        </div>
        <div className="flex justify-between font-semibold">
          <p>tax</p>
          <div>$1</div>
        </div>
        <div className="flex justify-between font-semibold pb-2">
          <p>delivery/shipping</p>
          <div>$5</div>
        </div>
        <hr />
        <div className="flex justify-between font-bold text-xl mt-4">
          <p>Order total</p>
          <div>${subTotalPrice}</div>
        </div>
        <div className="pt-4">
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ width: '100%' }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  )
}

export default CartOrderSummary
