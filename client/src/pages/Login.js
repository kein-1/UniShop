import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  // When form is big, we can use this tactic to have all the forms share a single state object
  // rather than use multiple useStates for each form value
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const formHandler = (event) => {
    event.preventDefault();
  };

  const userHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginHandler = (event) => {
    event.preventDefault();
    console.log(username);
    console.log(password);
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <form
        className="flex flex-col mt-20 w-1/3 m-auto gap-4 border-2 border-purple-400 p-4"
        onSubmit={loginHandler}
      >
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
    </>
  );
};

export default Login;
