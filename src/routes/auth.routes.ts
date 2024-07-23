import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { protect } from "../middlewares/verify-user";
import {
  createUserValidation,
  updateUserValidation,
} from "../middlewares/auth/authUserValidations";
import { handleValidate } from "../middlewares/handle-validate";

const router = Router();

router.post(
  "/signup",
  createUserValidation(),
  handleValidate,
  AuthController.createUser
);
router.post("/signin", (request, response) => {
  return AuthController.signin(request, response);
});

router.get("/me", protect, (request, response) => {
  return AuthController.getUser(request, response);
});

router.put(
  "/update/:id",
  protect,
  updateUserValidation(),
  handleValidate,
  AuthController.updateUser
);

router.delete("/delete", protect, AuthController.deleteUser)

export default router;
