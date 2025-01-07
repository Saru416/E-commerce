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
          <div className="ml-10 w-2/3 bg-white mr-10 z-10 h-56 rounded-md p-2">
            {items.length === 0 || !items ? (
              <p>Your cart is empty!</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items && items.length > 0 ? (
                    items.map((item, index) => (
                      <tr key={index}>
                        <td className="p-4 text-center">{item.productName}</td>
                        <td className="p-4 text-center">{item.quantity}</td>
                        <td className="p-4 text-center">${item.productPrice.toFixed(2)}</td>
                        <td className="p-4 text-center">
                          ${(item.quantity * item.productPrice).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">Your cart is empty!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          <div className="w-1/3 bg-white mr-10 rounded-md"></div>
        </div>
      </div>
    </>
  );
};

export default Cart;
