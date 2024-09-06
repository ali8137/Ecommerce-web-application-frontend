// import React from 'react'
import './productCard.css'

const ProductCard = (product) => {
  const { imageUrl, brand, title, discountedPrice, price, discountPercent } = product

  return (
    <div className="productCard w-[15rem] m-3 transition-all cursor-pointer">
      {/* productCard is a class i defined */}
      <div className="h-[20rem]">
        <img
          className="h-full w-full object-cover object-left-top"
          src={imageUrl}
          alt="women dress"
        />
      </div>
      <div className="text bg-white p-3">
        {/* testPart is a class i defined */}
        <div>
          <p>{brand}</p>
          <p>{title}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">{discountedPrice}$</p>
          <p className="line-through opacity-50">{price}$</p>
          <p className="text-green-600 font-semibold">{discountPercent}% off</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
