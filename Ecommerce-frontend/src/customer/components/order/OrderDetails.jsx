// import React from 'react'

import { women_dress } from '../../data/women_dress'
import AddressCard from '../checkout/AddressCard'
import OrderItem from './OrderItem'
import OrderTracker from './OrderTracker'

const OrderDetails = () => {
  return (
    <div className="m-16 space-y-16">
      <div>
        <h1 className="text-2xl mb-8 font-bold">delivery address</h1>
        <AddressCard hasButtons={false} />
      </div>
      <div className="px-28">
        <OrderTracker />
      </div>
      <div className="space-y-10">
        {women_dress.map((item) => (
          <OrderItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default OrderDetails
