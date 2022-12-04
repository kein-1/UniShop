import { useState, useEffect } from "react"
import CartItem from "../components/CartItem"
import { getAllCartItems } from "../services/cart"
import { useTotalPriceStore } from "../stateStore"

const Checkout = () => {
  const [cartItems, setCartItems] = useState([])

  // The global states we stored
  const cartPrice = useTotalPriceStore((state) => state.totalPrice)

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
      <div className="flex mt-12 w-1/2 m-auto gap-4 h-3/5">
        <div className="w-full">
          <h2>Checkout form </h2>
          <h2>Checkout form </h2>
          <h2>Checkout form </h2>
          <h2>Checkout form </h2>
          <h2>Checkout form </h2>
        </div>
        <div className="divider divider-horizontal"></div>

        {/* Add overflow-y-auto to add scrolling once the items overflow the given height. It will have
        a scroll bar  */}
        <div className="w-full">
          <ul className="overflow-y-auto h-full">
            {cartItems.length === 0 && <h3>NO ITEMS IN CART</h3>}
            {cartItems.length > 0 &&
              cartItems.map((element) => (
                <CartItem key={element.id} {...element} />
              ))}
          </ul>
          <div className="divider"></div>

          <p>$ Total Cost: {cartPrice}</p>
        </div>
      </div>
    </>
  )
}

export default Checkout
