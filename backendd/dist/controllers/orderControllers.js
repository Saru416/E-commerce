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
exports.getOrderHistory = exports.OrderById = exports.getOrders = exports.createOrder = void 0;
const schema_1 = require("../db/schema");
const db_1 = require("../db/db");
const drizzle_orm_1 = require("drizzle-orm");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId) {
        res.status(400).json({ error: "User Id is required!" });
        return;
    }
    try {
        // Step 1: Get cart items for the user
        const cartItems = yield db_1.db
            .select({
            productId: schema_1.product.id,
            productName: schema_1.product.name,
            quantity: schema_1.cart.quantity,
            productPrice: schema_1.product.price,
        })
            .from(schema_1.cart)
            .innerJoin(schema_1.product, (0, drizzle_orm_1.eq)(schema_1.cart.productId, schema_1.product.id))
            .where((0, drizzle_orm_1.eq)(schema_1.cart.userId, userId));
        if (!cartItems || cartItems.length === 0) {
            res.status(404).json({ error: "Cart is empty" });
            return;
        }
        // Ensure that all prices are valid numbers (fallback to 0 if null)
        const validCartItems = cartItems.map((item) => {
            var _a;
            return (Object.assign(Object.assign({}, item), { productPrice: (_a = item.productPrice) !== null && _a !== void 0 ? _a : 0 }));
        });
        // Calculate total price
        const totalAmount = validCartItems.reduce((sum, item) => sum + item.quantity * item.productPrice, 0);
        const curr_date = new Date().toISOString();
        // Step 2: Insert into `order` and get the order ID
        const [newOrder] = yield db_1.db
            .insert(schema_1.order)
            .values({
            order_date: curr_date,
            user_id: userId,
            total_amount: totalAmount,
        })
            .returning({ orderID: schema_1.order.id });
        if (!newOrder) {
            res.status(500).json({ error: "Failed to create order" });
            return;
        }
        // Step 3: Insert all cart items into `Orderitem`
        yield db_1.db.insert(schema_1.Orderitem).values(validCartItems.map((item) => ({
            order_id: newOrder.orderID,
            product_id: item.productId,
            quantity: item.quantity,
            price: item.productPrice, // Now guaranteed to be a number
        })));
        // Step 4: Clear cart after placing order
        yield db_1.db.delete(schema_1.cart).where((0, drizzle_orm_1.eq)(schema_1.cart.userId, userId));
        // Step 5: Update the product table
        yield Promise.all(validCartItems.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield db_1.db
                .update(schema_1.product)
                .set({
                availableQuantity: (0, drizzle_orm_1.sql) `${schema_1.product.availableQuantity} - ${item.quantity}`,
            })
                .where((0, drizzle_orm_1.eq)(schema_1.product.id, item.productId));
        })));
        res.status(201).json({ message: "Order placed successfully" });
    }
    catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Server Error!" });
    }
});
exports.createOrder = createOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const orders = yield db_1.db
            .select()
            .from(schema_1.order)
            .where((0, drizzle_orm_1.eq)(schema_1.order.user_id, userId));
        if (!orders || orders.length === 0) {
            res.status(404).json({ message: "No Order Found" });
            return;
        }
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error!" });
    }
});
exports.getOrders = getOrders;
const OrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const { userId } = req.body;
    try {
        const parsedOrderId = parseInt(orderId, 10);
        const OrderItem = yield db_1.db
            .select()
            .from(schema_1.order)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.order.user_id, userId), (0, drizzle_orm_1.eq)(schema_1.order.id, parsedOrderId)));
        if (!OrderItem || OrderItem.length === 0) {
            res.status(404).json({ message: "Order not found with specific Id!" });
            return;
        }
        res.status(200).json(OrderItem);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error!" });
    }
});
exports.OrderById = OrderById;
const getOrderHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const orders = yield db_1.db
            .select({
            orderID: schema_1.order.id,
            totalPrice: schema_1.order.total_amount,
            date: schema_1.order.order_date,
        })
            .from(schema_1.order)
            .where((0, drizzle_orm_1.eq)(schema_1.order.user_id, userId))
            .orderBy(schema_1.order.order_date);
        if (orders.length === 0) {
            res.status(200).json([]);
            return;
        }
        const orderIDs = orders.map((o) => o.orderID);
        const orderItems = yield db_1.db
            .select({
            orderID: schema_1.Orderitem.order_id,
            productID: schema_1.Orderitem.product_id,
            quantity: schema_1.Orderitem.quantity,
            price: schema_1.Orderitem.price,
            productName: schema_1.product.name,
            productImage: schema_1.product.imageUrl,
        })
            .from(schema_1.Orderitem)
            .leftJoin(schema_1.product, (0, drizzle_orm_1.eq)(schema_1.Orderitem.product_id, schema_1.product.id))
            .where((0, drizzle_orm_1.inArray)(schema_1.Orderitem.order_id, orderIDs));
        const orderItemsMap = {};
        orders.forEach((o) => (orderItemsMap[o.orderID] = []));
        orderItems.forEach((item) => {
            orderItemsMap[item.orderID].push({
                productID: item.productID,
                quantity: item.quantity,
                price: item.price,
                productName: item.productName,
                productImage: item.productImage,
            });
        });
        const formattedOrders = orders.map((order) => (Object.assign(Object.assign({}, order), { orderItems: orderItemsMap[order.orderID] || [] })));
        res.status(200).json(formattedOrders);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error!" });
    }
});
exports.getOrderHistory = getOrderHistory;
