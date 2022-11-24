import { useState } from "react"
import { addProductToCart } from "../services/cart"

const Quantity = (props) => {
  const { id, price, title } = props

  const [quantity, setQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(price)

  const addProductHandler = async () => {
    try {
      await addProductToCart({ id, title, quantity, totalPrice })
    } catch {
      console.log("FAILED TO ADD TO CART")
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
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
    </>
  )
}

export default Quantity
