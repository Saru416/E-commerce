import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/navbar";
import { getAllProducts } from "../../redux/slice/productSlice";
import { addtoCart, updateCartItem, getCart } from "../../redux/slice/cartSlice";

const Collections = () => {
  const fullImageUrl = "http://localhost:3000";

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux

  const [priceFilter, setPriceFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [localQuantities, setLocalQuantities] = useState({});

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
    window.scrollTo(0, 0);
    dispatch(getAllProducts());
    dispatch(getCart(user.id));
  }, [dispatch]);

  useEffect(() => {
    // Initialize local quantities with cart items on load
    if (cartItems) {
      const initialQuantities = {};
      cartItems.forEach((item) => {
        initialQuantities[item.productId] = item.quantity;
      });
      setLocalQuantities(initialQuantities);
    }
  }, [cartItems]);

  const handleQuantityChangeLocal = (productId, newQuantity) => {
    setLocalQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));

    const cartItem = cartItems.find((item) => item.productId === productId);
    if (cartItem && cartItem.quantity !== newQuantity) {
      dispatch(updateCartItem({ userId: user.id, productId, quantity: newQuantity }));
    }
  };

  const handlepriceFilter = (priceRange) => {
    setPriceFilter((prevFilters) => {
      if (priceFilter.includes(priceRange)) {
        return prevFilters.filter((filter) => filter !== priceRange);
      }
      return [...prevFilters, priceRange];
    });
  };

  const handlecategoryFilter = (category) => {
    setCategoryFilter((prevFilters) => {
      if (categoryFilter.includes(category)) {
        return prevFilters.filter((filter) => filter !== category);
      }
      return [...prevFilters, category];
    });
  };

  const applyFilters = () => {
    if (priceFilter.length === 0 && categoryFilter.length === 0)
      return products;

    return products.filter((product) => {
      const priceMatches =
        priceFilter.length === 0 ||
        priceFilter.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return product.price >= min && product.price <= max;
        });

      const categoryMatches =
        categoryFilter.length === 0 ||
        categoryFilter.includes(String(product.category));
      return priceMatches && categoryMatches;
    });
  };

  // const handleQuantityChange = (productId, newQuantity) => {
  //   if (user) {
  //     console.log(user.id, productId, newQuantity);
  //     dispatch(updateCartItem({ userId: user.id, productId, quantity: newQuantity }));
  //   } else {
  //     console.log("User Id not found!");
  //   }
  // };

  const isProductInCart = (productId) => {
    if (!cartItems || cartItems.length === 0) return null; 

    const productItems = cartItems.filter((item) => item.productId !== undefined);
    const cartItem = productItems.find((item) => item.productId === productId);
  
    return cartItem || null;
  };

  const isAddDisabled = (productId, cartItem) => {
    const product = products.find((p) => p.id === productId);
    return cartItem.quantity >= product.quantity; // Disable if at max quantity
  };
  

  const filteredProducts = applyFilters();

  return (
    <>
      <div className="h-screen flex">
        <Navbar />
        <div className="flex mt-20">
          {/* Left section */}
          <div className="w-[16rem] h-[72rem] bg-white-300 flex flex-col p-4 pl-4 bg-slate-100 rounded-md">
            <div className="ml-3">
              <h2 className="text-center font-sans text-2xl font-semibold">
                Filter
              </h2>
              <h5 className="mt-10 text-xl ml-7 font-medium">Type</h5>
              <div className="ml-2">
                <div className="flex flex-row mt-7">
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
                    value="5"
                    checked={categoryFilter.includes("5")}
                    onChange={(e) => handlecategoryFilter(e.target.value)}
                    className="appearance-auto checked:bg-blue-500"
                  />
                  <label className="pl-2">Jeans</label>
                </div>
              </div>
              <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-400"></hr>
              <h5 className="text-xl ml-7 font-medium">Price</h5>
              <div className="flex flex-row mt-5">
                <input
                  type="checkbox"
                  value="500-1000"
                  checked={priceFilter.includes("500-1000")}
                  onChange={(e) => handlepriceFilter(e.target.value)}
                  className="appearance-auto checked:bg-blue-500 ml-2"
                />
                <label className="pl-2">₹ 500-1000</label>
              </div>
              <div className="flex flex-row mt-3">
                <input
                  type="checkbox"
                  value="1000-2000"
                  checked={priceFilter.includes("1000-2000")}
                  onChange={(e) => handlepriceFilter(e.target.value)}
                  className="appearance-auto checked:bg-blue-500 ml-2"
                />
                <label className="pl-2" on>
                  ₹ 1000-2000
                </label>
              </div>
              <div className="flex flex-row mt-3">
                <input
                  type="checkbox"
                  value="2000-3000"
                  checked={priceFilter.includes("2000-3000")}
                  onChange={(e) => handlepriceFilter(e.target.value)}
                  className="appearance-auto checked:bg-blue-500 ml-2"
                />
                <label className="pl-2">₹ 2000-3000</label>
              </div>
              <div className="flex flex-row mt-3">
                <input
                  type="checkbox"
                  value="3000-10000"
                  checked={priceFilter.includes("3000-10000")}
                  onChange={(e) => handlepriceFilter(e.target.value)}
                  className="appearance-auto checked:bg-blue-500 ml-2"
                />
                <label className="pl-2">Above ₹ 3000</label>
              </div>
            </div>
          </div>
          <div className="w-[90rem] h-[72rem] bg-cyan-700 flex flex-row p-4 flex-wrap pt-20 gap-y-0">
            {filteredProducts.map((product) => {
              const cartItem = isProductInCart(product.id);
              const localQuantity = localQuantities[product.id] || 0;
              return (
              <div
                class="grid h-[25rem] w-[18rem] bg-cyan-700 lg:grid-cols-1 justify-center m-5"
                key={product.id}
              >
                <div class="group border-gray-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border bg-white shadow-md">
                  <a
                    class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                    href="#"
                  >
                    <img
                      class="peer absolute top-0 right-0 h-full w-full object-cover"
                      src={fullImageUrl + product.imageUrl}
                      alt="product image"
                    />
                    {/* <img
                      class="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"
                      src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                      alt="product image"
                    /> */}
                    {/* <svg
                      class="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 32 32"
                    > */}
                    {/* <path
                        fill="currentColor"
                        d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
                      />
                    </svg> */}
                    <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                      10% OFF
                    </span>
                  </a>
                  <div class="mt-4 px-5 pb-5">
                    <a href="#">
                      <h5 class="text-xl tracking-tight ml-20">
                        {product.name}
                      </h5>
                    </a>
                    <div class="mt-2 mb-5 flex items-center justify-between">
                      <p>
                        {/* <span class="text-3xl font-bold ml-20">
                          ₹{Math.round(product.price * (0.9).toFixed(2))}
                        </span> */}
                        <span class="text-3xl font-bold ml-20">
                          ₹{product.price}
                        </span>
                      </p>
                    </div>
                    {cartItem !== undefined && cartItem ? (
                      <div className="sm:order-1">
                        <div className="mx-auto flex h-8 items-stretch text-gray-600">
                          <button className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                          onClick={() => handleQuantityChangeLocal(product.id,Math.max(localQuantity-1, 0))}>
                            -
                          </button>
                          <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                            {localQuantity}
                          </div>
                          <button className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                            onClick={() => handleQuantityChangeLocal(product.id,localQuantity+1)}
                            disabled={isAddDisabled(product.id, cartItem)}>
                            +
                          </button>
                        </div>
                      </div>
                    ) : (
                      <a
                        href="#"
                        class="hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="mr-2 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        Add to cart
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collections;
