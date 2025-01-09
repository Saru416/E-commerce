import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/navbar";
import { getCart } from "../../redux/slice/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.id) {
      const userId = user.id; // Replace with the actual user ID
      console.log(userId);
      dispatch(getCart(userId));
    }
  }, [dispatch, user]);

  if (status === "loading") return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <Navbar />
      <div className="bg-gray-500 h-[50rem] w-[100rem] ml-10 mt-28 rounded-xl">
        <h1 className="font-sans pl-32 pt-20 text-3xl">Shopping Cart</h1>
        <div className="flex mt-10">
          <div className="ml-10 w-2/3 bg-white mr-10 z-10 h-auto rounded-md p-2">
            {items.length === 0 || !items ? (
              <p>Your cart is empty!</p>
            ) : (
              <div className="bg-amber-900 m-5 p-5 rounded-xl">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 rounded-lg mb-4 p-4"
                  >
                    {/* Image Section */}
                    <div className="bg-black w-32 h-44 flex-shrink-0 flex items-center justify-center rounded-md mr-20">
                      <p className="text-white text-center">Image</p>
                    </div>

                    {/* Details Section */}
                    <div className="ml-4 flex-grow">
                      <p className="text-lg font-semibold">
                        {item.productName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: ${item.productPrice.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-800 font-bold">
                        Total: ${(item.quantity * item.productPrice).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-1/3 bg-white mr-10 rounded-md p-5 text-center h-40">
            <h2 className="p-2 pb-10 pt-5 font-bold text-xl">
              Total Amount: $2000
            </h2>
            <button className="bg-yellow-300 rounded-md p-2">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
