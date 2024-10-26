"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
router.post('/addProduct', productController_1.addProduct);
router.get('/getallProducts', productController_1.getAllProducts);
router.get('/product/:id', productController_1.getProductById);
router.put('/updateProduct/:id', productController_1.updateProduct);
router.delete('/deletProduct/:id', productController_1.deleteProduct);
exports.default = router;
/* Endpoints

## Products

- GET /api/products - List all products
- GET /api/products/{id} - Get a specific product
- POST /api/products - Create a new product
- PUT /api/products/{id} - Update a product
- DELETE /api/products/{id} - Delete a product

## Categories

- GET /api/categories - List all categories
- GET /api/categories/{id} - Get a specific category
- POST /api/categories - Create a new category
- PUT /api/categories/{id} - Update a category
- DELETE /api/categories/{id} - Delete a category

## Users

- POST /api/users/register - Register a new user
- POST /api/users/login - User login
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile

## Cart

- GET /api/cart - View cart
- POST /api/cart - Add item to cart
- PUT /api/cart/{id} - Update cart item
- DELETE /api/cart/{id} - Remove item from cart

## Orders

- POST /api/orders - Create a new order
- GET /api/orders - List user's orders
- GET /api/orders/{id} - Get a specific order

## Search

- GET /api/search - Search products


*/ 
