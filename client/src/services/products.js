import axios from "axios"
axios.defaults.withCredentials = true // had to configure this for the cookies to send from backend..

const baseUrl = `${process.env.REACT_APP_API_URL}/api/products`
const creds = { withCredentials: true, credentials: "include" };

const getAllProducts = async () => {
  const items = await axios.get(baseUrl, creds)
  return items.data
}

const getSpecificProduct = async (id) => {
  const items = await axios.get(`${baseUrl}/${id}`, creds)
  return items.data
}

export { getAllProducts, getSpecificProduct }
