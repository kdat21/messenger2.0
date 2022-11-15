import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { ErrorHandler } from "../helpers/ErrorHandler";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) throw new ErrorHandler(401, "Access token not found");

  try {
    const decoded = verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    throw new ErrorHandler(403, "Invalid token");
  }
};

export default verifyToken;
