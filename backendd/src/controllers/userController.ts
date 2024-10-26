import { Request,Response } from "express";
import { supabase } from "../services/supabase_services";

export const signUp  = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (error) {
        res.status(400).json({ message: error.message });
      } else{
        res.status(201).json({ message: 'User signed up successfully!', data });
      }
  
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
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
      } else{
        res.status(200).json({ message: 'User logged in successfully!', data });
      }
  
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
};

export const getuser = async (req: Request, res: Response) => {

  try {
    const { data ,error } = await supabase.auth.getUser();

    if (error) {
      res.status(400).json({ message: error.message });
    } else{
      res.status(200).json({ message: 'User- ', data });
    }

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Admin getAllusers
export const getAllusers = async (req: Request, res: Response) => {
  try {
    const {data, error} = await supabase.auth.admin.listUsers();

    if(error){
      console.error("Supabase error:", error.message);
      res.status(400).json({message: error.message});
    }
    else{
      res.status(201).json(data);
    }
  } catch (error) {
    res.status(500).json({message: "Server Error!"});
  }
};