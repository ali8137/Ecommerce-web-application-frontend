// import React from 'react'

import OrderCard from './OrderCard'
import { women_dress } from '../../data/women_dress'

const orderStatus = [
  { label: 'on the way', value: 'on the way' },
  { label: 'delivered', value: 'delivered' },
  { label: 'cancelled', value: 'cancelled' },
  { label: 'returned', value: 'returned' },
]

const Order = () => {
  return (
    <div className="lg:flex lg:gap-10 m-20">
      <div className="mb-10 lg:self-start border p-5 pt-3 shadow-md pr-16">
        <h2 className="mb-5 font-bold">FILTER</h2>
        <p className="mb-2 font-semibold">ORDERED STATUS</p>
        <div className="space-y-2">
          {orderStatus.map((option) => (
            <div key={option.value}>
              <input
                defaultValue={option.value}
                type="checkbox"
                className="mr-2"
              />
              <label htmlFor={option.value} className="text-gray-600">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-10">
        {women_dress.map((product) => (
          <OrderCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}

export default Order
