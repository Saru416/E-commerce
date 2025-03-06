import express from "express";
import {
  signUp,
  login,
  getAllusers,
  getuser,
  getAddress,
  addAddress,
} from "../controllers/userController";

const router = express.Router();

router.post("/signUp", signUp);

router.post("/login", login);
router.get("/getuser", getuser);
router.get("/getAllusers", getAllusers);
router.post("/addAddress",addAddress);
router.get("/getAddress/:userId",getAddress);
export default router;
