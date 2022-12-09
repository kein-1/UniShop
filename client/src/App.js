import "./index.css"
import { Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ProductOverviewContent from "./components/ProductOverviewContent"

import Home from "./pages/Home"
import ProductsMain from "./pages/ProductsMain"
import Register from "./pages/Register"
import Login from "./pages/Login"
import CheckoutSuccess from "./pages/CheckoutSuccess"
import CheckoutCancel from "./pages/CheckoutCancel"
import Account from "./components/Account"
import { useUserStore } from "./stateStore"

const App = () => {
  const user = useUserStore((state) => state.user)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Use conditional rendering to show either the user's page if the user is logged in or the users page  */}

        <Route
          path="/account"
          element={user ? <Account user={user} /> : <Register />}
        />
        <Route path="/shop" element={<ProductsMain />} />
        <Route path="/products/:id" element={<ProductOverviewContent />} />
        <Route
          path="/login"
          element={user ? <Account user={user} /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<CheckoutSuccess />} />
        <Route path="/cancel" element={<CheckoutCancel />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App
