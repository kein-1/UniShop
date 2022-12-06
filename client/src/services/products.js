import axios from "axios"
axios.defaults.withCredentials = true // had to configure this for the cookies to send from backend..

// const baseUrl = "http://localhost:3001/api/products"
const baseUrl = "https://5l7170-3001.preview.csb.app/api/products"

const getAllProducts = async () => {
  const items = await axios.get(baseUrl)
  return items.data
}

const getSpecificProduct = async (id) => {
  const items = await axios.get(`${baseUrl}/${id}`)
  return items.data
}

export { getAllProducts, getSpecificProduct }
