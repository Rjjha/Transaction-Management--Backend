import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Extend Express Request Interface
declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload; // Attach the custom JWT payload type to Request
    }
  }
}

// Define the structure of the custom JWT payload
interface CustomJwtPayload extends JwtPayload {
  role: number;
}

// Middleware for Admin Authorization
export const authMiddleware: (
  req: Request,
  res: Response,
  next: NextFunction
) => void = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as CustomJwtPayload;

    if (decoded.role !== 1) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
