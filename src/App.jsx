import React, { useEffect } from "react";
import Home from "./Pages/Landing/Home";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Auth/Login"
import Register from "./Pages/Auth/Register";
import Marketplace from "./Pages/Market/Marketplace";
import Categories from "./Pages/Categories/Categories";
import Details from "./Pages/Details/Details";
import SellProduct from "./Pages/SellProducts/SellProducts";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyProducts from "./Pages/MyProduct/MyProducts";
import NotFoundPage from "./Pages/NotFound/NotFound";
import ViewProducts from "./Pages/ViewProducts/ViewProducts";
import ManageProduct from "./Pages/Details/Details";

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

const App = () => {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/product/:id" element={<ViewProducts />} />
        <Route path="/sell" element={<SellProduct />} />
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/View-products/:id" element={<ManageProduct />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
