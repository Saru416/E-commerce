import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../redux/slice/cartSlice";
import { getAddress, addAddress } from "../../redux/slice/addressSlice";

const Order = () => {
  const [step, setStep] = useState(true);
  const [addaddress, setAddaddress] = useState(false);
  //const [address, setAddress] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const address = useSelector((state) => state.address.addresses);

  useEffect(() => {
    if (user?.id) {
      const userId = user.id; // Replace with the actual user ID
      console.log(address)
      dispatch(getCart(userId));
      dispatch(getAddress(userId));
    }
  }, [dispatch, user]);

  const { items, status, error } = useSelector((state) => state.cart);

  const subtotal =
    items !== undefined
      ? items.reduce((acc, item) => acc + item.quantity * item.productPrice, 0)
      : 0;
  const shipping = items !== undefined ? 100.0 : 0.0;
  const total = subtotal + shipping;

  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  const handleStepchange = () => {
    setStep(false);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address || !formData.pincode) {
      alert("Please fill in all required fields.");
      return;
    }
    addAddress([...address, formData]);
    setFormData({
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto w-full max-w-lg">
        <div className="flex">
          <button
            type="button"
            className={`relative flex-1 justify-center items-center px-5 py-2.5 font-medium ${
              step ? "bg-gray-400" : "bg-gray-200"
            } tracking-wide capitalize rounded-md focus:outline-none transition duration-300 transform active:scale-95 ease-in-out mb-2`}
          >
            Step 1
          </button>
          <button
            type="button"
            className={`relative flex-1 justify-center items-center px-5 py-2.5 font-medium ${
              !step ? "bg-gray-400" : "bg-gray-200"
            } tracking-wide capitalize rounded-md focus:outline-none transition duration-300 transform active:scale-95 ease-in-out mb-2`}
          >
            Step 2
          </button>
        </div>

        {step ? (
          <div>
            <button
              type="button"
              className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize bg-black rounded-md hover:bg-gray-900 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
              onClick={() => setAddaddress(true)}
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
              <span className="pl-2 mx-1">Add New Address</span>
            </button>

            {addaddress && (
              <form
                onSubmit={handleSubmit}
                className="mt-5 bg-white rounded-lg shadow p-5"
              >
                <h1 className="text-2xl font-semibold mb-3">Enter Address</h1>

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full px-4 py-2 mt-2 bg-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 ring-gray-400"
                />
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="w-full px-4 py-2 mt-2 bg-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 ring-gray-400"
                />
                <div className="flex space-x-2">
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="flex-1 px-4 py-2 mt-2 bg-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 ring-gray-400"
                  />
                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="flex-1 px-4 py-2 mt-2 bg-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 ring-gray-400"
                  />
                </div>
                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Pincode"
                  className="w-full px-4 py-2 mt-2 bg-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 ring-gray-400"
                />

                <div className="flex items-center pt-3">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-black bg-gray-300 border-none rounded-md focus:ring-transparent"
                  />
                  <label className="ml-2 text-sm text-gray-900">
                    Save as default address
                  </label>
                </div>

                <div className="flex flex-row-reverse p-3">
                  <button
                    type="submit"
                    className="px-5 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition duration-300 transform active:scale-95"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2 text-black rounded-md hover:bg-red-200 hover:text-red-600 transition duration-300 transform active:scale-95 ml-3"
                    onClick={() => setAddaddress(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <h2 className="mt-5 text-xl font-semibold">Saved Addresses</h2>
            {address.length > 0 ? (
              address.map((addr, index) => (
                <div
                  key={index}
                  className="flex justify-between mt-3 bg-white shadow rounded-xl p-5"
                >
                  <div>
                    <ul>
                      <li className="text-xs text-gray-600 uppercase">
                        Address {index + 1}
                      </li>
                      {/* <li>{addr.name}</li> */}
                      <li>{addr.address}</li>
                      <li>
                        {addr.city}, {addr.state}
                      </li>
                      <li>{addr.pincode}</li>
                      {addr.isDefault && (
                        <li className="text-green-600 font-bold">
                          Default Address
                        </li>
                      )}
                    </ul>
                  </div>
                  <button
                    className="h-10 px-5 py-2 text-white bg-green-500 rounded-md hover:bg-green-700 transition duration-300 transform active:scale-95"
                    onClick={handleStepchange}
                  >
                    Continue
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600 mt-3">No addresses added yet.</p>
            )}
          </div>
        ) : (
          <div>
            <button
              type="button"
              className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize bg-black rounded-md hover:bg-gray-900 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
            >
              <span className="pl-2 mx-1">Total Amount: ₹ {total}</span>
            </button>
            <div className="flex flex-col mt-5 bg-white rounded-lg shadow p-5">
              <h1 className="text-center text-xl font-semibold">
                Pay using UPI
              </h1>
              <div className="bg-gray-400 h-56 w-52 p-5 mt-5 self-center">
                QR - Image
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
