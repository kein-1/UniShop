import axios from "axios";
axios.defaults.withCredentials = true; // had to configure this for the cookies to send from backend..

const baseUrl = `${process.env.REACT_APP_API_URL}/api/cart`;
const creds = { withCredentials: true, credentials: "include" };

const addProductToCart = async (productInfo) => {
  await axios.post(baseUrl, productInfo, creds);
};

const getAllCartItems = async () => {
  const response = await axios.get(baseUrl, creds);
  return response.data;
};

const deleteItemFromCart = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export { addProductToCart, getAllCartItems, deleteItemFromCart };
