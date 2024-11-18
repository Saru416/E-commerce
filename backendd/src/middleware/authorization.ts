import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  //const token = req.header('Authorization')?.split(' ')[1];
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    if(token !== undefined){
      const decoded = jwt.verify(token, process.env.JWT_SECRET!); 
      (req as any).user = decoded; 
      next();
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
