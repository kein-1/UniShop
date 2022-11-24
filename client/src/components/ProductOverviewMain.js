import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getSpecificProduct } from "../services/products"
import ProductOverviewContent from "./ProductOverviewContent"

const ProductOverview = () => {
  // useParams is a hook that wraps the parameterse in an object. We destructure to access
  // the values
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
  console.log(product)

  return (
    <>
      <ProductOverviewContent {...product} />
    </>
  )
}

export default ProductOverview
