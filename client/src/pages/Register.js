import { useState, useEffect } from "react"

const Register = () => {
  // When form is big, we can use this tactic to have all the forms share a single state object
  // rather than use multiple useStates for each form value
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: ""
  })

  const formHandler = (event) => {
    event.preventDefault()
    console.log(event.target.id)
  }

  // Learned this: ES6 bracket notation around a key lets us use a variable key
  // So now we can just copy over the current form object, then replace the key with
  // the ID key value (based on the input values ID)
  const inputHandler = (event) => {
    console.log(form)
    setForm({ ...form, [event.target.id]: event.target.value })
  }

  return (
    <>
      <div className="flex mt-12 w-1/2 m-auto gap-4 h-4/5">
        <form className="w-full" onSubmit={formHandler}>
          <div>
            <input
              type="number"
              id="phoneNumber"
              value={form.phoneNumber}
              onChange={inputHandler}
              className="input input-bordered input-primary w-full"
              placeholder="Phone Number"
            />
          </div>

          <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full text-sm w-full active:transform active:scale-90 active:duration-200 active:ease-out ">
            Place Order!
          </button>
        </form>
      </div>
    </>
  )
}

export default Register
