import express from "express";
import { addToCart,deleteItemCart, getCart, updateCartItem } from "../controllers/cartController";

const router = express.Router();

router.get('/getCart/:userId',getCart);
router.post('/addtoCart',addToCart);
router.put('/updateCartItem',updateCartItem);
router.delete('/deleteItemCart/:productId',deleteItemCart);

export default router;

