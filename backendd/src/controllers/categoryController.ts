import { Request, Response } from "express";
import { db } from "../db/db";
import { category } from "../db/schema";
import { eq } from "drizzle-orm";

export const getallCategory = async (req: Request, res: Response) => {
  try {
    const categories = await db.select().from(category);
    res.status(201).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export const getCategoryByID = async (req: Request, res: Response) => {
    const {id} = req.params;
  try {
    const categoryId = typeof id === "string" ? parseInt(id, 10) : id;
    const reqcategory = await db
      .select()
      .from(category)
      .where(eq(category.id, categoryId));
    if (reqcategory.length > 0) {
      res.status(201).json(reqcategory[0]);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export const addCategory = async (req: Request, res: Response) => {
  const { name,sub_category } = req.body;

  try {
    if (!name || !sub_category) {
      res.status(400).json({ message: "Name and sub_categoory are required!" });
    }
    await db.insert(category).values({ name, sub_category });
    res.status(201).json({ message: "Category Added!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
    const {name, sub_category} = req.body;
    const { id } = req.params;
    try {
        const categoryId = typeof id === 'string' ? parseInt(id, 10) : id;

        const updatedCategory = await db.update(category).set({name,sub_category}).where(eq(category.id,categoryId)).returning();
        if(updatedCategory.length === 0){
            res.status(404).json({message: "Category not found!"});
        }
        res.status(201).json({message: "Category updated"})
    } catch (error) {
        res.status(500).json({message: "Server Error!"})
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const categoryId = typeof id === 'string' ? parseInt(id, 10) : id;

        await db.delete(category).where(eq(category.id,categoryId));
        res.status(200).json({message: "Category Deleted!"})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}