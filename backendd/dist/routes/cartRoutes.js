"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const router = express_1.default.Router();
router.get('/getCart', cartController_1.getCart);
router.post('/addtoCart', cartController_1.addToCart);
router.delete('/deleteItemCart', cartController_1.deleteItemCart);
exports.default = router;
