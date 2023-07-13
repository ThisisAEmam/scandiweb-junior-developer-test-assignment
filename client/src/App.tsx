import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/Products/Products";
import AddProduct from "./pages/AddProduct/AddProduct";
import "./App.css";
import Footer from "./components/Footer/Footer";

class App extends Component {
  render() {
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
  }
}

export default App;
