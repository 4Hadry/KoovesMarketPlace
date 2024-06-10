import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
// import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import Search from "./pages/Search";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
import ProductDetail from "./pages/ProductDetail";
import Shipping from "./pages/Shipping";
import Loader from "./pages/Loader";
import Orders from "./pages/Orders.jsx";
// import DashboardTable from "./components/admin/DashboardTable";
// import Cart from "./pages/cart";
// Pages
const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));

// Dashboard Routes

const Dashboard = lazy(() => import("./pages/admin/dashboard.jsx"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
// const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
// const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
// const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(() =>
  import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(() =>
  import("./pages/admin/management/transactionmanagement")
);

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/productDtails" element={<ProductDetail />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order" element={<Orders />} />
            // Admin routes
            <Route
            // element={
            //   <ProtectedRoute isAuthenticated={true} adminRoute={true} isAdmin={true} />
            // }
            >
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/product" element={<Products />} />
              <Route path="/admin/customer" element={<Customers />} />
              <Route path="/admin/transaction" element={<Transaction />} />
              {/* Charts */}
              <Route path="/admin/chart/bar" element={<Barcharts />} />
              <Route path="/admin/chart/pie" element={<Piecharts />} />
              <Route path="/admin/chart/line" element={<Linecharts />} />
              {/* Apps */}
              {/* <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} /> */}

              {/* Management */}
              <Route path="/admin/product/new" element={<NewProduct />} />

              <Route
                path="/admin/product/:id"
                element={<ProductManagement />}
              />

              <Route
                path="/admin/transaction/:id"
                element={<TransactionManagement />}
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
