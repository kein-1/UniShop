import checkoutProducts from "../services/checkout"

const Checkout = ({ cartItems }) => {
  console.log("In checkout@")

  console.log(cartItems)

  const checkoutHandler = async () => {
    try {
      const response = await checkoutProducts(cartItems)
      console.log(response)
      window.location.href = response.url // this redirects to the url, which is
      // returned from our backend. This url leads to the stripe checkout page
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button
      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
      onClick={checkoutHandler}
    >
      Checkout
    </button>
  )
}

export default Checkout
