const ProductCard = (props) => {
  console.log(props)
  const { category, id, price, product_image, title } = props

  return (
    <div className="flex flex-col max-w-xs justify-between rounded-lg overflow-hidden shadow-lg gap-2 p-4">
      <div className="w-12/12 h-1/2 object-contain">
        <a href="">
          <img
            className="max-h-full max-w-full"
            src={product_image}
            alt="Sunset in the mountains"
          />
        </a>
      </div>
      <h3 className="mt-6 font-semibold">{title}</h3>

      <div className="flex justify-between items-center">
        <h3 className="font-semibold">${price}</h3>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm">
          Add To Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
