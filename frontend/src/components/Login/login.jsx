import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../../assets/login_background.jpg';
import {useDispatch} from 'react-redux';
import { loginUser } from "../../redux/slice/userSlice.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignup = () => {
    navigate('/signup');
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(loginUser({email, password}));
    console.log(response);
    if (response.type === 'auth/login/fulfilled') {
      navigate('/'); // Navigate only on successful login
    } else {
      // Display an error message (this could be set in state)
      alert("Login failed. Check your email or password.");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-white w-[42rem] h-[32rem] rounded-3xl flex">
        {/* Left section */}
        <div className="w-1/3 bg-orange-300 rounded-l-3xl flex flex-col justify-center items-center p-4">
          <h2 className="text-2xl bold">Welcome Back!</h2>
          <p className="mt-2 text-center text-base">Login to continue</p>
        </div>

        {/* Right section */}
        <div className="w-2/3 p-8 bg-yellow-50 rounded-r-3xl">
          <h1 className="text-center text-3xl font-serif">TWT</h1>
          <form className="text-black mt-16" onSubmit={handlesubmit}>
            <label className="block mb-2">Email</label>
            <input
              className="w-full p-3 mb-4 border border-black rounded-3xl"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="block mb-2">Password</label>
            <input
              className="w-full p-3 mb-6 border border-black rounded-3xl"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className=" mt-3 w-1/3 bg-red-400 text-white py-2 rounded-2xl hover:bg-red-600"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <span>Don't have an account? </span>
            <button
              className="text-blue-500 hover:underline"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
