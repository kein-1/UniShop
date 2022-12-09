import axios from "axios"

const baseUrl = "http://localhost:3001/api/users"

const loginUser = async (userInfo) => {
  const { data } = await axios.post(`${baseUrl}/login`, userInfo)
  return data
}

const registerUser = async (userInfo) => {
  const { data } = await axios.post(baseUrl, userInfo)
  return data
}

export { registerUser, loginUser }
