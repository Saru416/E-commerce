import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/navbar";
import { getAllProducts } from "../../redux/slice/productSlice";
import { addtoCart } from "../../redux/slice/cartSlice";

const Collections = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleAddToCart = (productId) => {
    if (user) {
      const quantity = 1;
      dispatch(addtoCart({ userId: user.id, productId, quantity }));
    } else {
      console.log(user, "User Id not found!");
    }
  };

  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className="h-screen flex">
        <Navbar />
        <div className="flex mt-20">
          {/* Left section */}
          <div className="w-[16rem] h-[72rem] bg-white-300 flex flex-col p-4 pl-4">
            <h2 className="text-center font-sans text-2xl">Filter</h2>
            <h5 className="mt-10">On basis of Type</h5>
            <div className="flex flex-row mt-5">
              <input
                type="checkbox"
                className="appearance-auto checked:bg-blue-500"
              />
              <label className="pl-2">T-shirt</label>
            </div>
            <div className="flex flex-row mt-3">
              <input
                type="checkbox"
                className="appearance-auto checked:bg-blue-500"
              />
              <label className="pl-2">Shirt</label>
            </div>
            <div className="flex flex-row mt-3">
              <input
                type="checkbox"
                className="appearance-auto checked:bg-blue-500"
              />
              <label className="pl-2">Pant</label>
            </div>
            <div className="flex flex-row mt-3">
              <input
                type="checkbox"
                className="appearance-auto checked:bg-blue-500"
              />
              <label className="pl-2">Jeans</label>
            </div>

            <h5 className="mt-10">On basis of Gender</h5>
            <div className="flex flex-row mt-5">
              <input
                type="checkbox"
                className="appearance-auto checked:bg-blue-500"
              />
              <label className="pl-2">Male</label>
            </div>
            <div className="flex flex-row mt-3">
              <input
                type="checkbox"
                className="appearance-auto checked:bg-blue-500"
              />
              <label className="pl-2">Female</label>
            </div>
            <h5 className="mt-10">Price</h5>
            <div className="flex flex-row mt-5">
              <input
                type="checkbox"
                className="appearance-auto checked:bg-blue-500"
              />
              <label className="pl-2">₹ 500-1000</label>
            </div>
            <div className="flex flex-row mt-3">
              <input
                type="checkbox"
                className="appearance-auto checked:bg-blue-500"
              />
              <label className="pl-2">₹ 1000-2000</label>
            </div>
            <div className="flex flex-row mt-3">
              <input
                type="checkbox"
                className="appearance-auto checked:bg-blue-500"
              />
              <label className="pl-2">₹ 2000-3000</label>
            </div>
            <div className="flex flex-row mt-3">
              <input
                type="checkbox"
                className="appearance-auto checked:bg-blue-500"
              />
              <label className="pl-2">Above ₹ 3000</label>
            </div>
          </div>
          <div className="w-[90rem] h-[72rem] bg-orange-300 flex flex-row p-4 flex-wrap pt-20 gap-y-0">
            {products.map((product) => (
              <div
                key={product.id}
                className="w-56 h-80 rounded-2xl bg-white mr-10 ml-10 shadow-md transform transition duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="w-40 h-52 bg-lime-200 rounded-xl mx-auto flex items-center justify-center mt-2 mb-2 ">
                  {/* Add an image tag here if `product.image` is available */}
                </div>
                <h2 className="pl-7">{product.name}</h2>
                <p className="pl-7">₹ {product.price}</p>
                <button
                  className="ml-20 p-2 bg-blue-300 rounded-xl transform transition duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handleAddToCart(product.id)}
                >
                  ADD to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collections;
