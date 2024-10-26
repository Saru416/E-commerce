import { Request, Response } from "express";
import { product } from "../db/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";

// Add new Product
export const addProduct = async (req: Request,res:Response) => {
    const {name, price, category, sub_category, availableQuantity, description} = req.body;

    if(!name || !price || !category || !sub_category || !description || !availableQuantity){
        res.status(400).json({message: "All fields Required!"})
    }
    try{
        await db.insert(product).values({name,description,price,category,sub_category,availableQuantity});
        res.status(201).json({message: "Product Added"})
    } catch (error){
        console.error("Error adding product:", error);
        res.status(500).json({message: "Server Error"})
    }
}

// Get All Products
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await db.select().from(product);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: "Server Error!"})
    }
}

// Get Product By ID
export const getProductById = async (req:Request, res:Response) => {
    try{
        const id = req.params.id;
        const productId = typeof id === 'string' ? parseInt(id, 10) : id;

        const reqProduct = await db.select().from(product).where(eq(product.id,productId)).limit(1);
        if (reqProduct.length > 0) {
            res.status(201).json(reqProduct[0]); 
        } else {
            res.status(201).json({message: "Product not found!"});
        }
    } catch (error){
        console.error("Error fetching product:", error);
        throw new Error("Could not fetch the product");
    }
}

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
    const {name, price, category, sub_category, description} = req.body;

    const { id } = req.params;

    try {
        const productId = typeof id === 'string' ? parseInt(id, 10) : id;

        const updatedProduct = await db
        .update(product).set({name,description,price,category,sub_category})
        .where(eq(product.id,productId))
        .returning();

        if (updateProduct.length === 0){
            res.status(404).json({message: 'Product not Found'})
        }
        res.status(200).json({message: "Product updated!"})

    } catch (error) {
        console.error("Error fetching product:", error);
    }
}

//DELECT a Product
export const deleteProduct = async (req: Request, res: Response) => {
    const {id} = req.params;
    try{
        const productId = typeof id === 'string' ? parseInt(id, 10) : id;

        await db.delete(product).where(eq(product.id,productId));
        res.status(201).json({message: "Product Deleted"});

    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json("Server Error!")
    }
}
