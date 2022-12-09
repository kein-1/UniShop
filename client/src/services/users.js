import axios from "axios"

const baseUrl = `${process.env.REACT_APP_API_URL}/api/users`

const loginUser = async (userInfo) => {
  const { data } = await axios.post(`${baseUrl}/login`, userInfo)
  return data
}

const registerUser = async (userInfo) => {
  const { data } = await axios.post(baseUrl, userInfo)
  return data
}

export { registerUser, loginUser }
