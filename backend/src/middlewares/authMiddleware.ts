import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/User";

const requireAuth = (role: string = "USER") => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });
      const decoded = jwt.verify(token, process.env.SECRET) as jwt.JwtPayload;
      const user = await User.findById(decoded.id);
      if (user && user.role === role) {
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};

export { requireAuth };
