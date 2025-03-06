"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post("/signUp", userController_1.signUp);
router.post("/login", userController_1.login);
router.get("/getuser", userController_1.getuser);
router.get("/getAllusers", userController_1.getAllusers);
router.post("/addAddress", userController_1.addAddress);
router.get("/getAddress", userController_1.getAddress);
exports.default = router;
