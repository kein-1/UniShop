import { useState, useEffect } from "react"
import CartItem from "../components/CartItem"
import { getAllCartItems } from "../services/cart"

const Checkout = () => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const { cart } = await getAllCartItems()
        setCartItems(cart)
      } catch {
        console.log("FAILED TO RETRIEVE ITEMS")
      }
    }
    getCartItems()
  }, [])

  return (
    <>
      <div className="flex mt-12 w-1/2 m-auto gap-4 h-2/5">
        <div className="w-full">
          <h2>Checkout form </h2>
          <h2>Checkout form </h2>
          <h2>Checkout form </h2>
          <h2>Checkout form </h2>
          <h2>Checkout form </h2>
        </div>
        <ul className="w-full overflow-y-auto h-full">
          {cartItems.length === 0 && <h3>NO ITEMS IN CART</h3>}
          {cartItems.length > 0 &&
            cartItems.map((element) => (
              <CartItem key={element.id} {...element} />
            ))}
        </ul>
      </div>
    </>
  )
}

export default Checkout
