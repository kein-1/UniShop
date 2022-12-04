import { useState } from "react"
import { addProductToCart } from "../services/cart"
import { Link } from "react-router-dom"

import QuantityButtons from "./QuantityButtons"

const ProductCard = (props) => {
  const { id, product_image, title, price } = props

  return (
    <>
      <div className="flex flex-col max-w-xs justify-between rounded-lg overflow-hidden shadow-lg gap-2 p-4">
        <div className="w-12/12 h-auto m-h-1/2 object-contain">
          <Link to={"/products/" + id}>
            <img
              className="object-scale-down w-96 h-48"
              src={product_image}
              alt=""
            />
          </Link>
        </div>
        <p className="mt-6 font-semibold text-base text-slate-500">{title}</p>
        <p className="font-semibold text-base text-slate-500">$ {price}</p>

        <QuantityButtons {...props} />
      </div>
    </>
  )
}

export default ProductCard
