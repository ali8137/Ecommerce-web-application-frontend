// import React from 'react'
import { Button } from '@mui/material'
import CartProduct from './CartProduct'
import { openModal } from './redux/features/modal/modalSlice'
import {
  useEffect,
  // , useRef
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotals } from './redux/features/cartSlice/cartSlice'
import CartOrderSummary from './CartOrderSummary'

const Cart = () => {
  const {
    cartItems,
    //  subTotalPrice,
    totalAmount,
  } = useSelector((store) => store.cart)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems, dispatch])

  //   console.log('rerender')

  //   const scrollPosition = useRef(0)

  //   useEffect(() => {
  //     console.log('mounting')

  //     window.scrollTo(0, scrollPosition.current)

  //     console.log('mounting: scrollPosition.current', scrollPosition.current)

  //     return () => {
  //       console.log('unmounting')

  //       scrollPosition.current = window.scrollY

  //       console.log(
  //         'unmounting: scrollPosition.current',
  //         scrollPosition.current
  //       )
  //     }
  //   }, [])
  // the value of useRef() variable "scrollPosition" won't be stored across re-mounts, it will reset to its original value when the component is unmounted and then mounted. so, the above code is useless

  return (
    <div className="m-10">
      <h1 className="text-3xl font-bold">shopping Cart</h1>
      <div className="lg:mx-20 flex flex-col-reverse lg:flex-row l lg:justify-between pt-10">
        {/* cart items */}
        <div className="lg:w-3/5 flex flex-col pt-2 mt-24 lg:mt-0 border-t-2">
          {totalAmount === 0 ? (
            <h1 className="m-auto text-2xl font-semibold text-gray-400">
              your Cart is Empty
            </h1>
          ) : (
            <div>
              {cartItems.slice(0, 3).map((product) => (
                <CartProduct key={product.id} {...product} hasButtons={true} />
              ))}
            </div>
          )}
        </div>
        {/* order summary */}
        <div className="lg:mx-5 px-5 pb-5 lg:w-2/5 lg:self-start flex flex-col border-2 rounded-xl shadow-xl">
          <CartOrderSummary />
          <div className="pt-4">
            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ width: '50%', display: 'block', mx: 'auto', mt: 5 }}
              onClick={() => dispatch(openModal())}
            >
              CLEAR CART
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
