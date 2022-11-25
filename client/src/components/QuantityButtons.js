import { useState } from "react"
import { addProductToCart } from "../services/cart"
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi"

const QuantityButtons = (props) => {
  const { id, price, title, product_image } = props
  const [quantity, setQuantity] = useState(1)
  const addProductHandler = async () => {
    try {
      const totalPrice = quantity * price
      const productImage = product_image
      await addProductToCart({ id, title, quantity, totalPrice, productImage })
    } catch {
      console.log("FAILED TO ADD TO CART")
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 items-center">
          <h3
            className="font-semibold hover:transform hover:scale-150 duration-500"
            onClick={() => {
              setQuantity(quantity - 1)
            }}
          >
            <HiOutlineMinus />
          </h3>
          <h3 className="font-semibold">{quantity}</h3>
          <h3
            className="font-semibold hover:transform hover:scale-150 duration-500"
            onClick={() => {
              setQuantity(quantity + 1)
            }}
          >
            <HiOutlinePlus />
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

export default QuantityButtons
