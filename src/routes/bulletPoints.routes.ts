import { Router } from "express";
import { PointsController } from "../controllers/points.controllers";
import { handleValidate } from "../middlewares/handle-validate";
import {
  createPointValidation,
  updatePointValidation,
} from "../middlewares/points/pointsValidations";
import { protect } from "../middlewares/verify-user";

const router = Router();

router.use(protect);

router.post(
  "/new",
  createPointValidation(),
  handleValidate,
  PointsController.create
);

router.get("/update/:id", PointsController.getPoints);

router.get("/update/point/:id", PointsController.getPoint);

router.put(
  "/:id",
  updatePointValidation(),
  handleValidate,
  PointsController.update
);

router.delete("/:id", PointsController.delete);

export default router;
