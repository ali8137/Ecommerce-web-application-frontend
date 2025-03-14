import { NavLink } from 'react-router-dom'
import './productCard.css'

const ProductCard = (product) => {
  const { images, name, price, id } = product

  return (
    <div className="productCard w-[15rem] m-3 transition-all cursor-pointer">
      <NavLink to={`${id}`}>
        {/* TODO: documentation: productCard is a class i defined */}
        <div className="h-[20rem]">
          <img
            className="h-full w-full object-cover object-left-top"
            src={
              /* TODO: developers-constraint: the first image in the images array must be present */
              images[0]?.src ||
              'https://rukminim1.flixcart.com/image/612/612/k4d27ww0/shirt/q/w/t/l-el024-el-senor-original-imafnadnjp5pq6tg.jpeg?q=70'
            }
            alt="women dress"
          />
        </div>
        <div className="text bg-white p-3">
          {/* TODO: documentation: testPart is a class i defined */}
          <div>
            <p>{name}</p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="font-semibold">{price}$</p>
            <p className="line-through opacity-50">{/*price*/}$</p>
            <p className="text-green-600 font-semibold">
              {/*discountPercent*/}% off
            </p>
          </div>
        </div>
      </NavLink>
    </div>
  )
}

export default ProductCard
