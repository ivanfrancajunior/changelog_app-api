import { body } from "express-validator";

export const createProductValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Product name is required.")
      .isLength({ min: 2 })
      .withMessage("Product name must be at least  2 characters."),
  ];
};

export const updateProductValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Product name is required.")
      .isLength({ min: 2 })
      .withMessage("Product name must be at least 3 characters.")
      .optional(),
  ];
};
