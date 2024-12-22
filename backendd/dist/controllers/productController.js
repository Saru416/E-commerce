"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.addProduct = void 0;
const schema_1 = require("../db/schema");
const db_1 = require("../db/db");
const multer_1 = __importDefault(require("multer"));
const drizzle_orm_1 = require("drizzle-orm");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
// Add new Product
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, category, availableQuantity, description } = req.body;
    const image_url = req.file;
    if (!name || !price || !category || !description || !availableQuantity || !image_url) {
        res.status(400).json({ message: "All fields Required!" });
        console.log(image_url);
    }
    try {
        if (image_url !== undefined)
            yield db_1.db.insert(schema_1.product).values({ name, description, price, category, availableQuantity, imageUrl: `/uploads/${image_url.filename}` });
        res.status(201).json({ message: "Product Added" });
    }
    catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.addProduct = addProduct;
// Get All Products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield db_1.db.select().from(schema_1.product);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error!" });
    }
});
exports.getAllProducts = getAllProducts;
// Get Product By ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const productId = typeof id === 'string' ? parseInt(id, 10) : id;
        const reqProduct = yield db_1.db.select().from(schema_1.product).where((0, drizzle_orm_1.eq)(schema_1.product.id, productId)).limit(1);
        if (reqProduct.length > 0) {
            res.status(201).json(reqProduct[0]);
        }
        else {
            res.status(201).json({ message: "Product not found!" });
        }
    }
    catch (error) {
        console.error("Error fetching product:", error);
        throw new Error("Could not fetch the product");
    }
});
exports.getProductById = getProductById;
// Update Product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, category, availableQuantity, description } = req.body;
    const { id } = req.params;
    try {
        const productId = typeof id === 'string' ? parseInt(id, 10) : id;
        const updatedProduct = yield db_1.db
            .update(schema_1.product).set({ name, description, price, availableQuantity, category })
            .where((0, drizzle_orm_1.eq)(schema_1.product.id, productId))
            .returning();
        if (updatedProduct.length === 0) {
            res.status(404).json({ message: 'Product not Found' });
        }
        res.status(200).json({ message: "Product updated!" });
    }
    catch (error) {
        console.error("Error fetching product:", error);
    }
});
exports.updateProduct = updateProduct;
//DELECT a Product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const productId = parseInt(id, 10);
        if (isNaN(productId)) {
            res.status(400).json({ message: "Invalid product ID" });
        }
        yield db_1.db.delete(schema_1.product).where((0, drizzle_orm_1.eq)(schema_1.product.id, productId));
        res.status(200).json({ message: "Product Deleted" });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Server Error!" });
    }
});
exports.deleteProduct = deleteProduct;
exports.uploadMiddleware = upload.single("image");
