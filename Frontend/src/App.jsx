import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/cart";
// Pages
// const Home = lazy(() => import("./pages/Home"));
// const Search = lazy(() => import("./pages/Search"));
// const Cart = lazy(() => import("./pages/Cart.jsx"));
// const Login = lazy(() => import("./pages/Login"));
// const SignUp = lazy(() => import("./pages/SignUp.jsx"));

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/productDtails" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
