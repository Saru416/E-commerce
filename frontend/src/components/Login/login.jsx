import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/login_background.jpg";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slice/userSlice.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = () => {
    navigate("/signup");
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(loginUser({ email, password }));
    if (response.type === "auth/login/fulfilled") {
      navigate("/"); // Navigate only on successful login
    } else {
      // Display an error message (this could be set in state)
      alert("Login failed. Check your email or password.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white w-[50rem] h-[38rem] rounded-2xl flex shadow-lg overflow-hidden">
        {/* Left section */}
        <div
          className="w-6/12 rounded-l-2xl flex flex-col justify-center items-center p-4"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/31023938/pexels-photo-31023938/free-photo-of-urban-photographer-at-riverside-capturing-scenery.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Right section */}
        <div className="w-6/12 p-8 rounded-r-2xl">
          <h2 class="text-2xl font-semibold text-gray-700 text-center mt-20">
            TWT
          </h2>
          <p class="text-xl text-gray-600 text-center">Welcome back!</p>
          <form className="text-black mt-10" onSubmit={handlesubmit}>
            <div class="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:bg-white focus:ring-2 ring-gray-400 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <a href="#" className="text-xs text-gray-500">
                  Forget Password?
                </a>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:bg-white focus:ring-2 ring-gray-400 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-8">
              <button
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <a
                className="text-xs text-gray-500 uppercase cursor-pointer"
                onClick={handleSignup}
              >
                or sign up
              </a>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
