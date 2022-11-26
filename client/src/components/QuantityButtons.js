import { useState } from "react"
import { addProductToCart } from "../services/cart"
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi"
import { useQuantityStore, useTotalPriceStore } from "../stateStore"

const QuantityButtons = (props) => {
  const { id, price, title, product_image } = props
  const [quantity, setQuantity] = useState(1)

  /*
  I realized I was calling this function wrong. Make sure you ONLY include the
  name even if there are parameters!! I ran into an infinite loop when i did the
  code :
  const updateQuantity = useQuantityStore((state) => state.setCartQuantity(quantity))

  Here we are retrieving the two functions from our store and using them to
  update our current states
  */
  const updateQuantity = useQuantityStore((state) => state.setCartQuantity)
  const updateTotalPrice = useTotalPriceStore((state) => state.setTotalPrice)

  const addProductHandler = async () => {
    try {
      const totalPrice = quantity * price
      const productImage = product_image
      await addProductToCart({ id, title, quantity, totalPrice, productImage })
      updateQuantity(quantity)
      updateTotalPrice(totalPrice)
    } catch {
      console.log("FAILED TO ADD TO CART")
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-4 justify-center items-center">
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
