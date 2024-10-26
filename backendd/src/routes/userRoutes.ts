import express from "express";
import { signUp,login, getAllusers,getuser } from "../controllers/userController";

const router = express.Router();

router.post('/signUp',signUp);

router.post('/login',login);
router.get('/getuser',getuser);
router.get('/getAllusers',getAllusers);
export default router;