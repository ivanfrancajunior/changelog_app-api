import { Router } from "express";

import { protect } from "../middlewares/verify-user";
import { UpdatesController } from "../controllers/updates.controllers";
import { handleValidate } from "../middlewares/handle-validate";
import {
  createUpdatesValidation,
  updatesValidations,
} from "../middlewares/update/updateValidations";

const router = Router();

router.use(protect);

router.post(
  "/new/:id",
  createUpdatesValidation(),
  handleValidate,
  UpdatesController.create
);

router.get("/:id", UpdatesController.getUpdates);

router.get("/product/:id", UpdatesController.getUpdateById);

router.put(
  "/:id",
  updatesValidations(),
  handleValidate,
  UpdatesController.update
);

router.delete("/:id", UpdatesController.delete);

export default router;
