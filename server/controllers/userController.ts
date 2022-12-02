import { Request, Response } from "express";
import { ErrorHandler, wrapAsync } from "../helpers/ErrorHandler";
import User from "../models/User";

export const userGet = wrapAsync(async (req: Request, res: Response) => {
  const people = await User.find({}).select("-password -verified -__v");
  res.json({ success: true, people });
});

export const userFind = wrapAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const user = await User.findById(userId).select("-password -verified -__v");

  // User not found
  if (!user) throw new ErrorHandler(400, "User not found");

  // All good
  res.json({ success: true, user });
});
