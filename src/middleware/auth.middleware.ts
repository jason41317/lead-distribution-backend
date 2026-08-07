import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const user = verifyToken(token);

    (req as any).user = user;

    next();
  } catch {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}
