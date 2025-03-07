import { Request, Response } from "express";
//import { supabase } from "../services/supabase_services";
import { supabase } from "../db/supabase-service";
import { user_address } from "../db/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";

export const signUp = async (req: Request, res: Response) => {
  const { email, password, display_name } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name, // Add custom metadata here
        },
      },
    });

    if (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    } else {
      res.status(201).json({ message: "User signed up successfully!", data });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(200).json({ message: "User logged in successfully!", data });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getuser = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(200).json({ message: "User- ", data });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Admin getAllusers
export const getAllusers = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) {
      console.error("Supabase error:", error.message);
      res.status(400).json({ message: error.message });
    } else {
      res.status(201).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export const addAddress = async (req: Request, res: Response) => {
  const { name, user_id, address, city, state, pincode, country } = req.body;
  try {
    if (!user_id || !name || !address || !city || !state || !pincode || !country) {
      res.status(400).json({ message: "All fields Required" });
      return;
    }
    await db
      .insert(user_address)
      .values({ name, user_id , address, city, state, pincode, country });
    res.status(201).json({ message: "Address added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export const getAddress = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const addresses = await db
      .select()
      .from(user_address)
      .where(eq(user_address.user_id, userId));
    if (addresses.length === 0) {
      res.status(404).json({ message: "No Address Saved Yet!" });
      return;
    }
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};
