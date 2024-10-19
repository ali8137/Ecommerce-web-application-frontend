// import React from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder'

const OrderItem = (prop) => {
  const { imageUrl, title, discountedPrice, color, brand } = prop

  return (
    <div className="space-y-6 lg:space-y-0 lg:flex lg:justify-between border py-3 px-10 shadow-black shadow-sm">
      <div className="lg:w-[45%] lg:flex gap-5">
        <div className="ml-4 w-2/5 h-2/3 lg:h-fit lg:w-1/3 rounded-md border-2">
          <img src={imageUrl} alt="order item image" className="w-100 h-auto" />
        </div>
        <div className="space-y-2">
          <h3>{title}</h3>
          <div className="flex gap-4 text-gray-500">
            <p className="border-r-2 pr-4">{color}</p>
            <p>large</p>
          </div>
          <div>brand: {brand}</div>
          <div className="">
            <p>${discountedPrice}</p>
          </div>
        </div>
      </div>
      <div className="self-center">
        <StarBorderIcon sx={{ color: 'gray', opacity: '60%', mr: '5px' }} />
        <span className="text-gray-500">Rate and Review Product</span>
      </div>
    </div>
  )
}

export default OrderItem
