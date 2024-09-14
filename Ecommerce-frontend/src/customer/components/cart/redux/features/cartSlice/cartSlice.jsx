import { createSlice } from '@reduxjs/toolkit'
import { women_dress } from '../../../../../data/women_dress'

// TODO: there will be definitely more changes for this file

const initialState = {
  // cartItems: [],
  cartItems: women_dress.slice(0, 3),
  totalAmount: 0,
  subTotalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []

      // the below two lines are not necassary because the total amount and total price are updated using "useEffect" everytime a change happens to the "cartItems" state variable
      // state.totalAmount = 0
      // state.subTotalPrice = 0
    },

    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
    },

    increaseItem: (state, action) => {
      const itemId = action.payload
      // console.log(itemId)
      const thisItem = state.cartItems.find((item) => item.id === itemId)
      // "thisItem" is a reference that points to the item with the same id as the "itemId"
      thisItem.amount++
      // console.log(thisItem)
    },

    decreaseItem: (state, action) => {
      const itemId = action.payload
      const thisItem = state.cartItems.find((item) => item.id === itemId)
      // "thisItem" is a reference that points to the item with the same id as the "itemId"

      // if(thisItem.amount === 1) {
      //   thisItem.amount = 0
      //   return
      // }
      // we can't use the above logic because the correct user experience necessitates that when the user decreases the amount of an item to 0, the item should be removed from the cart 
      thisItem.amount--
    },

    // the below function will calculate the total amount and the total price of all the cartItems
    calculateTotals: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.discountedPrice
      })
      state.totalAmount = amount
      state.subTotalPrice = total
    },
  },
})

export const {
  clearCart,
  removeItem,
  increaseItem,
  decreaseItem,
  calculateTotals,
} = cartSlice.actions

export default cartSlice.reducer
