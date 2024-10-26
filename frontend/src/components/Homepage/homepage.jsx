import React, { useEffect } from "react";
import myVideo from "../../assets/video.mp4"; // Correct import statement
import Navbar from "../Navbar/navbar";
import { fetchUser } from "../../redux/slice/userSlice";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const res = dispatch(fetchUser());
    console.log(res);
  },[dispatch]);

  return (
    <>
      <Navbar></Navbar>
      <div className="h-screen relative">
        <video className="w-full h-auto" autoPlay loop muted>
          <source src={myVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <h2 className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-none text-white py-2 px-4 z-20 text-xl">
          Level Up Your Fashion!!
        </h2>

        {/* Button at the bottom-center of the video */}
        <button
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-lime-600 text-black py-2 px-4 rounded z-20"
          onClick={() =>
            document
              .getElementById("category")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          Shop Now
        </button>
      </div>

      <div className="h-[36rem] mt-16 flex flex-col items-center" id="category">
        <h2 className="text-3xl mb-12">CATEGORY</h2>
        {/* Flex container for the cards with space between them */}
        <div className="flex space-x-8">
          <div className="bg-gray-200 p-8 rounded-lg shadow-md h-[26rem] w-80 transform transition duration-300 hover:scale-105 cursor-pointer">
            T-shirt
          </div>
          <div className="bg-gray-200 p-8 rounded-lg shadow-md h-[26rem] w-80 transform transition duration-300 hover:scale-105 cursor-pointer">
            Shirt
          </div>
          <div className="bg-gray-200 p-8 rounded-lg shadow-md h-[26rem] w-80 transform transition duration-300 hover:scale-105 cursor-pointer">
            Pant
          </div>
          <div className="bg-gray-200 p-8 rounded-lg shadow-md h-[26rem] w-80 transform transition duration-300 hover:scale-105 cursor-pointer">
            Jackets
          </div>
        </div>
      </div>

      <div className="h-[32rem] bg-black">
        <h2 className="text-white pt-32 pl-32 text-2xl bold">
          Get Upto 20% Discount!
        </h2>
        <p className="text-white pl-32 pt-5">
          Shop now and win rewards <br></br>for future purchases..
        </p>
      </div>
      <div className="h-[36rem] mt-14 flex flex-col items-center">
        <h2 className="text-3xl mb-12 mt-5">TRENDING</h2>{" "}
        {/* Center heading with margin below */}
        <div className="flex space-x-8">
          {" "}
          {/* Flex container for the cards with space between them */}
          <div className="bg-gray-200 p-8 rounded-lg shadow-md h-[26rem] w-80 transform transition duration-300 hover:scale-105 cursor-pointer">
            T-shirt
          </div>
          <div className="bg-gray-200 p-8 rounded-lg shadow-md h-[26rem] w-80 transform transition duration-300 hover:scale-105 cursor-pointer">
            Shirt
          </div>
          <div className="bg-gray-200 p-8 rounded-lg shadow-md h-[26rem] w-80 transform transition duration-300 hover:scale-105 cursor-pointer">
            Pant
          </div>
          <div className="bg-gray-200 p-8 rounded-lg shadow-md h-[26rem] w-80 transform transition duration-300 hover:scale-105 cursor-pointer">
            Jackets
          </div>
        </div>
      </div>
      <div className="bg-black text-white h-[32rem] mt-14 flex items-start justify-between px-24">
        <div className="flex flex-col">
          <h2 className="text-3xl mb-5 mt-32">CONTACT US</h2>
          <p>For any queries or problem contact us!!</p>
        </div>
        <div className="flex justify-end mt-10">
          <form className="bg-white text-black p-10 rounded-lg w-[26rem] shadow-lg">
            <label className="block mb-2">Name</label>
            <input
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              type="text"
            />

            <label className="block mb-2">Email</label>
            <input
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              type="email"
            />

            <label className="block mb-2">Phone no.</label>
            <input
              className="w-full p-2 mb-6 border border-gray-300 rounded"
              type="tel"
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="h-14"></div>
    </>
  );
}

export default HomePage;
