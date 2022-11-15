import { Request, Response } from "express";
import { ErrorHandler } from "../helpers/ErrorHandler";
import User from "../models/User";

export const userGet = async (req: Request, res: Response) => {
  try {
    const people = await User.find({}).select("-password -verified -__v");
    res.json({ success: true, people });
  } catch (error) {
    console.log(error);
    throw new ErrorHandler(500, 'Internal server error')
  }
};

export const userFind = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).select("-password -verified -__v");

    // User not found
    if (!user)
    throw new ErrorHandler(400, "User not found" );

    // All good
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    throw new ErrorHandler(500, 'Internal server error')
  }
};
