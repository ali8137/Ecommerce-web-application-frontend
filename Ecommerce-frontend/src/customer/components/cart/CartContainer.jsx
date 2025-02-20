import Modal from './Modal'
import Cart from './Cart'

// TODO: add the loader function. this loader function will fetch the cart items, and will call the util function requireAuth() function to check if the user is logged in or not

const CartContainer = () => {
  return (
    <>
      <Modal />
      <Cart />
    </>
  )
}

export default CartContainer
