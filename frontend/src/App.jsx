import React from "react"; 
import "./App.css";
import "./index.css";
import HomePage from "./components/Homepage/homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import SignUp from "./components/Signup/signup";
import AdminDashboard from "./components/Admin/adminDashboard";
import AdminLogin from "./components/Admin/adminlogin";
import Collections from "./components/Collections/collections";
import withAuth from "./Routes/ProtectedRoute";
import Cart from "./components/Cart/cart";
import Order from "./components/Order/order";
import User from "./components/user/userProfile";

const ProtectedHomePage = withAuth(HomePage);
const ProtectedAdminDashboard = withAuth(AdminDashboard);
const ProtectedCollections = withAuth(Collections);
const ProtectedCart = withAuth(Cart);

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element= {<HomePage/>} />
        <Route path="/signup" element= {<SignUp/>} />
        <Route path='/adminDashboard' element= {<AdminDashboard/>} />
        <Route path='/adminlogin' element= {<AdminLogin/>} />
        <Route path='/collections' element={<ProtectedCollections/>}/>
        <Route path='/cart' element={<ProtectedCart/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/myProfile' element={<User/>}/>
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
