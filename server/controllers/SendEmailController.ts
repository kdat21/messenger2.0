import { Response } from "express";
import { hash } from "argon2";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import UserVerification from "../models/UserVerification";
import { ErrorHandler } from "../helpers/ErrorHandler";

// nodemailer stuff
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

// Send verification email
export const sendVerificationEmail = async (
  { _id, email }: { _id: string; email: string },
  res: Response
) => {
  // URL to be used in the email
  const currentUrl = "http://localhost:3000";

  const uniqueString = uuidv4() + _id;

  // Mail options
  const mailOptions = {
    from: process.env.AUTH_EMAIL!,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Verify your email address to complete the signup and login into your account.</p>
             <p>This link <b>expires in 6 hours</b>.</p>
             <p>Press <a href=${currentUrl}/verify/${_id}/${uniqueString}>here</a> to proceed.</p>`,
  };
    // Save UserVerification collection
    const hashUniqueString = await hash(uniqueString);
    const newVerification = new UserVerification({
      userId: _id,
      uniqueString: hashUniqueString,
      expireAt: Date.now() + 21600000,
    });

    await newVerification.save();

    // Send verification email
    await transporter.sendMail(mailOptions);
    res.json({
      success: true,
      message: "User created successfully, waiting for being verified...",
    });
};

export const sendForgotPasswordEmail = async (
  { _id, email }: { _id: string; email: string },
  res: Response
) => {
  // URL to be used in the email
  const currentUrl = "http://localhost:3000";

  const uniqueString = uuidv4() + _id;

    // Delete all password reset request
    await UserVerification.deleteMany({ userId: _id });

    // Mail options
    const mailOptions = {
      from: process.env.AUTH_EMAIL!,
      to: email,
      subject: "Reset your password",
      html: `<p>Press <a href=${currentUrl}/resetpassword/${_id}/${uniqueString}>here</a> to reset your password.</p>
           <p>This link <b>expires in 1 hour</b>.</p>`,
    };

    // Save UserVerification collection
    const hashUniqueString = await hash(uniqueString);
    const newVerification = new UserVerification({
      userId: _id,
      uniqueString: hashUniqueString,
      expireAt: Date.now() + 3600000,
    });

    await newVerification.save();

    // Send reset password email
    await transporter.sendMail(mailOptions);
    res.json({
      success: true,
      message: "Reset password mail sent",
    });
};
