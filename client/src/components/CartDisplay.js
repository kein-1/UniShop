import { Fragment, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import CartItem from "./CartItem"
import { getAllCartItems } from "../services/cart"
import { useNavigate } from "react-router-dom"
import { useQuantityStore, useTotalPriceStore } from "../stateStore"

const CartDisplay = () => {
  const [open, setOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  // The global states we stored
  const cartQuantity = useQuantityStore((state) => state.cartQuantity)
  const cartPrice = useTotalPriceStore((state) => state.totalPrice)

  // Use navigate hook to redirect
  const navigate = useNavigate()

  // With this useEffect, I set it so that each time the bag is opened, the
  // cart is retrieved by hitting the cart endpoint via the
  // getAllCartItems function. Then this updates the current cart state
  // and is displayed on the client side
  // Currently it is a very expensive operation. I set it so that each time the cart changes
  // it makes a get request to the cart end point in the backend
  // Should i store the cart values in a state or use local storage?
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
  }, [open, cartQuantity, cartPrice])

  console.log(cartItems)

  return (
    <>
      <h3
        className="font-black tracking-widest relative hover:cursor-pointer"
        onClick={() => setOpen(true)}
      >
        BAG
        <span className="flex justify-center w-6 h-6 border-2 rounded-full border-purple-500 absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
          {cartQuantity}
        </span>
      </h3>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-700"
                              onClick={() => setOpen(false)}
                            >
                              X<span className="sr-only">Close panel</span>
                            </button>
                          </div>
                        </div>

                        <ul>
                          {cartItems.length === 0 && <h3>NO ITEMS IN CART</h3>}
                          {cartItems.length > 0 &&
                            cartItems.map((element) => (
                              <CartItem key={element.id} {...element} />
                            ))}
                        </ul>
                      </div>

                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>${cartPrice}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <button
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
                            onClick={() => {
                              navigate("/checkout")
                              setOpen(false)
                            }}
                          >
                            Checkout
                          </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default CartDisplay
