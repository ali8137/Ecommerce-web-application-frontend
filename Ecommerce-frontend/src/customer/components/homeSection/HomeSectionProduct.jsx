const HomeSectionProduct = (product) => {
  const { images, name } = product

  /* TODO: developers-constraint: the first image in the images array must be present */
  if (images.length === 0) {
    console.error('there must be at least one image for the product')
  }

  return (
    <div
      className={`rounded-xl border-[1px] border-gray-200 shadow-l m-3 mb-5 transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl`}
    >
      <div className="text-center">
        <img
          src={
            /* TODO: developers-constraint: the first image in the images array must be present */
            images[0]?.src ||
            'https://rukminim1.flixcart.com/image/612/612/k4d27ww0/shirt/q/w/t/l-el024-el-senor-original-imafnadnjp5pq6tg.jpeg?q=70'
          }
          alt={images[0]?.alt || 'image'}
          className="inline-block h-[12em]"
          onDragStart={(e) => e.preventDefault()}
          role="presentation"
        />
      </div>
      <div className="m-3">
        <p className="text-gray-500 text-sm">{name}</p>
      </div>
    </div>
  )
}

export default HomeSectionProduct
