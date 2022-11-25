import "./index.css"
import { Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ProductOverviewContent from "./components/ProductOverviewContent"

import Home from "./pages/home"
import ProductsMain from "./pages/products"

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductsMain />} />
        <Route path="/products/:id" element={<ProductOverviewContent />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App
