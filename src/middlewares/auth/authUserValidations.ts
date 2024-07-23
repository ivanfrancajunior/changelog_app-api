import { body } from "express-validator";

export const createUserValidation = () => {
  return [
    body("username")
      .isString()
      .withMessage("username is required.")
      .isLength({ min: 3 })
      .withMessage("username must be at least 3 characters."),
    body("password")
      .isString()
      .withMessage("Password is required.")
      .isLength({ min: 6 })
      .withMessage("The password needs at least 5 characters."),
  ];
};

export const updateUserValidation = () => {
  return [
    body("username")
      .isString()
      .withMessage("Name is required.")
      .isLength({ min: 3 })
      .withMessage("username must be at least 3 characters.")
      .optional(),
    body("password")
      .isString()
      .withMessage("Password is required.")
      .isLength({ min: 6 })
      .withMessage("The password needs at least 5 characters.")
      .optional(),
  ];
};