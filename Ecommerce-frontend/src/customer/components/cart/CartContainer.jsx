// import React from 'react'


// import { women_dress } from '../../data/women_dress'
import Modal from './Modal'
import Cart from './Cart'
// import { useSelector } from 'react-redux'

// TODO: add the loader function. this loader function will fetch the cart items, and will call the util function requireAuth() function to check if the user is logged in or not

const CartContainer = () => {
  // const [isOpen, setIsOpen] = useState(false)


  // for state management using redux toolkit
  // const { isOpen } = useSelector((store) => store.modal)



  return (
    <>
      {/* {isOpen ? ( */}
        {/* <Modal open={isOpen} /> */}
        <Modal />
      {/* ) : ( */}
        <Cart />
      {/* )} */}
      {/* the above statement of the ternary operator for conditional rendering must be used inside a <> </>  or <div> </div> and not directly outside or without them*/}
    </>
  )
}

export default CartContainer
