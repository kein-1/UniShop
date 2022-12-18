import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URL}/api/users`;
const creds = { withCredentials: true, credentials: "include" };

const loginUser = async (userInfo) => {
  const { data } = await axios.post(`${baseUrl}/login`, userInfo, creds);
  return data;
};

const registerUser = async (userInfo) => {
  const { data } = await axios.post(baseUrl, userInfo, creds);
  return data;
};

export { registerUser, loginUser };
