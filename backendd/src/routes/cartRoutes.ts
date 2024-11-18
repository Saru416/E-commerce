import express from "express";
import { addToCart,deleteItemCart, getCart } from "../controllers/cartController";

const router = express.Router();

router.get('/getCart',getCart);
router.post('/addtoCart',addToCart);
router.delete('/deleteItemCart',deleteItemCart);

export default router;

