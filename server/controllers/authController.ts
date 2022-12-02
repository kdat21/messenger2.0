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
import { ErrorHandler, wrapAsync } from "../helpers/ErrorHandler";

export const authCookies = (req: Request, res: Response) => {
  res.json({ success: true, token: req.cookies.mess_clone });
};

export const authDeleteCookies = (req: Request, res: Response) => {
  res.clearCookie("mess_clone").json({ success: true });
};

export const authAuthenticate = wrapAsync(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.userId).select("-password -verified");
    if (!user) throw new ErrorHandler(400, "User not found");

    res.json({ success: true, user });
  }
);

export const authRegister = wrapAsync(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // Simple validation
  if (username == "" || email == "" || password == "")
    throw new ErrorHandler(400, "Empty input fields");

  if (!/^[a-zA-Z0-9 ]*$/.test(username))
    throw new ErrorHandler(400, "Invalid name entered");

  if (
    !/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/.test(
      password
    )
  )
    throw new ErrorHandler(400, "Password is too weak");

  // Check for existing users
  const user = await User.findOne({ email });

  if (user) throw new ErrorHandler(400, "Email has already registered");

  // All good
  const hashedPassword = await hash(password);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  await sendVerificationEmail(
    { _id: newUser._id.toString(), email: newUser.email },
    res
  );

  
});

export const authVerify = wrapAsync(async (req: Request, res: Response) => {
  const { userId, uniqueString } = req.params;

  // Checking for exist account record
  const userVerification = await UserVerification.findOne({ userId });

  if (!userVerification) {
    throw new ErrorHandler(
      400,
      "Account record doesn't exist or has been verified already!"
    );
  }

  // Check if expired
  const { expireAt } = userVerification;

  if (expireAt.getTime() < Date.now()) {
    await UserVerification.findOneAndDelete({ userId });
    await User.findByIdAndDelete({ userId });
    throw new ErrorHandler(400, "Link has expired");
  }

  // Valid record exists
  const validUniqueString = await verify(
    userVerification.uniqueString,
    uniqueString
  );
  if (!validUniqueString)
    throw new ErrorHandler(400, "Invalid verification details passed");

  // All good
  await User.findByIdAndUpdate(userId, { verified: true });
  await UserVerification.findOneAndDelete({ userId });

  // Return token
  const accessToken = sign({ userId }, process.env.ACCESS_TOKEN_SECRET!);

  res
    .cookie("mess_clone", accessToken, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
    })
    .json({
      success: true,
      message: "User verified successfully",
      accessToken,
    });

  
});

export const authIdentify = wrapAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  // Simple validation
  if (email == "") throw new ErrorHandler(400, "Empty input fields");

  // Check for exist user
  const user = await User.findOne({ email });

  if (!user) throw new ErrorHandler(400, "Email not found");

  // Check if verified yet
  if (!user.verified)
    throw new ErrorHandler(400, "Account has not been verified yet");

  // All good
  sendForgotPasswordEmail({ _id: user._id.toString(), email: user.email }, res);
});

export const authForgotPassword = wrapAsync(
  async (req: Request, res: Response) => {
    const { userId, uniqueString } = req.params;
    const { newPassword } = req.body;

    // Checking for exist account record
    const userVerification = await UserVerification.findOne({ userId });

    if (!userVerification) {
      throw new ErrorHandler(
        400,
        "Account record doesn't exist or has been reset already"
      );
    }

    // Check if expired
    const { expireAt } = userVerification;

    if (expireAt.getTime() < Date.now()) {
      await UserVerification.findOneAndDelete({ userId });
      throw new ErrorHandler(400, "Link has expired");
    }

    // Valid record exists
    const validUniqueString = await verify(
      userVerification.uniqueString,
      uniqueString
    );
    if (!validUniqueString)
      throw new ErrorHandler(400, "Invalid reset details passed");

    // Simple new password validation
    if (newPassword == "") throw new ErrorHandler(400, "Missing password");

    if (
      !/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/.test(
        newPassword
      )
    )
      throw new ErrorHandler(400, "New password is too weak");

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
  }
);

export const authLogin = wrapAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Simple validation
  if (email == "" || password == "")
    throw new ErrorHandler(400, "Empty input fields");

  // Check for exist user
  const user = await User.findOne({ email });

  if (!user) throw new ErrorHandler(400, "Email not found");

  // Check password
  const validPassword = await verify(user.password, password);

  if (!validPassword) throw new ErrorHandler(400, "Incorrect password");

  // Check if verified yet
  if (!user.verified)
    throw new ErrorHandler(400, "Account has not been verified yet");

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

  
});
