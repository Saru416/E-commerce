import { Request, Response } from "express";
import { cart, product, order } from "../db/schema";
import { db } from "../db/db";
import { eq, and } from "drizzle-orm";

export const createOrder = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ error: "User Id is required!" });
  }

  try {
    const cartItem = await db
      .select({
        productId: product.id,
        productName: product.name,
        quantity: cart.quantity,
        productPrice: product.price,
      })
      .from(cart)
      .innerJoin(product, eq(cart.productId, product.id))
      .where(eq(cart.userId, userId));

    if (!cartItem || cartItem.length === 0) {
      res.status(404).json({ error: "cart is empty" });
    }

    type CartItem = {
      productId: number;
      productName: string;
      quantity: number;
      productPrice: number;
    };

    const totalAmount = (cartItem as CartItem[]).reduce(
      (sum, item) => sum + item.quantity * item.productPrice,
      0
    );

    const curr_date = new Date().toISOString();

    await db.insert(order).values({
      order_date: curr_date,
      user_id: userId,
      total_amount: totalAmount,
    });

    res.status(201).json({ message: "Order Placed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const orders = await db
      .select()
      .from(order)
      .where(eq(order.user_id, userId));

    if (!orders || orders.length === 0) {
      res.status(404).json({ message: "No Order Found" });
      return;
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export const OrderById = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { userId } = req.body;
  try {
    const parsedOrderId = parseInt(orderId, 10);

    const OrderItem = await db
      .select()
      .from(order)
      .where(and(eq(order.user_id, userId), eq(order.id,parsedOrderId)));

    if(!OrderItem || OrderItem.length === 0){
        res.status(404).json({message: "Order not found with specific Id!"});
        return;
    }

    res.status(200).json(OrderItem);
    
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};
