// import React from 'react'

import { Avatar, Rating } from '@mui/material'
import { useState } from 'react'

const ProductReviewCard = () => {
// TODO: probably need some modifications when the backend job is to be done

  // for rating MUI component
  const [ratingValue, setRatingValue] = useState(2)

  return (
    <div className="flex flex-row pl-4">
      <div className="w-1/12">
        <Avatar src="/broken-image.jpg" className='mx-auto'/>
      </div>
      <div>
        <h2 className="font-semibold">sami hadi</h2>
        <p className="text-sm text-gray-400">september 5, 2024</p>
        <Rating
          name="half-rating"
          value={ratingValue}
          onChange={(event, newValue) => {
            setRatingValue(newValue)
          }}
          precision={0.5}
          size="small"
        />
        <p className='mt-3'>nice product, will definitely buy again</p>
      </div>
    </div>
  )
}

export default ProductReviewCard
