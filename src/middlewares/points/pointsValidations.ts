import { body } from "express-validator";

export const createPointValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("name is required.")
      .isLength({ min: 2 })
      .withMessage("Product name must be at least  2 characters."),
    body("description")
      .isString()
      .withMessage("description is required.")
      .isLength({ min: 2 })
      .withMessage("Product name must be at least  2 characters."),
  ];
};

export const updatePointValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("name is required.")
      .isLength({ min: 2 })
      .withMessage("Product name must be at least  2 characters.")
      .optional(),
    body("description")
      .isString()
      .withMessage("description is required.")
      .isLength({ min: 2 })
      .withMessage("Product name must be at least  2 characters.")
      .optional(),
  ];
};
