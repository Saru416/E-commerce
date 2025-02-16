import express from 'express';
import { createOrder, getOrders, OrderById } from '../controllers/orderControllers';

const router = express.Router();

router.post('/newOrder',createOrder);
router.get('/orders',getOrders);
router.get('/orders/:orderId',OrderById);

export default router;