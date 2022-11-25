import Star from "./Star"
import EmptyStar from "./EmptyStar"
import QuantityButtons from "./QuantityButtons"
import { getSpecificProduct } from "../services/products"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const ProductOverviewContent = (props) => {
  const { id } = useParams()
  const [product, setProduct] = useState({})

  useEffect(() => {
    const getOne = async () => {
      try {
        const { data } = await getSpecificProduct(id)
        setProduct(data[0])
      } catch (error) {
        console.log(error)
      }
    }
    getOne()
  }, [])

  const {
    category,
    description,
    price,
    product_image,
    rating_count,
    rating_value,
    title
  } = product

  const roundedRating = Math.round(rating_value)
  const totalRatings = 5
  const starsArr = []

  for (let i = 0; i < roundedRating; i++) {
    starsArr.push(<Star key={i} />)
  }

  for (let i = 0; i < totalRatings - starsArr.length; i++) {
    starsArr.push(<EmptyStar key={i + 10} />)
  }

  return (
    <div className="flex px-20 py-20 gap-8">
      <div className="w-full h-auto">
        <img
          src={product_image}
          className="w-full h-full m-h-auto m-auto"
          alt=""
        />
      </div>
      <div className="flex flex-col w-full">
        <div>
          <h4 className="mb-6">Category: {category}</h4>
          <h2>{title}</h2>
        </div>
        <div className="mt-6 mb-4">
          <h3 className="sr-only">Reviews</h3>
          <div className="flex items-center">
            <div className="flex items-center">{starsArr}</div>
            <p className="sr-only">{roundedRating} out of 5 stars</p>
            <a
              href="#"
              className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              {rating_count} reviews
            </a>
          </div>
        </div>
        <h1 className="font-semibold">${price}</h1>
        <div className="mb-6">
          <h3 className="my-4">Product Description</h3>
          <h3>{description}</h3>
        </div>

        <QuantityButtons {...props} />
      </div>
    </div>
  )
}

export default ProductOverviewContent
