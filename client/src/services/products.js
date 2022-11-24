import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/products'

const getAllProducts = async () => {
  const items = await axios.get(baseUrl)
  console.log(items)
  return items.data
}

export { getAllProducts }
