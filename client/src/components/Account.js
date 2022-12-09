import { useEffect } from "react"

const Account = (props) => {
  const { user } = props
  const { state } = JSON.parse(window.localStorage.getItem("user"))
  return (
    <>
      <h4> Hello {user} </h4>
    </>
  )
}

export default Account
