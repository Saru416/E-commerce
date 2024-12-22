import { Request, Response } from "express";
import { supabase } from "../db/supabase-service";

export const createOrder = async (req: Request,res: Response) => {
    const { userId } = req.body;

    if(!userId){
        res.status(400).json({error: "User Id is required!"});
    }

    try{
        const {data: cartItem, error: cartError} = await supabase
            .from("cart")
            .select("productId, quantity")
            .eq("userId",userId);

        if (cartError || !cartItem || cartItem.length === 0){
            res.status(404).json({error: "cart is empty"});
        }

        // const total_amount = cartItem?.reduce((sum,item) => sum + item.quantity * item.price, 0);
        
        // const {data: OrderData, error: orderError} = await supabase
        //     .from("order")
        //     .insert([{user_id: userId, total_amount: total_amount, order_date: new Date() }])
        //     .select("id")
        //     .single();

        // if (orderError) {
        //     throw new Error(`Order creation failed ${orderError.message}`);
        // }
        } catch (error) {

    }
}