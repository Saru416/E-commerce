"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderControllers_1 = require("../controllers/orderControllers");
const router = express_1.default.Router();
router.post('/newOrder', orderControllers_1.createOrder);
router.get('/orders/:userId', orderControllers_1.getOrders);
router.get('/orderById/:orderId', orderControllers_1.OrderById);
router.get('/orderHistory/:userId', orderControllers_1.getOrderHistory);
exports.default = router;
