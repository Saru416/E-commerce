import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../../assets/login_background.jpg';
import { registerUser } from "../../redux/slice/userSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await dispatch(loginUser({email, password}));
    console.log(response);
    if (response.type === 'auth/signup/fulfilled') {
      navigate('/');
    } else {
      alert("Login failed. Check your email or password.");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-white w-[42rem] h-[32rem] rounded-3xl flex">
        {/* Left section */}
        <div className="w-1/3 bg-orange-300 rounded-l-3xl flex flex-col justify-center items-center p-4">
          <h2 className="text-2xl bold">Get Started</h2>
          <p className="mt-2 text-center text-base">SignUp Now!!</p>
        </div>

        {/* Right section */}
        <div className="w-2/3 p-8 bg-yellow-50 rounded-r-3xl">
          <h1 className="text-center text-3xl font-serif">TWT</h1>
          <form className="text-black mt-16" onSubmit={handleSignup}>
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
              SignUp
            </button>
          </form>
          <div className="mt-4 text-center">
            <span>Have an account? </span>
            <button
              className="text-blue-500 hover:underline"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
