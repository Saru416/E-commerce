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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemCart = exports.updateCartItem = exports.addToCart = exports.getCart = void 0;
const schema_1 = require("../db/schema");
const db_1 = require("../db/db");
const schema_2 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const cartItems = yield db_1.db.select({
            productId: schema_2.product.id,
            productName: schema_2.product.name,
            quantity: schema_1.cart.quantity,
            productPrice: schema_2.product.price,
            productImage: schema_2.product.imageUrl
        })
            .from(schema_1.cart)
            .innerJoin(schema_2.product, (0, drizzle_orm_1.eq)(schema_1.cart.productId, schema_2.product.id))
            .where((0, drizzle_orm_1.eq)(schema_1.cart.userId, userId));
        if (cartItems.length === 0) {
            res.status(204).json("Not Found!");
            return;
        }
        res.status(200).json({
            message: 'Cart retrieved successfully',
            data: cartItems
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getCart = getCart;
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, quantity } = req.body;
    try {
        // Check if the product exists
        const req_product = yield db_1.db.select().from(schema_2.product).where((0, drizzle_orm_1.eq)(schema_2.product.id, productId));
        if (req_product.length === 0) {
            res.status(404).json({ message: "Product not found!" });
            return;
        }
        // Check if the product is already in the user's cart
        const existingCartItem = yield db_1.db
            .select()
            .from(schema_1.cart)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.cart.userId, userId), (0, drizzle_orm_1.eq)(schema_1.cart.productId, productId)))
            .limit(1);
        if (existingCartItem.length > 0) {
            // Update quantity if item exists in the cart
            yield db_1.db
                .update(schema_1.cart)
                .set({ quantity: existingCartItem[0].quantity + quantity })
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.cart.userId, userId), (0, drizzle_orm_1.eq)(schema_1.cart.productId, productId)));
            res.status(200).json({ message: 'Cart updated successfully' });
            return;
        }
        else {
            // Add new item to the cart
            yield db_1.db.insert(schema_1.cart).values({
                userId,
                productId,
                quantity
            });
            res.status(201).json({ message: 'Product added to cart successfully' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.addToCart = addToCart;
const updateCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, quantity } = req.body;
    try {
        if (!userId || !productId || quantity < 0) {
            res.status(400).json({ message: "Invalid data" });
            return;
        }
        const req_product = yield db_1.db.select().from(schema_1.cart).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.cart.userId, userId), (0, drizzle_orm_1.eq)(schema_1.cart.productId, productId))).limit(1);
        if (req_product.length === 0) {
            res.status(404).json({ message: "Product not found!" });
            return;
        }
        yield db_1.db.update(schema_1.cart).set({ quantity: quantity }).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.cart.userId, userId), (0, drizzle_orm_1.eq)(schema_1.cart.productId, productId)));
        res.status(201).json({ message: 'Product updated to cart successfully' });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.updateCartItem = updateCartItem;
const deleteItemCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params; // Assuming productId is passed as a route parameter
        if (!productId) {
            res.status(400).json({ message: "Product ID is required." });
        }
        const parsedProductId = parseInt(productId, 10);
        if (isNaN(parsedProductId)) {
            res.status(400).json({ message: "Invalid Product ID format." });
        }
        yield db_1.db.delete(schema_1.cart).where((0, drizzle_orm_1.eq)(schema_1.cart.productId, parsedProductId));
        res.status(200).json({ message: "Item deleted from cart!" });
    }
    catch (error) {
        console.error("Error deleting item from cart:", error);
        res.status(500).json({ message: "Server Error!" });
    }
});
exports.deleteItemCart = deleteItemCart;
