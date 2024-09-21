import { body } from "express-validator";

export const registerValidation = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("phone")
    .isMobilePhone("any")
    .withMessage("Please enter a valid phone number"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").not().isEmpty().withMessage("Password is required"),
];

export const resetPasswordValidation = [
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
