import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import {
  decreaseItemQuantityClientSide,
  decreaseItemQuantityRequest,
  increaseItemQuantityClientSide,
  increaseItemQuantityRequest,
  removeFromCartClientSide,
  removeFromCartRequest,
} from './redux/features/cartSlice/cartSlice'

const CartProduct = (prop) => {
  const { id, size, color, quantity, product, hasButtons } = prop

  const { name, /*description,*/ price, images } = product

  const dispatch = useDispatch()

  return (
    <div className="flex flex-row gap-4 ml-3 border-b">
      <div className="my-5 ml-4 w-2/5 h-2/3 lg:h-fit lg:w-1/5 rounded-md border-2">
        <img src={images[0].src} alt="shirt image" className="w-100 h-auto" />
      </div>
      <div className="lg:relative w-3/5 mt-5">
        <h3 className="font-semibold">{name}</h3>
        <div className="space-x-6">
          <span className="text-gray-500 border-r-2 pr-5">{color}</span>
          <span className="text-gray-500">{size}</span>
        </div>
        <div className="mt-5 space-x-2">
          <span className="line-through text-gray-400">{/* ${price} */}</span>
          {/* <span className="font-bold">${discountedPrice}</span> */}
          <span className="font-bold">${price}</span>
          <span className="text-green-500 font-semibold">
            {/* {discountPercent} */}% off
          </span>
        </div>
        {hasButtons && (
          <div className="lg:absolute lg:bottom-5 lg:left-5 text-sm">
            <Button
              color="secondary"
              size="small"
              onClick={() => {
                try {
                  dispatch(removeFromCartClientSide({ cartItemId: id }))
                } catch (error) {
                  console.error(error)
                  return
                }

                dispatch(removeFromCartRequest({ cartItemId: id }))
              }}
            >
              remove
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        {hasButtons && (
          <Button
            onClick={() => {
              try {
                dispatch(increaseItemQuantityClientSide({ cartItemId: id }))
              } catch (error) {
                console.error(error)
                return
              }

              dispatch(increaseItemQuantityRequest({ cartItemId: id }))
            }}
          >
            <KeyboardArrowUpIcon />
          </Button>
        )}
        <div
          className={
            !hasButtons ? 'font-bold py-4 px-10 bg-gray-200 rounded-2xl' : ''
          }
        >
          {quantity}
        </div>
        {hasButtons && (
          <Button
            onClick={() => {
              if (quantity === 1) {
                try {
                  dispatch(removeFromCartClientSide({ cartItemId: id }))
                } catch (error) {
                  console.error(error)
                  return
                }

                dispatch(removeFromCartRequest({ cartItemId: id }))
                return
              }

              try {
                dispatch(decreaseItemQuantityClientSide({ cartItemId: id }))
              } catch (error) {
                console.error(error)
                return
              }

              dispatch(decreaseItemQuantityRequest({ cartItemId: id }))
            }}
          >
            <KeyboardArrowDownIcon />
          </Button>
        )}
      </div>
    </div>
  )
}

export default CartProduct
