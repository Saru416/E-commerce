import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserImage from "../../assets/working.png";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false); // State to control search bar visibility
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleLogin = () => {
    // localStorage.setItem("isAuthenticated", "true");
    // localStorage.setItem("user", JSON.stringify(userData));
    // dispatch(setAuthState({ user: userData, isAuthenticated: true }));
    navigate("/login");
  };

  const handleColl = () => {
    navigate("/collections");
  };

  const handleSigout = () => {
    // localStorage.removeItem("isAuthenticated");
    // localStorage.removeItem("user");
    // dispatch(setAuthState({ user: null, isAuthenticated: false }));
    navigate("/login");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleHome = () => {
    navigate("/");
  };

  const toggleSearch = () => {
    setShowSearch((prevState) => !prevState); // Toggle the search bar visibility
  };

  const closeSearch = () => {
    setShowSearch(false); // Close the search bar
  };

  return (
    <div className="fixed top-0 w-full bg-white h-20 px-10 text-black items-center shadow-md z-50 flex justify-between">
      <div
        className={`basis-1/5 ml-4 flex items-center ${
          showSearch ? "hidden" : ""
        }`}
      >
        {isAuthenticated ? (
          <div className="flex items-center">
            {/* User Profile Picture */}
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-2">
              <img
                src={UserImage}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {/* User Display Name */}
            <button onClick={() => navigate('/myProfile')}>
              {" "}
              <span className="text-lg font-semibold">
                {user.user_metadata.display_name || "Guest"}
              </span>
            </button>
          </div>
        ) : (
          <h1>MENU</h1>
        )}
      </div>

      {/* Conditionally move "TWT" to the left or keep it centered */}
      <div
        className={`basis-3/5 text-3xl text-center transition-all duration-300 ${
          showSearch ? "text-left pl-20" : "text-center"
        }`}
      >
        TWT
      </div>

      <div className="basis-1/5 flex items-center justify-end">
        <button className="pl-4" onClick={handleHome}>
          Home
        </button>
        <button className="pl-4" onClick={handleColl}>
          Collections
        </button>
        <button className="pl-4" onClick={toggleSearch}>
          Search
        </button>
        <button className="pl-4" onClick={handleCart}>
          Cart
        </button>
        {isAuthenticated ? (
          <button className="pl-4" onClick={handleSigout}>
            SignOut
          </button>
        ) : (
          <button className="pl-4" onClick={handleLogin}>
            SignUp/Login
          </button>
        )}
        {/* {isLoggedIn ? (
          <button  className="pl-4">Sign Out</button>
        ) : (
          <>
            <button className="pl-4" onClick={handleLogin}>SignUp/Login</button>
          </>
        )} */}
      </div>

      {/* Conditionally show the search bar at the center of the navbar */}
      {showSearch && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[50%] flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          {/* Close "X" button */}
          <button
            onClick={closeSearch}
            className="ml-4 text-gray-500 hover:text-gray-800"
          >
            &#10005;
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
