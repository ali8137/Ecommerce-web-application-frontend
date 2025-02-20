import AdjustIcon from '@mui/icons-material/Adjust'

const OrderCard = (prop) => {
  const { imageUrl, title, discountedPrice, color } = prop

  return (
    <div className="space-y-6 lg:space-y-0 lg:flex lg:justify-between border p-2 shadow-black shadow-sm">
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
        </div>
      </div>
      <div className="">
        <p>${discountedPrice}</p>
      </div>
      <div className="">
        <AdjustIcon
          sx={{ color: 'blue', opacity: '60%', width: '15px', mr: '5px' }}
        />
        <span>delivered on september 12 2024</span>
        <p className="text-sm text-gray-600">your item has been delivered</p>
      </div>
    </div>
  )
}

export default OrderCard
