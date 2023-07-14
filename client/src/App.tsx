import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/Products/Products";
import AddProduct from "./pages/AddProduct/AddProduct";
import "./App.css";
import Footer from "./components/Footer/Footer";
import axios from "axios";

const App: React.FC = () => {
  // axios.defaults.baseURL = "http://192.168.1.99:9002";
  useEffect(() => {
    if (import.meta.env.VITE_API_BASE_URL) {
      axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
    }
  }, [import.meta.env.VITE_API_BASE_URL]);

  return (
    <BrowserRouter>
      <div className="app__container">
        <Routes>
          <Route path="/" index Component={Products} />
          <Route path="/add-product" Component={AddProduct} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
