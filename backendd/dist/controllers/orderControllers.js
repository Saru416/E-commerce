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
exports.OrderById = exports.getOrders = exports.createOrder = void 0;
const schema_1 = require("../db/schema");
const db_1 = require("../db/db");
const drizzle_orm_1 = require("drizzle-orm");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId) {
        res.status(400).json({ error: "User Id is required!" });
    }
    try {
        const cartItem = yield db_1.db
            .select({
            productId: schema_1.product.id,
            productName: schema_1.product.name,
            quantity: schema_1.cart.quantity,
            productPrice: schema_1.product.price,
        })
            .from(schema_1.cart)
            .innerJoin(schema_1.product, (0, drizzle_orm_1.eq)(schema_1.cart.productId, schema_1.product.id))
            .where((0, drizzle_orm_1.eq)(schema_1.cart.userId, userId));
        if (!cartItem || cartItem.length === 0) {
            res.status(404).json({ error: "cart is empty" });
        }
        const totalAmount = cartItem.reduce((sum, item) => sum + item.quantity * item.productPrice, 0);
        const curr_date = new Date().toISOString();
        yield db_1.db.insert(schema_1.order).values({
            order_date: curr_date,
            user_id: userId,
            total_amount: totalAmount,
        });
        res.status(201).json({ message: "Order Placed successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error!" });
    }
});
exports.createOrder = createOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
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
