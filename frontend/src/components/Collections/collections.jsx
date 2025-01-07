import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/navbar";
import { getAllProducts } from "../../redux/slice/productSlice";
import { addtoCart } from "../../redux/slice/cartSlice";

const Collections = () => {

  const fullImageUrl = "http://localhost:3000";

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [priceFilter, setPriceFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([])
  
  const handleAddToCart = (productId) => {
    if (user) {
      console.log(user);
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

  const handlepriceFilter = (priceRange) => {
    setPriceFilter((prevFilters) => {
      if(priceFilter.includes(priceRange)){
        return prevFilters.filter((filter) => filter !== priceRange)
      }
      return [...prevFilters, priceRange];
    });
  };

  const handlecategoryFilter = (category) => {
    setCategoryFilter((prevFilters) => {
      if(categoryFilter.includes(category)){
        return prevFilters.filter((filter) => filter !== category)
      }
      return [...prevFilters, category];
    });
  };

  const applyFilters = () => {
    if (priceFilter.length === 0 && categoryFilter.length === 0) return products;

    return products.filter((product) => {
      const priceMatches = priceFilter.length === 0 || priceFilter.some((range) => {
        const [min,max] = range.split("-").map(Number);
        return product.price >= min && product.price <= max;
      });

      const categoryMatches = categoryFilter.length === 0 || categoryFilter.includes(String(product.category));
      return priceMatches && categoryMatches;
    });
  };

  const filteredProducts = applyFilters();

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
                value="2"
                checked={categoryFilter.includes("2")}
                onChange={(e) => handlecategoryFilter(e.target.value)}
                className="appearance-auto checked:bg-blue-500"
              />
              <label className="pl-2">T-shirt</label>
            </div>
            <div className="flex flex-row mt-3">
              <input
                type="checkbox"
                value="3"
                checked={categoryFilter.includes("3")}
                onChange={(e) => handlecategoryFilter(e.target.value)}
                className="appearance-auto checked:bg-blue-500"
              />
              <label className="pl-2">Shirt</label>
            </div>
            <div className="flex flex-row mt-3">
              <input
                type="checkbox"
                value="4"
                checked={categoryFilter.includes("4")}
                onChange={(e) => handlecategoryFilter(e.target.value)}
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
                value="500-1000"
                checked={priceFilter.includes("500-1000")}
                onChange={(e) => handlepriceFilter(e.target.value)}
                className="appearance-auto checked:bg-blue-500"
              />
              <label className="pl-2">₹ 500-1000</label>
            </div>
            <div className="flex flex-row mt-3">
              <input
                type="checkbox"
                value="1000-2000"
                checked={priceFilter.includes("1000-2000")}
                onChange={(e) => handlepriceFilter(e.target.value)}
                className="appearance-auto checked:bg-blue-500"
              />
              <label className="pl-2" on>₹ 1000-2000</label>
            </div>
            <div className="flex flex-row mt-3">
              <input
                type="checkbox"
                value="2000-3000"
                checked={priceFilter.includes("2000-3000")}
                onChange={(e) => handlepriceFilter(e.target.value)}
                className="appearance-auto checked:bg-blue-500"
              />
              <label className="pl-2">₹ 2000-3000</label>
            </div>
            <div className="flex flex-row mt-3">
              <input
                type="checkbox"
                value="3000-10000"
                checked={priceFilter.includes("3000-10000")}
                onChange={(e) => handlepriceFilter(e.target.value)}
                className="appearance-auto checked:bg-blue-500"
              />
              <label className="pl-2">Above ₹ 3000</label>
            </div>
          </div>
          <div className="w-[90rem] h-[72rem] bg-orange-300 flex flex-row p-4 flex-wrap pt-20 gap-y-0">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="w-56 h-80 rounded-2xl bg-white mr-10 ml-10 shadow-md transform transition duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="w-40 h-52 rounded-xl mx-auto flex items-center justify-center mt-2 mb-2">
                    <img
                      src= {fullImageUrl + product.imageUrl}
                      alt={product.name || "Product Image"}
                      className="w-full h-full object-cover rounded-xl"
                    />
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
