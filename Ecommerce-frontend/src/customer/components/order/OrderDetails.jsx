import { women_dress } from '../../data/women_dress'
import AddressCard from '../checkout/AddressCard'
import OrderItem from './OrderItem'
import OrderTracker from './OrderTracker'

// TODO: add the loader function. this loader function will fetch the order items, and will call the util function requireAuth() function to check if the user is logged in or not

const OrderDetails = () => {
  // TODO: access the data fetched by the loader function present in this react component

  // TODO: access the order items (to be displayed in this react component) returned by the async action of the "orders" redux reducer

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
