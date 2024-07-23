import { Router } from "express";
import { protect } from "../middlewares/verify-user";
import { ProductController } from "../controllers/product.controller";

const router = Router();

router.use(protect);

router.post("/new", ProductController.create);

router.get("/", ProductController.getProducts);

router.get("/:id", ProductController.getProduct);

router.put("/update/:id", ProductController.update);

router.delete("/delete/:id", ProductController.delete);

export default router;
