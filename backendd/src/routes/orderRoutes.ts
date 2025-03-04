import express from 'express';
import { createOrder, getOrders, OrderById,getOrderHistory } from '../controllers/orderControllers';

const router = express.Router();

router.post('/newOrder',createOrder);
router.get('/orders/:userId',getOrders);
router.get('/orderById/:orderId',OrderById);
router.get('/orderHistory/:userId',getOrderHistory);

export default router;