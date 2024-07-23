import { Router } from "express";
import { protect } from "../middlewares/verify-user";

const router = Router();

router.post("/", (request, response) => {});

router.get("/", protect, (request, response) => {
  return response.send("works");
});

router.get("/:id", (request, response) => {});

router.put("/:id", (request, response) => {});

router.delete("/:id", (request, response) => {});

export default router;
