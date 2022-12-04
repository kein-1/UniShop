import { getAllProducts } from "../services/products"
import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"

const ProductsMain = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getAll = async () => {
      try {
        const { data } = await getAllProducts()
        setProducts(data)
      } catch (error) {
        console.log(error)
      }
    }
    getAll()
  }, [])

  /**
    <div className="mt-12 grid grid-cols-auto grid-rows-5 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 px-12 py-6">
      {products.map((element) => (
        <ProductCard key={element.id} {...element} />
      ))}
    </div>
   */
  return (
    <>
      <div className="my-12 w-9/12 m-auto grid grid-cols-auto grid-rows-5 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 px-12 py-6">
        {products.map((element) => (
          <ProductCard key={element.id} {...element} />
        ))}
      </div>
    </>
  )
}

export default ProductsMain
