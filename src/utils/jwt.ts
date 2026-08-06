import jwt from "jsonwebtoken";
import { env } from "../config/env";


const secret = env.JWT_SECRET;

export function generateToken(user: { id: number; email: string }) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    secret,
    {
      expiresIn: "7d",
    },
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret);
}
