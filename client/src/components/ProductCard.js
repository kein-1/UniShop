import { useState } from "react"
import { addProductToCart } from "../services/cart"
import Quantity from "./QuantityButtons"

const ProductCard = (props) => {
  const { category, id, price, product_image, title } = props

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

      <Quantity {...props} />
    </div>
  )
}

export default ProductCard
