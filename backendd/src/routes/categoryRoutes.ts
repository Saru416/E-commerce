import express from "express";
import { addCategory,getCategoryByID,getallCategory,deleteCategory, updateCategory } from "../controllers/categoryController";

const router = express.Router();

router.post('/addCategory',addCategory);
router.get('/getCategorybyid/:id',getCategoryByID);
router.get('/getAllcategory',getallCategory);
router.put('/updateCategory/:id',updateCategory);
router.delete('/deleteCategory/:id',deleteCategory);

export default router;