import axios from "axios"
axios.defaults.withCredentials = true // had to configure this for the cookies to send from backend..

const baseUrl = `${process.env.REACT_APP_API_URL}/api/products`

const getAllProducts = async () => {
  const items = await axios.get(baseUrl)
  return items.data
}

const getSpecificProduct = async (id) => {
  const items = await axios.get(`${baseUrl}/${id}`)
  return items.data
}

export { getAllProducts, getSpecificProduct }
