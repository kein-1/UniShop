import { useState } from "react"
import { addProductToCart } from "../services/cart"
import {
  HiOutlineArrowCircleUp,
  HiOutlineArrowCircleDown
} from "react-icons/hi"
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
      <div className="flex items-center">
        <div className="flex gap-2 items-center w-full">
          {/* added some transform, transition, and translate when clicked so it adds some animation to the buttons when clicked  */}
          <p
            className="font-semibold hover:transform hover:scale-150 duration-300 text-lg active:transform active:translate-y-4 active:duration-500 active:ease-out"
            onClick={() => {
              setQuantity(quantity - 1)
            }}
          >
            <HiOutlineArrowCircleDown />
          </p>
          <p className="font-semibold text-lg">{quantity}</p>
          <p
            className="font-semibold hover:transform hover:scale-150 duration-300 text-lg active:transform active:-translate-y-4 active:duration-500 active:ease-out"
            onClick={() => {
              setQuantity(quantity + 1)
            }}
          >
            <HiOutlineArrowCircleUp />
          </p>
        </div>

        <div className="flex w-full">
          <button
            className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full text-sm w-full active:transform active:scale-90 active:duration-200 active:ease-out "
            onClick={addProductHandler}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  )
}

export default QuantityButtons
