import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import ProductList from "./pages/ProductList.jsx";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/AddProduct" element={<AddProduct />} />
      <Route path="/ProductList" element={<ProductList />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App