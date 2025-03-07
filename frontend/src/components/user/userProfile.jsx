import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserImage from "../../assets/working.png";
import { getOrderHistory } from "../../redux/slice/orderSlice";
import { getAddress } from "../../redux/slice/addressSlice";

const User = () => {
  const user = useSelector((state) => state.auth.user);
  const { order } = useSelector((state) => state.order);
  const address = useSelector((state) => state.address.addresses);
  const dispatch = useDispatch();
  const [activeOption, setActiveOption] = useState("profile");

  const fullImageUrl = "http://localhost:3000";

  useEffect(() => {
    if (user?.id) {
      dispatch(getOrderHistory(user.id));
      dispatch(getAddress(user?.id));
    }
  }, [dispatch, user]);

  const menuOptions = [
    { id: "profile", label: "Profile" },
    { id: "orders", label: "Orders" },
    { id: "address", label: "Address" },
  ];

  const OrderItem = ({ orderItem }) => (
    <>
      {orderItem.map((order) =>
        order.orderItems.map((item, index) => (
          <div
            key={`${order.id}-${index}`}
            className="box p-5 rounded-2xl bg-gray-100 grid grid-cols-8 mb-4 transition-all duration-500 hover:bg-indigo-50"
          >
            <div className="col-span-2 flex items-center">
              <img
                src={fullImageUrl + item.productImage}
                alt={item.productName}
                className="w-24 h-24 rounded-xl object-cover"
              />
            </div>
            <div className="col-span-3 flex flex-col justify-center">
              <h5 className="font-semibold text-lg">{item.productName}</h5>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <p className="text-black font-semibold">₹{item.price}</p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <p className="text-indigo-600 font-semibold">{item.quantity}</p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <p className="text-black font-semibold">{order.date}</p>
            </div>
          </div>
        ))
      )}
    </>
  );

  const renderContent = () => {
    switch (activeOption) {
      case "profile":
        return (
          <h2 className="text-center text-2xl font-semibold">
            {user?.user_metadata?.display_name || "Guest"}
          </h2>
        );

      case "orders":
        return (
          <section className="py-5 bg-gray-50 w-full">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-center font-semibold text-3xl mb-6">
                Order History
              </h2>
              <div className="grid grid-cols-8 pb-4 text-gray-600 font-medium">
                <p className="col-span-2">Product</p>
                <p className="col-span-3">Name</p>
                <p className="col-span-1 text-center">Price</p>
                <p className="col-span-1 text-center">Qty</p>
                <p className="col-span-1 text-center">Ordered On</p>
              </div>
              {order?.length > 0 ? (
                order.map((ord) => <OrderItem key={ord.id} orderItem={ord} />)
              ) : (
                <p className="text-center text-gray-500">No orders found.</p>
              )}
            </div>
          </section>
        );

      case "address":
        return (
          <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-center text-2xl font-semibold mb-5">
              Manage Address
            </h2>
            {address.length > 0 ? (
              address.map((addr, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mt-3 bg-white shadow rounded-xl p-5"
                >
                  <div>
                    <ul>
                      <li className="text-xs text-gray-600 uppercase">
                        Address {index + 1}
                      </li>
                      <li>{addr.name}</li>
                      <li>{addr.address}</li>
                      <li>
                        {addr.city}, {addr.state}
                      </li>
                      <li>
                        {addr.country}, {addr.pincode}
                      </li>
                      {addr.isDefault && (
                        <li className="text-green-600 font-bold">
                          Default Address
                        </li>
                      )}
                    </ul>
                  </div>
                  <button className="h-10 px-5 py-2 text-white bg-black rounded-md hover:bg-gray-700 transition duration-300 transform active:scale-95">
                    Edit
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600 mt-3 text-center">
                No addresses added yet.
              </p>
            )}
          </div>
        );

      default:
        return (
          <h2 className="text-center text-2xl font-semibold">
            Select an Option
          </h2>
        );
    }
  };

  return (
    <div className="flex flex-row bg-white">
      {/* Sidebar */}
      <div className="flex flex-col p-6 w-1/5 h-screen border-r border-gray-200">
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-14 h-14 rounded-full bg-gray-300 overflow-hidden">
            <img
              src={UserImage}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-lg font-semibold">
            {user?.user_metadata?.display_name || "Guest"}
          </span>
        </div>
        <div className="space-y-5">
          {menuOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveOption(option.id)}
              className={`w-full text-left text-xl p-3 rounded-lg transition-all ${
                activeOption === option.id
                  ? "bg-black text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 h-screen justify-center bg-gray-50 p-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default User;
