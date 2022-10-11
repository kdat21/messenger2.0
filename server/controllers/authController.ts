import { Request, Response } from "express";
import { hash, verify } from "argon2";
import { sign } from "jsonwebtoken";
require("dotenv").config();
import User from "../models/User";
import UserVerification from "../models/UserVerification";
import {
  sendForgotPasswordEmail,
  sendVerificationEmail,
} from "./SendEmailController";

export const authCookies = (req: Request, res: Response) => {
  try {
    res.json({ success: true, token: req.cookies.mess_clone });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const authDeleteCookies = (req: Request, res: Response) => {
  try {
    res.clearCookie("mess_clone").json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const authAuthenticate = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password -verified");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const authRegister = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // Simple validation
  if (username == "" || email == "" || password == "")
    return res
      .status(400)
      .json({ success: false, message: "Empty input fields" });

  if (!/^[a-zA-Z0-9 ]*$/.test(username))
    return res
      .status(400)
      .json({ success: false, message: "Invalid name entered" });

  if (
    !/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/.test(
      password
    )
  )
    return res
      .status(400)
      .json({ success: false, message: "Password is too weak" });

  try {
    // Check for existing users
    const user = await User.findOne({ email });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Email has already registered" });

    // All good
    const hashedPassword = await hash(password);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    sendVerificationEmail(
      { _id: newUser._id.toString(), email: newUser.email },
      res
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const authVerify = async (req: Request, res: Response) => {
  const { userId, uniqueString } = req.params;

  try {
    // Checking for exist account record
    const userVerification = await UserVerification.findOne({ userId });

    if (!userVerification) {
      return res.status(400).json({
        success: false,
        message: "Account record doesn't exist or has been verified already!",
      });
    }

    // Check if expired
    const { expireAt } = userVerification;

    if (expireAt.getTime() < Date.now()) {
      await UserVerification.findOneAndDelete({ userId });
      await User.findByIdAndDelete({ userId });
      return res
        .status(400)
        .json({ success: false, message: "Link has expired" });
    }

    // Valid record exists
    const validUniqueString = await verify(
      userVerification.uniqueString,
      uniqueString
    );
    if (!validUniqueString)
      return res.status(400).json({
        success: false,
        message: "Invalid verification details passed",
      });

    // All good
    await User.findByIdAndUpdate(userId, { verified: true });
    await UserVerification.findOneAndDelete({ userId });

    // Return token
    const accessToken = sign({ userId }, process.env.ACCESS_TOKEN_SECRET!);

    res.cookie("mess_clone", accessToken, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
    }).json({
      success: true,
      message: "User verified successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const authIdentify = async (req: Request, res: Response) => {
  const { email } = req.body;

  // Simple validation
  if (email == "")
    return res
      .status(400)
      .json({ success: false, message: "Empty input fields" });

  try {
    // Check for exist user
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Email not found" });

    // Check if verified yet
    if (!user.verified)
      return res
        .status(400)
        .json({ success: false, message: "Account has not been verified yet" });

    // All good
    sendForgotPasswordEmail(
      { _id: user._id.toString(), email: user.email },
      res
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const authForgotPassword = async (req: Request, res: Response) => {
  const { userId, uniqueString } = req.params;
  const { newPassword } = req.body;

  try {
    // Checking for exist account record
    const userVerification = await UserVerification.findOne({ userId });

    if (!userVerification) {
      return res.status(400).json({
        success: false,
        message: "Account record doesn't exist or has been reset already",
      });
    }

    // Check if expired
    const { expireAt } = userVerification;

    if (expireAt.getTime() < Date.now()) {
      await UserVerification.findOneAndDelete({ userId });
      return res
        .status(400)
        .json({ success: false, message: "Link has expired" });
    }

    // Valid record exists
    const validUniqueString = await verify(
      userVerification.uniqueString,
      uniqueString
    );
    if (!validUniqueString)
      return res.status(400).json({
        success: false,
        message: "Invalid reset details passed",
      });

    // Simple new password validation
    if (newPassword == "")
      return res
        .status(400)
        .json({ success: false, message: "Missing password" });

    if (
      !/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/.test(
        newPassword
      )
    )
      return res
        .status(400)
        .json({ success: false, message: "New password is too weak" });

    // All good
    const hashedNewPassword = await hash(newPassword);
    await User.findByIdAndUpdate(userId, { password: hashedNewPassword });
    await UserVerification.findOneAndDelete({ userId });

    // Return token
    const accessToken = sign({ userId }, process.env.ACCESS_TOKEN_SECRET!);

    res.json({
      success: true,
      message: "User reset password successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const authLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Simple validation
  if (email == "" || password == "")
    return res
      .status(400)
      .json({ success: false, message: "Empty input fields" });

  try {
    // Check for exist user
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Email not found" });

    // Check password
    const validPassword = await verify(user.password, password);

    if (!validPassword)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });

    // Check if verified yet
    if (!user.verified)
      return res
        .status(400)
        .json({ success: false, message: "Account has not been verified yet" });

    // All good
    // Return token
    const accessToken = sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET!
    );

    res
      .cookie("mess_clone", accessToken, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
      })
      .json({
        success: true,
        message: "User logged in successfully",
        accessToken,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
