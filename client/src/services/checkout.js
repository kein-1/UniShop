import axios from "axios"

const baseUrl = "http://localhost:3001/api/checkout/create-checkout-session"

const checkoutProducts = async (cartItems) => {
  console.log("In checkout to stripe frontend here ")

  const { state } = JSON.parse(window.localStorage.getItem("user"))
  // If the user is logged in, pass his ID to the backend
  if (state) {
    const bearer = `bearer ${state.userToken}`

    const config = {
      headers: {
        Authorization: bearer
      }
    }
    const response = await axios.post(baseUrl, cartItems, config)
    return response.data
  }

  // Otherwise, guest checkout
  const response = await axios.post(baseUrl, cartItems)
  return response.data
}

export default checkoutProducts
