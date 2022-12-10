import axios from "axios"

const baseUrl = `${process.env.REACT_APP_API_URL}/api/checkout/create-checkout-session`

const checkoutProducts = async (cartItems) => {
  // JSON.parse turns the string into an object. Only strings are saved in localStorage
  // This object has a state property which corresponds to our global store value
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
