// import React from 'react'

import { useEffect } from 'react'
import CartItem from '../cart/CartItem'
import CartOrderSummary from '../cart/CartOrderSummary'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotals } from '../cart/redux/features/cartSlice/cartSlice'

const OrderSummary = () => {
  const {
    cartItems,
    //  subTotalPrice,
    totalAmount,
  } = useSelector((store) => store.cart)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems, dispatch])
  return (
    <div className='m-5'>
      <div className="lg:mx-20 flex flex-col-reverse lg:flex-row l lg:justify-between pt-10">
        {/* cart items */}
        <div className="lg:w-3/5 flex flex-col pt-2 mt-24 lg:mt-0 border-t-2">
          {totalAmount === 0 ? (
            <h1 className="m-auto text-2xl font-semibold text-gray-400">
              your Cart is Empty
            </h1>
          ) : (
            <div className="">
              {cartItems.slice(0, 3).map((product) => (
                <CartItem key={product.id} {...product} hasButtons={false} />
              ))}
            </div>
          )}
        </div>
        {/* order summary */}
        <div className="lg:mx-5 px-5 pb-5 lg:w-2/5 lg:self-start border-2 rounded-xl shadow-xl">
          <CartOrderSummary />
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
