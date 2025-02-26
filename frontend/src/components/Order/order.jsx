import React, { useState } from "react";

const Order = () => {
  const [address, setAddress] = useState(true);

  const toggleStep = () => {
    setAddress((prevState) => !prevState);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto">
        <div className="flex flex-row">
          <button
            type="button"
            className="relative flex justify-center items-center px-5 py-2.5 font-medium hover:bg-gray-400 tracking-wide capitalize rounded-md focus:outline-none transition duration-300 transform active:scale-95 ease-in-out mb-2 w-1/2"
          >
            <span className="pl-2 mx-1">step 1</span>
          </button>
          <button
            type="button"
            className="relative flex justify-center items-center px-5 py-2.5 font-medium hover:bg-gray-400 tracking-wide capitalize rounded-md focus:outline-none transition duration-300 transform active:scale-95 ease-in-out mb-2 w-1/2"
            onClick={toggleStep}
          >
            <span className="pl-2 mx-1">step 2</span>
          </button>
        </div>
        {address ? (
          <div>
            <button
              type="button"
              className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize bg-black rounded-md hover:bg-gray-900 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#FFFFFF"
              >
                <g>
                  <rect fill="none" height="24" width="24"></rect>
                </g>
                <g>
                  <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
                </g>
              </svg>
              <span className="pl-2 mx-1">Add new Address</span>
            </button>
            <div className="mt-5 bg-white rounded-lg shadow">
              <div className="flex">
                <div className="flex-1 py-5 pl-5 overflow-hidden">
                  <h1 className="inline text-2xl font-semibold leading-none">
                    Enter Address
                  </h1>
                </div>
              </div>
              <div className="px-5 pb-5">
                <input
                  placeholder="Name"
                  className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:ring-2 ring-offset-2 ring-gray-400"
                />
                <input
                  placeholder="Address"
                  className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:ring-2 ring-offset-2 ring-gray-400"
                />
                <div class="flex">
                  <div className="flex-grow w-1/4 pr-2">
                    <input
                      placeholder="City"
                      className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                  <div className="flex-grow">
                    <input
                      placeholder="State"
                      className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                </div>
                <input
                  placeholder="Pincode"
                  className="flex-grow w-full pr-2 text-black placeholder-gray-600 px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:ring-2 ring-offset-2 ring-gray-400"
                />
                <div className="flex items-center pt-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-black bg-gray-300 border-none rounded-md focus:ring-transparent"
                  />
                  <label className="block ml-2 text-sm text-gray-900">
                    Save as default address
                  </label>
                </div>
              </div>
              <hr className="mt-4" />
              <div className="flex flex-row-reverse p-3">
                <button
                  type="button"
                  className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize bg-black rounded-md hover:bg-gray-800 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
                >
                  <span className="mx-1">Save</span>
                </button>
                <button
                  type="button"
                  className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md hover:bg-red-200 hover:text-red-600 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out ml-3"
                >
                  <span className="mx-1">Delete</span>
                </button>
              </div>
            </div>
            <div className="mt-5 bg-white shadow cursor-pointer rounded-xl">
              <div className="flex">
                <div className="flex-1 py-5 pl-5 overflow-hidden">
                  <ul>
                    <li className="text-xs text-gray-600 uppercase ">
                      Address 1
                    </li>
                    <li>Name</li>
                    <li>Address</li>
                    <li>Pincode</li>
                  </ul>
                </div>
                <div class="flex-none pt-2.5 pr-2.5 pl-1">
                  <button
                    type="button"
                    className="px-2 py-2 font-medium tracking-wide text-black capitalize transition duration-300 ease-in-out transform rounded-xl hover:bg-gray-300 focus:outline-none active:scale-95"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none"></path>
                      <path
                        d="M5 18.08V19h.92l9.06-9.06-.92-.92z"
                        opacity=".3"
                      ></path>
                      <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <button
              type="button"
              className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize bg-black rounded-md hover:bg-gray-900 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#FFFFFF"
              >
                <g>
                  <rect fill="none" height="24" width="24"></rect>
                </g>
                <g>
                  <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
                </g>
              </svg>
              <span className="pl-2 mx-1">Add new Address</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
