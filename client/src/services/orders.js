import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URL}/api/orders`;

const creds = { withCredentials: true, credentials: "include" };

const getOrders = async () => {
  const { state } = JSON.parse(window.localStorage.getItem("user"));

  const bearer = `bearer ${state.userToken}`;

  const config = {
    headers: {
      Authorization: bearer,
      withCredentials: true,
      credentials: "include",
    },
  };
  // Axios get request only has 2 parameters. POST/PUT requests have the 2nd parameter
  // as the object / data we pass in
  const response = await axios.get(baseUrl, config);
  console.log("In orders!");
  console.log(response);
  return response.data;
};

export default getOrders;
