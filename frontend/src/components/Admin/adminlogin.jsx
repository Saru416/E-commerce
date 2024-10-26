import React from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlesubmit = () => {
    navigate('/adminDashboard')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-[42rem] h-[32rem] rounded-3xl flex">
        {/* Left section */}
        <div className="w-1/3 bg-gray-400 rounded-l-3xl flex flex-col justify-center items-center p-4">
          <h2 className="text-2xl bold">Welcome!</h2>
          <p className="mt-2 text-center text-base">Login</p>
        </div>

        {/* Right section */}
        <div className="w-2/3 p-8 bg-white-50 rounded-r-3xl">
          <h1 className="text-center text-3xl font-serif">Admin login</h1>
          <form className="text-black mt-16">
            <label className="block mb-2">Email</label>
            <input
              className="w-full p-3 mb-4 border border-black rounded-3xl"
              type="email"
            />

            <label className="block mb-2">Password</label>
            <input
              className="w-full p-3 mb-6 border border-black rounded-3xl"
              type="password"
            />
            <button
              type="submit"
              className=" mt-3 w-1/3 bg-blue-400 text-white py-2 rounded-3xl hover:bg-blue-600"
              onClick={handlesubmit}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
