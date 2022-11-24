import axios from "axios"
axios.defaults.withCredentials = true // had to configure this for the cookies to send from backend..

const baseUrl = "http://localhost:3001/api/products"

const getAllProducts = async () => {
  const items = await axios.get(baseUrl)
  return items.data
}

export { getAllProducts }
