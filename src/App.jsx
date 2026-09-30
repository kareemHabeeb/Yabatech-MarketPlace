import React, { useEffect } from "react";
import Home from "./Pages/Landing/Home";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Marketplace from "./Pages/Market/Marketplace";
import Details from "./Pages/Details/Details";
import SellProduct from "./Pages/SellProducts/SellProducts";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyProducts from "./Pages/MyProduct/MyProducts";
import NotFoundPage from "./Pages/NotFound/NotFound";
import ViewProducts from "./Pages/ViewProducts/ViewProducts";
import ManageProduct from "./Pages/Details/Details";
import EditProduct from "./Pages/EditPage/EditProduct";
import Profile from "./Pages/Profile/Profile";
import ForgotPassword from "./Pages/Auth/ForgetPassword";
import VerifyOTP from "./Pages/Auth/VerifyOtp";
import ResetPassword from "./Pages/Auth/ResetPassword";
import About from "./Pages/About/About";
import ProtectedRoute from "./global/ProtectedRoute";

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
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutUs" element={<About />} />
        <Route path="/product/:id" element={<ViewProducts />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verifyOTP" element={<VerifyOTP />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

        {/* PROTECTED ROUTES — require a logged-in user */}
        <Route
          path="/sell"
          element={
            <ProtectedRoute>
              <SellProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-products"
          element={
            <ProtectedRoute>
              <MyProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/View-products/:id"
          element={
            <ProtectedRoute>
              <ManageProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={4000} />
    </BrowserRouter>
  );
};

export default App;
