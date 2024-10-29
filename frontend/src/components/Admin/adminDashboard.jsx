import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct, getAllProducts, deleteProduct } from "../../redux/slice/productSlice";
import { addCategory, getallCategory, deleteCategory } from "../../redux/slice/categorySlice";

function AdminDashboard() {
  const [option, setOption] = useState(0); // Default to 0 (dashboard view)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    availableQuantity: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState({
    name: "",
    sub_category: "",
  });

  const handleAddProduct = (e) => {
    const productData = {
      name: e.target.elements[0].value, // name input field
      price: e.target.elements[1].value, // price input field
      category: e.target.elements[2].value, // category input field
      availableQuantity: e.target.elements[3].value, // quantity input field
      description: e.target.elements[4].value,
    };
    dispatch(addProduct(productData));
  };

  const handleAddCategory = (e) => {
    const CategoryData = {
      name: e.target.elements[0].value,
      sub_category: e.target.elements[1].value,
    };
    dispatch(addCategory(CategoryData));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId)).then(() => {
      setProducts(products.filter((product) => product.id !== productId));
    });
  };

  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteCategory(categoryId)).then(() => {
      setCategories(categories.filter((category) => category.id !== categoryId));
    });
  };

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(getAllProducts()).then((response) =>
      setProducts(response.payload)
    );
    dispatch(getallCategory()).then((response) =>
      setCategories(response.payload)
    );
  }, [dispatch]);

  const handlelogout = () => {
    localStorage.removeItem("authToken"); // Clear token if stored
    navigate("/login");
  };
  // Render the content based on the selected option
  const renderContent = () => {
    switch (option) {
      case 0:
        return (
          <>
            <h1 className="text-center text-3xl font-serif">ADMIN DASHBOARD</h1>
            <div className="flex flex-row flex-wrap">
              <div className="bg-red-400 w-[26rem] h-[20rem] rounded-3xl flex flex-col mt-10 ml-20 shadow-md transform transition duration-300 hover:scale-105">
                <h3 className="mt-7 text-xl text-center">
                  Total Number of Users
                </h3>
                <h1 className="text-9xl mt-12 text-center">0</h1>
              </div>
              <div className="bg-yellow-200 w-[26rem] h-[20rem] rounded-3xl flex flex-col mt-10 ml-20 shadow-md transform transition duration-300 hover:scale-105">
                <h3 className="mt-7 text-xl text-center">
                  Total Products
                </h3>
                <h1 className="text-9xl mt-12 text-center">3</h1>
              </div>
              <div className="bg-blue-200 w-[26rem] h-[20rem] rounded-3xl flex flex-col mt-10 ml-20 shadow-md transform transition duration-300 hover:scale-105">
                <h3 className="mt-7 text-xl text-center">
                  Total Category
                </h3>
                <h1 className="text-9xl mt-12 text-center">2</h1>
              </div>
              <div className="bg-green-200 w-[26rem] h-[20rem] rounded-3xl flex flex-col mt-10 ml-20 shadow-md transform transition duration-300 hover:scale-105">
                <h3 className="mt-7 text-xl text-center">
                  Orders
                </h3>
                <h1 className="text-9xl mt-12 text-center">1</h1>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <div>
            <h1 className="text-center text-3xl font-serif mb-10">USERS</h1>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium text-gray-700">
                    ID
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium text-gray-700">
                    Name
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium text-gray-700">
                    Age
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium text-gray-700">
                    email
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-6 py-4">1</td>
                  <td className="border border-gray-300 px-6 py-4">Anom</td>
                  <td className="border border-gray-300 px-6 py-4">19</td>
                  <td className="border border-gray-300 px-6 py-4">
                    xyz@example.com
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-6 py-4">2</td>
                  <td className="border border-gray-300 px-6 py-4">Megha</td>
                  <td className="border border-gray-300 px-6 py-4">19</td>
                  <td className="border border-gray-300 px-6 py-4">
                    abc@hello.com
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-6 py-4">3</td>
                  <td className="border border-gray-300 px-6 py-4">Subham</td>
                  <td className="border border-gray-300 px-6 py-4">25</td>
                  <td className="border border-gray-300 px-6 py-4">
                    mike@john.com
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 2:
        return (
          <div>
            <h1 className="text-center text-3xl font-serif">PRODUCTS</h1>
            <h4 className="text-xl mt-10">Add New Product</h4>
            <form
              className="mt-7 flex flex-row ml-10"
              onSubmit={handleAddProduct}
            >
              <label className="mb-2">Name</label>
              <input
                className="w-1/5 p-3 mb-4 ml-5 rounded-xl mr-3"
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
              />
              <label className="mb-2 ">Price</label>
              <input
                className="w-1/5 p-3 mb-4 ml-5 rounded-xl mr-3"
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
              <label className="mb-2">Category</label>
              <input
                className="w-1/5 p-3 mb-4 ml-5 rounded-xl mr-3"
                type="number"
                name="category"
                value={product.category}
                onChange={handleInputChange}
              />
              <label className="mb-2">Quantity</label>
              <input
                className="w-1/5 p-3 mb-4 ml-5 rounded-xl mr-3"
                type="number"
                name="availableQuantity"
                value={product.availableQuantity}
                onChange={handleInputChange}
              />
              <label className="mb-2">Description</label>
              <input
                className="w-1/5 p-3 mb-4 ml-5 rounded-xl mr-3"
                type="text"
                name="description"
                value={product.description}
                onChange={handleInputChange}
              />
              <button
                className="bg-blue-400 w-1/12 rounded-2xl p-2 ml-12 mb-3"
                type="submit"
              >
                Add
              </button>
            </form>
            <table className="min-w-full table-auto border-collapse border border-gray-300 mt-7">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium text-gray-700">
                    Name
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium text-gray-700">
                    Price
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium text-gray-700">
                    Category
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium text-gray-700">
                    Quantity
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium text-gray-700">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((pro) => (
                  <tr key={pro.id}>
                    <td className="border border-gray-300 px-6 py-4">
                      {pro.name}
                    </td>
                    <td className="border border-gray-300 px-6 py-4">
                      {pro.price}
                    </td>
                    <td className="border border-gray-300 px-6 py-4">
                      {pro.category}
                    </td>
                    <td className="border border-gray-300 px-6 py-4">
                      {pro.availableQuantity}
                    </td>
                    <td className="border border-gray-300 px-6 py-4">
                      <button className="mr-3">Edit</button>
                      <button onClick={() => handleDeleteProduct(pro.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 3:
        return (
          <div>
            <h1 className="text-center text-3xl font-serif">ORDERS</h1>
            {/* Add more content related to Orders */}
          </div>
        );
      case 4:
        return (
          <div>
            <h1 className="text-center text-3xl font-serif mb-10">CATEGORY</h1>
            <h4 className="text-xl mt-10">Add New Category</h4>
            <form
              className="mt-7 flex flex-row ml-10 items-center mb-10"
              onSubmit={handleAddCategory}
            >
              <label className="mb-2">Name</label>
              <input
                className="w-1/5 p-3 mb-4 ml-5 rounded-lg"
                type="text"
                name="name"
                value={category.name}
                onChange={handleCategoryInputChange}
              />
              <label className="mb-2 ml-10">Subcategory</label>
              <input
                className="w-1/5 p-3 mb-4 ml-5 rounded-lg"
                type="text"
                name="sub_category"
                value={category.sub_category}
                onChange={handleCategoryInputChange}
              />
              <button className="bg-blue-500 rounded-2xl pb-2 pt-2 ml-10 px-8">
                Add
              </button>
            </form>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium text-gray-700">
                    ID
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium text-gray-700">
                    Name
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium text-gray-700">
                    subCategory
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cate) => (
                  <tr key={cate.id}>
                    <td className="border border-gray-300 px-6 py-4">
                      {cate.id}
                    </td>
                    <td className="border border-gray-300 px-6 py-4">
                      {cate.name}
                    </td>
                    <td className="border border-gray-300 px-6 py-4">
                      {cate.sub_category}
                    </td>
                    <td className="border border-gray-300 px-6 py-4">
                      <button className="mr-3">Edit</button>
                      <button onClick={() => handleDeleteCategory(cate.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return (
          <div className="flex flex-row flex-wrap">
            <div className="bg-red-400 w-[26rem] h-[20rem] rounded-3xl flex flex-col mt-10 ml-20">
              <h3 className="mt-7 text-xl text-center">
                Total Number of Users
              </h3>
              <h1 className="text-9xl mt-12 text-center">0</h1>
            </div>
            <div className="bg-yellow-200 w-[26rem] h-[20rem] rounded-3xl flex mt-10 ml-20"></div>
            <div className="bg-blue-200 w-[26rem] h-[20rem] rounded-3xl flex mt-10 ml-20"></div>
            <div className="bg-green-200 w-[26rem] h-[20rem] rounded-3xl flex mt-10 ml-20"></div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="bg-white w-[100rem] h-[52rem] rounded-3xl flex">
        {/* Left section */}
        <div className="w-1/6 bg-white rounded-l-3xl flex flex-col m-4">
          <h2 className="text-2xl text-center pt-5">NAVIGATE</h2>
          <div className="pt-44 flex flex-col space-y-4 items-start pl-5">
            <button
              className={`pr-10 pl-10 pb-3 pt-3 ${
                option === 0 ? "bg-slate-500" : "hover:bg-slate-300"
              }`}
              onClick={() => setOption(0)}
            >
              Dashboard
            </button>
            <button
              className={`pr-10 pl-10 pb-3 pt-3 ${
                option === 1 ? "bg-slate-500" : "hover:bg-slate-300"
              }`}
              onClick={() => setOption(1)}
            >
              Users
            </button>
            <button
              className={`pr-10 pl-10 pb-3 pt-3 ${
                option === 2 ? "bg-slate-500" : "hover:bg-slate-300"
              }`}
              onClick={() => setOption(2)}
            >
              Products
            </button>
            <button
              className={`pr-10 pl-10 pb-3 pt-3 ${
                option === 3 ? "bg-slate-500" : "hover:bg-slate-300"
              }`}
              onClick={() => setOption(3)}
            >
              Orders
            </button>
            <button
              className={`pr-10 pl-10 pb-3 pt-3 ${
                option === 4 ? "bg-slate-500" : "hover:bg-slate-300"
              }`}
              onClick={() => setOption(4)}
            >
              Category
            </button>
          </div>
          <button className="mt-56 items-start" onClick={handlelogout}>
            Sign Out
          </button>
        </div>

        {/* Right section */}
        <div className="w-5/6 p-8 bg-gray-600 rounded-r-3xl">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
