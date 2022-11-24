import { useState } from "react"
import { addProductToCart } from "../services/cart"

const ProductCard = (props) => {
  const { category, id, price, product_image, title } = props

  const [quantity, setQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(price)
  console.log(typeof price)
  const addProductHandler = async () => {
    try {
      await addProductToCart({ id, title, quantity, totalPrice })
    } catch {
      console.log("FAILED TO ADD TO CART")
    }
  }

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
        <div className="flex gap-4">
          <h3
            className="font-semibold"
            onClick={() => {
              setQuantity(quantity - 1)
              setTotalPrice(totalPrice - price)
            }}
          >
            -
          </h3>
          <h3 className="font-semibold">{quantity}</h3>
          <h3
            className="font-semibold"
            onClick={() => {
              setQuantity(quantity + 1)
              setTotalPrice(totalPrice + price)
            }}
          >
            +
          </h3>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm w-1/4">
          Fav
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm w-3/4"
          onClick={addProductHandler}
        >
          Add To Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
