import axios from "axios"

const baseUrl = "http://localhost:3001/api/checkout/create-checkout-session"
// const baseUrl = "https://51mw8f-3001.preview.csb.app/api/checkout/create-checkout-session";

const checkoutProducts = async (cartItems) => {
  console.log("In checkout to stripe frontend here ")
  const response = await axios.post(baseUrl, cartItems)
  return response.data
}

export default checkoutProducts
