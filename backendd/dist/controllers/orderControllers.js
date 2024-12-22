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
exports.createOrder = void 0;
const supabase_service_1 = require("../db/supabase-service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId) {
        res.status(400).json({ error: "User Id is required!" });
    }
    try {
        const { data: cartItem, error: cartError } = yield supabase_service_1.supabase
            .from("cart")
            .select("productId, quantity")
            .eq("userId", userId);
        if (cartError || !cartItem || cartItem.length === 0) {
            res.status(404).json({ error: "cart is empty" });
        }
        // const total_amount = cartItem?.reduce((sum,item) => sum + item.quantity * item.price, 0);
        // const {data: OrderData, error: orderError} = await supabase
        //     .from("order")
        //     .insert([{user_id: userId, total_amount: total_amount, order_date: new Date() }])
        //     .select("id")
        //     .single();
        // if (orderError) {
        //     throw new Error(`Order creation failed ${orderError.message}`);
        // }
    }
    catch (error) {
    }
});
exports.createOrder = createOrder;
