import { useState, useEffect } from "react"

import getOrders from "../services/orders"

const Account = (props) => {
  const [orders, setOrders] = useState([])

  const { user } = props

  useEffect(() => {
    const ordersHandler = async () => {
      try {
        const { data } = await getOrders()
        setOrders(data)
      } catch (error) {
        console.log(error)
      }
    }
    ordersHandler()
  }, [])

  return (
    <>
      <div className="w-4/5 m-auto my-24">
        <h2 className="p-4 my-4 border-2 border-slate-300"> Hello {user} </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="mb-4">
              <tr className="text-align-left mb-4">
                <th>Order Number</th>
                <th>Order Price</th>
                <th>Order Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((element) => (
                <tr
                  key={element.order_id}
                  className="w-full border border-slate-300"
                >
                  <th className="w-1/6">{element.order_number}</th>
                  <td className="w-1/6">$ {element.order_total}</td>
                  <td className="w-full">
                    {element.order_items.map((element) => (
                      <div key={Math.random() * 1000}>{element}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Account
