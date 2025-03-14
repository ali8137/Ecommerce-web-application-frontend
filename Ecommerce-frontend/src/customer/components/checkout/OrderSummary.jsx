import CartProduct from '../cart/CartProduct'
import CartOrderSummary from '../cart/CartOrderSummary'
import { useSelector } from 'react-redux'

const OrderSummary = (prop) => {
  const { cartItems, totalAmount } = useSelector((store) => store.cart)

  // TODO: access the order items (to be displayed in this react component) returned by the async action of the "orders" redux reducer

  const { onNext/*, forOrderComponent */} = prop

  return (
    <div className="m-5">
      <div className="lg:mx-20 flex flex-col-reverse lg:flex-row l lg:justify-between pt-10">
        {/* cart items */}
        <div className="lg:w-3/5 flex flex-col pt-2 mt-24 lg:mt-0 border-t-2">
          {totalAmount === 0 ? (
            <h1 className="m-auto text-2xl font-semibold text-gray-400">
              your Cart is Empty
            </h1>
          ) : (
            <div className="">
              {cartItems./*slice(0, 3).*/map((product) => (
                <CartProduct key={product.id} {...product} hasButtons={false} />
              ))}
            </div>
          )}
        </div>
        {/* order summary */}
        <div className="lg:mx-5 px-5 pb-5 lg:w-2/5 lg:self-start border-2 rounded-xl shadow-xl">
          <CartOrderSummary forOrderComponent={true} onNext={onNext} />
          {/* <CartOrderSummary
            forOrderComponent={forOrderComponent}
            onNext={onNext}
          /> */}
        </div>
      </div>
    </div>
  )
}

export default OrderSummary





// version 2 (using the items of order instead of those of the cart, which is logically wrong. so previous version is better)
// const OrderSummary = (prop) => {
//   // const { cartItems, totalAmount } = useSelector((store) => store.cart)

//   // TODO: access the order items (to be displayed in this react component) returned by the async action of the "orders" redux reducer

//   const { onNext /*, forOrderComponent */ } = prop

//   const { currentOrder } = useSelector((store) => store.orders)
//   // console.log('current order', currentOrder)
  
//   const dispatch = useDispatch()
  
//   useEffect(() => {
//     dispatch(getUserCurrentOrder())
//     // console.log('current order', currentOrder)
//   }, [dispatch])

//   return (
//     <div className="m-5">
//       <div className="lg:mx-20 flex flex-col-reverse lg:flex-row l lg:justify-between pt-10">
//         {/* cart items */}
//         <div className="lg:w-3/5 flex flex-col pt-2 mt-24 lg:mt-0 border-t-2">
//           {/* {totalAmount === 0 ? ( */}
//           {currentOrder?.totalPrice === 0 ? (
//             <h1 className="m-auto text-2xl font-semibold text-gray-400">
//               your Cart is Empty
//             </h1>
//           ) : (
//             <div className="">
//               {currentOrder?.orderItems?./*slice(0, 3).*/map((product) => (
//                 <CartProduct key={product.id} {...product} hasButtons={false} />
//               ))}
//             </div>
//           )}
//         </div>
//         {/* order summary */}
//         <div className="lg:mx-5 px-5 pb-5 lg:w-2/5 lg:self-start border-2 rounded-xl shadow-xl">
//           <CartOrderSummary forOrderComponent={true} onNext={onNext} />
//           {/* <CartOrderSummary
//             forOrderComponent={forOrderComponent}
//             onNext={onNext}
//           /> */}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default OrderSummary
