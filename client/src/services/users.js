import axios from "axios";

// const baseUrl = "http://localhost:3001/api/users"
const baseUrl = "https://51mw8f-3001.preview.csb.app/api/users";

const loginUser = async (userInfo) => {
  const { data } = await axios.post(`baseurl/${login}`);
  return data;
};

const registerUser = async (userInfo) => {
  const { data } = await axios.post(baseUrl, userInfo);
  return data;
};

export default registerUser;
