import { Router } from "express";
import { protect } from "../middlewares/verify-user";
import { ProductController } from "../controllers/product.controller";
import { handleValidate } from "../middlewares/handle-validate";
import {
  createProductValidation,
  updateProductValidation,
} from "../middlewares/products/productValidations";

const router = Router();

router.use(protect);

router.post(
  "/new",
  createProductValidation(),
  handleValidate,
  ProductController.create
);

router.get("/", ProductController.getProducts);

router.get("/:id", ProductController.getProduct);

router.put(
  "/update/:id",
  updateProductValidation(),
  handleValidate,
  ProductController.update
);

router.delete("/delete/:id", ProductController.delete);

export default router;
