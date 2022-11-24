import "./index.css"
import { Route, Routes } from "react-router-dom"

import Navbar from "./components/navbar"

import Home from "./pages/home"
import ProductsMain from "./pages/products"

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductsMain />} />
      </Routes>
    </>
  )
}
export default App
