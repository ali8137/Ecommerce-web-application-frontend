// import React from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Button } from '@mui/material'
import {
  useDispatch,
  // , useSelector
} from 'react-redux'
import {
  decreaseItem,
  increaseItem,
  removeItem,
} from './redux/features/cartSlice/cartSlice'

const CartItem = (prop) => {
  const {
    id,
    // note that "id" property in the array "women_dress" has values as "1","2","3", ... and not as "0","1","2", ... and hence when dealing with "women_dress" as array be careful of that "id" of each element of the array is different from "index" of each element in this case. and i am too lazy to change "id" values manually
    imageUrl,
    title,
    price,
    discountedPrice,
    color,
    discountPercent,
    amount,
    hasButtons,
  } = prop

  // const { cartItems } = useSelector((store) => store.cart)

  const dispatch = useDispatch()

  return (
    <div className="flex flex-row gap-4 ml-3 border-b">
      <div className="my-5 ml-4 w-2/5 h-2/3 lg:h-fit lg:w-1/5 rounded-md border-2">
        <img src={imageUrl} alt="shirt image" className="w-100 h-auto" />
      </div>
      <div className="lg:relative w-3/5 mt-5">
        <h3 className="font-semibold">{title}</h3>
        <div className="space-x-6">
          <span className="text-gray-500">{color}</span>
          <span className="text-gray-500">large</span>
        </div>
        <div className="mt-5 space-x-2">
          {/* we cant apply mt-... here, because "space-y-3" in the container is more prior than "mt-..." in the children elenebt */}
          <span className="line-through text-gray-400">${price}</span>
          <span className="font-bold">${discountedPrice}</span>
          <span className="text-green-500 font-semibold">
            {discountPercent}% off
          </span>
        </div>
        {hasButtons && (
          <div className="lg:absolute lg:bottom-5 lg:left-5 text-sm">
            <Button color="secondary" size="small">
              remove
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        {hasButtons && (
          <Button onClick={() => dispatch(increaseItem(id))}>
            <KeyboardArrowUpIcon />
          </Button>
        )}
        <div
          className={
            !hasButtons && 'font-bold py-4 px-10 bg-gray-200 rounded-2xl'
          }
        >
          {amount}
        </div>
        {/* note that "id" property in the array "women_dress" has values as "1","2","3", ... and not as "0","1","2", ... and hence when dealing with "women_dress" as array be careful of that "id" of each element of the array is different from "index" of each element in this case. and i am too lazy to change "id" values manually */}
        {/* {console.log("id", id)} */}
        {hasButtons && (
          <Button
            onClick={() => {
              if (amount === 1) {
                dispatch(removeItem(id))
                return
              }
              dispatch(decreaseItem(id))
            }}
          >
            <KeyboardArrowDownIcon />
          </Button>
        )}
      </div>
    </div>
  )
}

export default CartItem
