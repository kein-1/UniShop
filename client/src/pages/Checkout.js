import { useState, useEffect } from "react"
import CartItem from "../components/CartItem"
import { getAllCartItems } from "../services/cart"
import { useTotalPriceStore } from "../stateStore"

const Checkout = () => {
  const [cartItems, setCartItems] = useState([])

  // When form is big, we can use this tactic to have all the forms share a single state object
  // rather than use multiple useStates for each form value
  const [shippingInfo, setShippingInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: ""
  })

  const [paymentInfo, setPaymentInfo] = useState({
    name: "",
    cardNumber: "",
    cardExp: "",
    cardCVC: ""
  })

  // The global states we stored
  const cartPrice = useTotalPriceStore((state) => state.totalPrice)

  // Instead of using another useEffect hook here, can we store the cartItem in a global state, and manage it through our stateStore?
  //
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

  const formHandler = (event) => {
    event.preventDefault()
    console.log(event.target.id)
    setShippingInfo({
      email: "",
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phoneNumber: ""
    })

    setPaymentInfo({
      name: "",
      cardNumber: "",
      cardExp: "",
      cardCVC: ""
    })
  }

  // Learned this: ES6 bracket notation around a key lets us use a variable key
  // So now we can just copy over the current form object, then replace the key with
  // the ID key value (based on the input values ID)
  const shippingInputHandler = (event) => {
    setShippingInfo({ ...shippingInfo, [event.target.id]: event.target.value })
  }

  return (
    <>
      <div className="flex mt-12 w-3/5 m-auto gap-4">
        <form className="w-full flex flex-col gap-4" onSubmit={formHandler}>
          <p className="text-lg">Contact information</p>

          <div className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                id="email"
                value={shippingInfo.email}
                onChange={shippingInputHandler}
                className="input input-bordered input-primary w-full"
                placeholder="Email"
              />
            </div>
          </div>
          <p className="text-lg">Shipping Address</p>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                type="text"
                id="firstName"
                value={shippingInfo.firstName}
                onChange={shippingInputHandler}
                className="input input-bordered input-primary w-full"
                placeholder="First Name"
              />

              <input
                type="text"
                id="lastName"
                value={shippingInfo.lastName}
                onChange={shippingInputHandler}
                className="input input-bordered input-primary w-full"
                placeholder="Last Name"
              />
            </div>

            <div className="flex gap-4 ">
              <input
                type="text"
                id="name"
                value={shippingInfo.street}
                onChange={shippingInputHandler}
                className="input input-bordered input-primary w-full"
                placeholder="Address"
              />
            </div>

            <div className="flex gap-4 ">
              <input
                type="text"
                id="city"
                value={shippingInfo.city}
                onChange={shippingInputHandler}
                className="input input-bordered input-primary w-full"
                placeholder="City"
              />

              <input
                type="text"
                id="state"
                value={shippingInfo.state}
                onChange={shippingInputHandler}
                className="input input-bordered input-primary w-full"
                placeholder="State"
              />

              <input
                type="text"
                id="zip"
                value={shippingInfo.zip}
                onChange={shippingInputHandler}
                className="input input-bordered input-primary w-full"
                placeholder="Zip"
              />
            </div>

            <div>
              <input
                type="number"
                id="phoneNumber"
                value={shippingInfo.phoneNumber}
                onChange={shippingInputHandler}
                className="input input-bordered input-primary w-full"
                placeholder="Phone Number"
              />
            </div>
          </div>

          <p className="text-lg">Card Info</p>

          <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full text-sm w-full active:transform active:scale-90 active:duration-200 active:ease-out mb-12">
            Place Order!
          </button>
        </form>

        <div className="divider divider-horizontal"></div>

        {/* Add overflow-y-auto to add scrolling once the items overflow the given height. It will have
        a scroll bar  */}
        <div className="w-full">
          <ul className="overflow-y-auto scroll-smooth h-4/5 scroll-px-1">
            {cartItems.length === 0 && <h3>NO ITEMS IN CART</h3>}
            {cartItems.length > 0 &&
              cartItems.map((element) => (
                <CartItem key={element.id} {...element} />
              ))}
          </ul>
          <div className="divider"></div>

          <p className="h-full mb-4">$ Total Cost: {cartPrice}</p>
        </div>
      </div>
    </>
  )
}

export default Checkout
