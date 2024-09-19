import { body } from "express-validator";

export const imageUploadValidation = [
  body("titles").isArray().withMessage("Titles must be an array"),
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

export const updateImageBatchValidation = [
  body('images').isArray().withMessage('Images must be an array'),
  body('images.*.title').isString().notEmpty().withMessage('Image title is required'),
  body('images.*.order').isInt({ min: 0 }).withMessage('Image order must be a non-negative integer'),
  body('images.*._id').optional().isMongoId().withMessage('Invalid image ID'),
  body('images.*.file').optional().isString().withMessage('File name must be a string')
];
