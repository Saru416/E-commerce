import { Request, Response } from "express";
import { db } from "../db/db";
import { product } from "../db/schema";
import { eq } from "drizzle-orm";

export const getallCategory = async (req: Request,res: Response) => {
    try {
        const categories = await db.select({category: product.category}).from(product)
        res.status(201).json(categories);
    } catch (error) {
        res.status(500).json({message: "Server Error!"})
    }
}

export const getCategoryByID = async (id: number | string ,req: Request, res: Response) => {
    try {
        const categoryId = typeof id === 'string' ? parseInt(id, 10) : id;
        const reqcategory = await db.select({category: product.category}).from(product).where(eq(product.id,categoryId));
        if (reqcategory.length > 0) {
            return reqcategory[0]; 
        } else {
            return null;
        }
    } catch (error) {
        res.status(500).json({message: "Server Error!"})
    }
}

export const addCategory = async (req: Request, res: Response) => {
    const {name, subCategory} = req.body;

    if (!name || !subCategory) {
        return res.status(400).json({ message: "Name and subcategory are required!" });
    }
}