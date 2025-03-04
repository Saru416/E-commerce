import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserImage from "../../assets/working.png";
import { getOrderHistory } from "../../redux/slice/orderSlice";

const User = () => {
  const user = useSelector((state) => state.auth.user);
  const [option, setOption] = useState(0);
  const { order, status, error } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const fullImageUrl = "http://localhost:3000";

  useEffect(() => {
    if (user?.id) {
      const userId = user.id; // Replace with the actual user ID
      console.log(order);
      dispatch(getOrderHistory(userId));
    }
  }, [dispatch, user]);

  const renderContent = () => {
    switch (option) {
      case 0:
        return <div>{user.user_metadata.display_name || "Guest"}</div>;
      case 1:
        const OrderItem = ({ order }) => {
          return (
            <div className="box p-8 rounded-3xl bg-gray-100 grid grid-cols-8 mb-7 cursor-pointer transition-all duration-500 hover:bg-indigo-50 max-lg:max-w-xl max-lg:mx-auto">
              <div className="col-span-8 sm:col-span-4 lg:col-span-1 sm:row-span-4 lg:row-span-1">
                <img
                  src={fullImageUrl + order[0].orderItems[0].productImage}
                  alt={order.name}
                  className="max-lg:w-auto max-sm:mx-auto rounded-xl object-cover"
                />
              </div>
              <div className="col-span-8 sm:col-span-4 lg:col-span-3 flex h-full justify-center pl-4 flex-col max-lg:items-center">
                <h5 className="font-manrope font-semibold text-2xl leading-9 text-black mb-1 whitespace-nowrap">
                  {order[0].orderItems[0].productName}
                </h5>
                {/* <p className="font-normal text-base leading-7 text-gray-600 max-md:text-center">
                  {order.color}
                </p> */}
              </div>
              <div className="col-span-8 sm:col-span-4 lg:col-span-1 flex items-center justify-center">
                <p className="font-semibold text-xl leading-8 text-black">
                  {order[0].orderItems[0].price}
                </p>
              </div>
              <div className="col-span-8 sm:col-span-4 lg:col-span-1 flex items-center justify-center ">
                <p className="font-semibold text-xl leading-8 text-indigo-600 text-center">
                  {order[0].orderItems[0].quantity}
                </p>
              </div>
              <div className="col-span-8 sm:col-span-4 lg:col-span-2 flex items-center justify-center ">
                <p className="font-semibold text-xl leading-8 text-black">
                  {order[0].date}
                </p>
              </div>
            </div>
          );
        };
        return (
          <section className="py-10 bg-gray-50">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
              <div className="main-data p-8 sm:p-14 bg-gray-50 rounded-3xl">
                <h2 className="text-center font-manrope font-semibold text-4xl text-black mb-16">
                  Order History
                </h2>
                <div className="grid grid-cols-8 pb-9">
                  <div className="col-span-8 lg:col-span-4">
                    <p className="font-medium text-lg leading-8 text-indigo-600">
                      Product{" "}
                    </p>
                  </div>
                  <div className="col-span-1 max-lg:hidden">
                    <p className="font-medium text-lg leading-8 text-gray-600 text-center">
                      Price{" "}
                    </p>
                  </div>
                  <div className="col-span-1 max-lg:hidden flex items-center justify-center">
                    <p className="font-medium text-lg leading-8 text-gray-600">
                      Qty{" "}
                    </p>
                  </div>
                  <div className="col-span-2 max-lg:hidden ml-6">
                    <p className="font-medium text-lg leading-8 text-gray-500">
                      Ordered on{" "}
                    </p>
                  </div>
                </div>
                {order.map((ord) => (
                  <OrderItem key={ord.id} order={ord} />
                ))}
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="flex flex-row bg-white">
      <div className="flex flex-col mt-10 ml-5 mr-5 mb-5 border-gray-600 h-[50rem] w-1/6 border-2 rounded-xl">
        <div className="flex mt-10 ml-10">
          {/* User Profile Picture */}
          <div className="w-14 h-14 rounded-full bg-gray-300 overflow-hidden mr-3">
            <img
              src={UserImage}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* User Display Name */}{" "}
          <span className="text-lg font-semibold mt-4">
            {user.user_metadata.display_name || "Guest"}
          </span>
        </div>
        <div className="mt-40 ml-16 text-xl">
          <button className="justify-start" onClick={() => setOption(1)}>
            Orders
          </button>
        </div>
        <div className="mt-10 ml-16 text-xl">
          <button className="justify-start" onClick={() => setOption(2)}>
            Address
          </button>
        </div>
      </div>
      <div className="flex mt-10 mr-5 mb-5 border-gray-600 h-[50rem] w-5/6 border-2 rounded-xl justify-center bg-gray-50">
        {renderContent()}
      </div>
    </div>
  );
};

export default User;
