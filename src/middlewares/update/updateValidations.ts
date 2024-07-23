import { body } from "express-validator";

const validStatus = ["IN_PROGRESS", "SHIPPED", "DEPRECATED"];

export const createUpdatesValidation = () => {
  return [
    body("title")
      .isString()
      .withMessage("Update title is required.")
      .isLength({ min: 4 })
      .withMessage("Title must be at least  4 characters."),
    body("version")
      .isString()
      .withMessage("Update version is required.")
      .isLength({ min: 1 })
      .withMessage("Update version name must be at least  2 characters."),
  ];
};

export const updatesValidations = () => {
  return [
    body("title")
      .isString()
      .withMessage("Update title is required.")
      .isLength({ min: 4 })
      .withMessage("Product name must be at least 4 characters.")
      .optional(),
    body("version")
      .isString()
      .withMessage("Update version is required.")
      .isLength({ min: 2 })
      .withMessage("Update version must be at least 2 characters.")
      .optional(),
    body("status")
      .isString()
      .withMessage("Product name is required.")
      .isLength({ min: 2 })
      .withMessage("Product name must be at least 3 characters.")
      .custom((value) => {
        if (!validStatus.includes(value)) {
          throw new Error("Invalid status value");
        }
        return true;
      })
      .optional(),
  ];
};
