import { useEffect } from "react"

const Account = (props) => {
  const { user } = props
  return (
    <>
      <h4> Hello {user} </h4>
    </>
  )
}

export default Account
