import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sigup from "./Auth/Signup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import Login from "./Auth/Login";
import Home from "./Component/Home";
import OrderHistory from "./Component/OrderHistory";
import ShoppingCart from "./Component/ShoppingCart";
import AdminPanel from "./Component/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route element={<Sigup/>} path="/" />
          <Route element={<Login/>} path="/login" />
          <Route element={<Home/>} path="/home" />
          <Route element={<OrderHistory/>} path="/orderhistory" />
          <Route element={<ShoppingCart/>} path="/cart" />
          <Route element={<AdminPanel/>} path="/admin" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
