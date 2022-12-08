import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/users";
import { useUserStore } from "../stateStore";

const Login = () => {
  // When form is big, we can use this tactic to have all the forms share a single state object
  // rather than use multiple useStates for each form value
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowErrorMessage] = useState(false);

  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);

  const userHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  // Log the user in
  const loginHandler = async (event) => {
    event.preventDefault();

    const userInfo = {
      username,
      password,
    };
    try {
      // The service function returns response.data which has the return object
      // from the backend
      const { token, name } = await loginUser(userInfo);

      // Set the token and name into our state through the state functions from our store.
      setUser(name);
      setToken(token);

      // Rest the fields and states
      setUsername("");
      setPassword("");
      setErrorMessage("");
      setShowErrorMessage(false);
    } catch (error) {
      console.log("IN HERE");
      setErrorMessage(error.response.data);
      setShowErrorMessage(true);
    }
  };

  return (
    <div className="flex h-full items-center justify-center">
      <form
        className="flex flex-col w-1/4 gap-4 border-2 border-purple-400 p-8 h-auto"
        onSubmit={loginHandler}
      >
        {showError && (
          <span className="text-center text-red-500">{errorMessage}</span>
        )}

        <div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={userHandler}
            className="input input-bordered input-primary w-full"
            placeholder="Username"
          />
        </div>

        <div>
          <input
            type="text"
            id="password"
            value={password}
            onChange={passwordHandler}
            className="input input-bordered input-primary w-full"
            placeholder="Password"
          />
        </div>

        <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full text-sm w-full active:transform active:scale-90 active:duration-200 active:ease-out ">
          Login
        </button>

        <h4 className="text-center">
          Don't have an account?
          <Link to="/register" className="text-violet-400">
            Sign up here
          </Link>
        </h4>
      </form>
    </div>
  );
};

export default Login;
