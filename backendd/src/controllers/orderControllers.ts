import { Request, Response } from "express";
import { cart, product, order, Orderitem } from "../db/schema";
import { db } from "../db/db";
import { eq, and, inArray, sql } from "drizzle-orm";

export const createOrder = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ error: "User Id is required!" });
    return;
  }

  try {
    // Step 1: Get cart items for the user
    const cartItems = await db
      .select({
        productId: product.id,
        productName: product.name,
        quantity: cart.quantity,
        productPrice: product.price,
      })
      .from(cart)
      .innerJoin(product, eq(cart.productId, product.id))
      .where(eq(cart.userId, userId));

    if (!cartItems || cartItems.length === 0) {
      res.status(404).json({ error: "Cart is empty" });
      return;
    }

    // Ensure that all prices are valid numbers (fallback to 0 if null)
    const validCartItems = cartItems.map((item) => ({
      ...item,
      productPrice: item.productPrice ?? 0, // Ensure price is never null
    }));

    // Calculate total price
    const totalAmount = validCartItems.reduce(
      (sum, item) => sum + item.quantity * item.productPrice,
      0
    );

    const curr_date = new Date().toISOString();

    // Step 2: Insert into `order` and get the order ID
    const [newOrder] = await db
      .insert(order)
      .values({
        order_date: curr_date,
        user_id: userId,
        total_amount: totalAmount,
      })
      .returning({ orderID: order.id });

    if (!newOrder) {
      res.status(500).json({ error: "Failed to create order" });
      return;
    }

    // Step 3: Insert all cart items into `Orderitem`
    await db.insert(Orderitem).values(
      validCartItems.map((item) => ({
        order_id: newOrder.orderID,
        product_id: item.productId,
        quantity: item.quantity,
        price: item.productPrice, // Now guaranteed to be a number
      }))
    );

    // Step 4: Clear cart after placing order
    await db.delete(cart).where(eq(cart.userId, userId));

    // Step 5: Update the product table
    await Promise.all(
      validCartItems.map(async (item) => {
        await db
          .update(product)
          .set({
            availableQuantity: sql`${product.availableQuantity} - ${item.quantity}`,
          })
          .where(eq(product.id, item.productId));
      })
    );

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const { userId } = req.params;
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
      .where(and(eq(order.user_id, userId), eq(order.id, parsedOrderId)));

    if (!OrderItem || OrderItem.length === 0) {
      res.status(404).json({ message: "Order not found with specific Id!" });
      return;
    }

    res.status(200).json(OrderItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export const getOrderHistory = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const orders = await db
      .select({
        orderID: order.id,
        totalPrice: order.total_amount,
        date: order.order_date,
      })
      .from(order)
      .where(eq(order.user_id, userId))
      .orderBy(order.order_date);

    if (orders.length === 0) {
      res.status(200).json([]);
      return;
    }

    const orderIDs = orders.map((o) => o.orderID);

    const orderItems = await db
      .select({
        orderID: Orderitem.order_id,
        productID: Orderitem.product_id,
        quantity: Orderitem.quantity,
        price: Orderitem.price,
        productName: product.name,
        productImage: product.imageUrl,
      })
      .from(Orderitem)
      .leftJoin(product, eq(Orderitem.product_id, product.id))
      .where(inArray(Orderitem.order_id, orderIDs));

    const orderItemsMap: Record<number, any[]> = {};
    orders.forEach((o) => (orderItemsMap[o.orderID] = []));

    orderItems.forEach((item) => {
      orderItemsMap[item.orderID].push({
        productID: item.productID,
        quantity: item.quantity,
        price: item.price,
        productName: item.productName,
        productImage: item.productImage,
      });
    });

    const formattedOrders = orders.map((order) => ({
      ...order,
      orderItems: orderItemsMap[order.orderID] || [],
    }));
    res.status(200).json(formattedOrders);
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};
