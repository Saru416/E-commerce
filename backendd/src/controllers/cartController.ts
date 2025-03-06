import { Request, Response } from "express";
import { cart } from "../db/schema";
import { db } from "../db/db";
import { product } from "../db/schema";
import { eq, and } from "drizzle-orm";

export const getCart = async (req:Request,res: Response) => {
    const {userId} = req.params;

    try {
        const cartItems = await db.select({
          productId: product.id,
          productName: product.name,
          quantity: cart.quantity,
          productPrice: product.price,
          productImage: product.imageUrl
        })
        .from(cart)
        .innerJoin(product, eq(cart.productId,product.id))
        .where(eq(cart.userId,userId));
    
        if (cartItems.length === 0) {
          res.status(204).json("Not Found!");
          return
        }
    
        res.status(200).json({
          message: 'Cart retrieved successfully',
          data: cartItems
        });
    
  } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
}

export const addToCart = async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;
  try {
      // Check if the product exists
      const req_product = await db.select().from(product).where(eq(product.id, productId));
      if (req_product.length === 0) {
          res.status(404).json({ message: "Product not found!" });
          return
      }

      // Check if the product is already in the user's cart
      const existingCartItem = await db
          .select()
          .from(cart)
          .where(and(eq(cart.userId, userId), eq(cart.productId, productId)))
          .limit(1);

      if (existingCartItem.length > 0) {
          // Update quantity if item exists in the cart
          await db
              .update(cart)
              .set({ quantity: existingCartItem[0].quantity + quantity })
              .where(and(eq(cart.userId, userId), eq(cart.productId, productId)));
          
          res.status(200).json({ message: 'Cart updated successfully' });
          return
      } else {
          // Add new item to the cart
          await db.insert(cart).values({
              userId,
              productId,
              quantity
          });

          res.status(201).json({ message: 'Product added to cart successfully' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  const {userId, productId, quantity} = req.body;

  try{
    if (!userId || !productId || quantity < 0) {
      res.status(400).json({ message: "Invalid data" });
      return
    }

    const req_product = await db.select().from(cart).where(and(eq(cart.userId, userId), eq(cart.productId, productId))).limit(1);

    if (req_product.length === 0) {
      res.status(404).json({ message: "Product not found!" });
      return
    }

    await db.update(cart).set({ quantity: quantity }).where(and(eq(cart.userId, userId), eq(cart.productId, productId)));

    res.status(201).json({ message: 'Product updated to cart successfully' });
    
  } catch (error) {
    res.status(500).json({message: "Server Error"})
  }
} 


export const deleteItemCart = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params; // Assuming productId is passed as a route parameter
  
      if (!productId) {
        res.status(400).json({ message: "Product ID is required." });
      }
  
      const parsedProductId = parseInt(productId, 10);
      if (isNaN(parsedProductId)) {
        res.status(400).json({ message: "Invalid Product ID format." });
      }
  
      await db.delete(cart).where(eq(cart.productId, parsedProductId));
  
      res.status(200).json({ message: "Item deleted from cart!" });
    } catch (error) {
      console.error("Error deleting item from cart:", error);
      res.status(500).json({ message: "Server Error!" });
    }
  };