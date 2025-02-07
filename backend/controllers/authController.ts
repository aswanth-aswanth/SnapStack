import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";
import User, { IUser } from "../models/User";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const isError = (error: unknown): error is Error => {
  return (error as Error).message !== undefined;
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler("Validation error", 400));
    }

    const { email, phone, password } = req.body;

    const isEmailTaken = await User.findOne({ email });
    const isPhoneTaken = await User.findOne({ phone });

    if (isEmailTaken) {
      return next(new ErrorHandler("Email is already registered", 409));
    }

    if (isPhoneTaken) {
      return next(new ErrorHandler("Phone number is already registered", 409));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = new User({ email, phone, password: hashedPassword });
    await user.save();

    res.status(201).json({ success: true });
  } catch (error: unknown) {
    if (isError(error)) {
      next(new ErrorHandler(error.message || "Registration failed", 500));
    } else {
      next(new ErrorHandler("Registration failed", 500));
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ success: true, token });
  } catch (error: unknown) {
    if (isError(error)) {
      next(new ErrorHandler(error.message || "Login failed", 500));
    } else {
      next(new ErrorHandler("Login failed", 500));
    }
  }
};

const sendEmail = async (email: string, subject: string, message: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "no-reply@yourapp.com",
    to: email,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `You requested a password reset. Please click on the following link to reset your password: \n\n${resetUrl}`;

    await sendEmail(user.email, "Password Reset Request", message);

    res
      .status(200)
      .json({ success: true, message: "Reset password email sent." });
  } catch (error: unknown) {
    next(new ErrorHandler("Failed to send reset password email", 500));
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully." });
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return next(new ErrorHandler("Reset token expired", 400));
    }
    next(new ErrorHandler("Failed to reset password", 500));
  }
};
