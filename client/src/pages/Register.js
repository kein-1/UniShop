import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import registerUser from "../services/users"

const Register = () => {
  // When form is big, we can use this tactic to have all the forms share a single state object
  // rather than use multiple useStates for each form value
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const emailHandler = (event) => {
    setEmail(event.target.value)
  }
  const userHandler = (event) => {
    setUsername(event.target.value)
  }
  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const registerHandler = async (event) => {
    event.preventDefault()

    const obj = {
      email,
      username,
      password
    } // Make a new object with our current values (tracked by the state)
    try {
      const message = await registerUser(obj) // register the user.
      setEmail("")
      setUsername("")
      setPassword("")
      setMessage(message)
    } catch (error) {
      const { message } = error.response.data
      setMessage(message)
    }
  }

  return (
    <div className="flex h-full items-center justify-center">
      <form
        className="flex flex-col w-1/4 gap-4 border-2 border-purple-400 p-8 h-auto"
        onSubmit={registerHandler}
      >
        <h3 className="text-center">{message}</h3>
        <div className="">
          <input
            type="text"
            id="email"
            value={email}
            onChange={emailHandler}
            className="input input-bordered input-primary w-full"
            placeholder="Email"
          />
        </div>

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
          Register
        </button>

        <h4 className="text-center">
          Already have an account?
          <Link to="/login" className="text-violet-400">
            Login here
          </Link>
        </h4>
      </form>
    </div>
  )
}

export default Register
