import { body } from "express-validator";

export const imageUploadValidation = [
  body("images").isArray().withMessage("Images must be an array"),
  body("images.*.title")
    .not()
    .isEmpty()
    .withMessage("Each image must have a title"),
  body("images.*.url")
    .not()
    .isEmpty()
    .withMessage("Each image must have a URL"),
];

export const imageEditValidation = [
  body("title").optional().not().isEmpty().withMessage("Title cannot be empty"),
  body("url").optional().not().isEmpty().withMessage("URL cannot be empty"),
];

export const imageRearrangeValidation = [
  body("order").isArray().withMessage("Order must be an array"),
  body("order.*.id").not().isEmpty().withMessage("Each item must have an ID"),
  body("order.*.order")
    .isNumeric()
    .withMessage("Each item must have a numeric order"),
];
