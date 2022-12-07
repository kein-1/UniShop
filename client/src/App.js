import "./index.css"
import { Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ProductOverviewContent from "./components/ProductOverviewContent"

import Home from "./pages/Home"
import ProductsMain from "./pages/ProductsMain"
import Checkout from "./pages/Checkout"
import Register from "./pages/Register"
import Login from "./pages/Login"
import CheckoutSuccess from "./pages/CheckoutSuccess"
import CheckoutCancel from "./pages/CheckoutCancel"

const App = () => {
  return (
    <>
      <Navbar />
      {/* Ill need to configure to show either the Re-gister Page or the User's Acccount page once if the user is logged in */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Register />} />
        <Route path="/shop" element={<ProductsMain />} />
        <Route path="/products/:id" element={<ProductOverviewContent />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<CheckoutSuccess />} />
        <Route path="/cancel" element={<CheckoutCancel />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App
