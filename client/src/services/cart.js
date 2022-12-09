import axios from "axios"
axios.defaults.withCredentials = true // had to configure this for the cookies to send from backend..

const baseUrl = "http://localhost:3001/api/cart"

const addProductToCart = async (productInfo) => {
  const response = await axios.post(baseUrl, productInfo)
  console.log("added to cart")
}

const getAllCartItems = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const deleteItemFromCart = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export { addProductToCart, getAllCartItems, deleteItemFromCart }
