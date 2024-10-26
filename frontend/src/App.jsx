import React from "react"; // Import React correctly
import "./App.css";
import "./index.css";
import HomePage from "./components/Homepage/homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/login"; // Your Login component
import SignUp from "./components/SIgnup/signup";
import AdminDashboard from "./components/Admin/adminDashboard";
import AdminLogin from "./components/Admin/adminlogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element= {<HomePage/>} />
        <Route path="/signup" element= {<SignUp/>} />
        <Route path='/adminDashboard' element= {<AdminDashboard/>} />
        <Route path='/adminlogin' element= {<AdminLogin/>} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
