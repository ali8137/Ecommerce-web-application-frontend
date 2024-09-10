// import React from 'react'
// import { useEffect, useRef, useState } from 'react'

const HomeSectionProduct = (product) => {
  const { imageUrl, brand, title } = product

  // const [isClicked, setIsClicked] = useState(false);
  // const productCardAnimate = () => {
  //   setIsClicked(true);

  //   setTimeout(() => {
  //     setIsClicked(false);
  //   }, 2000);
  // }
  // // the above is just to play around with javascript



  return (
    <div
      className={
        `rounded-xl border-[1px] border-gray-200 shadow-l m-3 mb-5 transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl`
        // ${isClicked ? 'animate-pulse' : ''}
        // // the above is just to play around with javascript
      }
      // onClick={() => productCardAnimate()}
      // // the above is just to play around with javascript
    >
      <div className="text-center">
        {/* "flex justify-center" styles can work here also instead of "text-center" and "inline-block" */}
        <img src={imageUrl} alt="" className="inline-block h-[12em]" onDragStart={(e) => e.preventDefault()} role="presentation"/>
      </div>
      <div className="m-3">
        <p className="font-semibold mb-2 mt-2">{brand}</p>
        <p className="text-gray-500 text-sm">{title}</p>
      </div>
    </div>
  )
}

export default HomeSectionProduct