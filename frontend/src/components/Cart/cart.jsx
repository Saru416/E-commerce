import React from "react";
import Navbar from "../Navbar/navbar";

const Cart = () => {
    return(
        <>
            <Navbar/>
            <div className="bg-gray-500 h-[50rem] w-[100rem] ml-10 mt-28 rounded-xl">
                <h1 className="font-sans pl-32 pt-20 text-3xl">Shopping Cart</h1>
                <div className="flex mt-10">
                    <div className="ml-10 w-2/3 bg-white mr-10 z-10 h-56 rounded-md"></div>
                    <div className="w-1/3 bg-white mr-10 rounded-md"></div>
                </div>
            </div>
        </>
    )
}

export default Cart;