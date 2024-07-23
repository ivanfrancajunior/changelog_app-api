import express from "express";

import productsRoutes from "./routes/products.routes";

import updateRoutes from "./routes/updates.routes";

import updatePointsRoutes from "./routes/bulletPoints.routes";

import asyncHandler from "express-async-handler";

import { handleErrors } from "./middlewares/handle-errors";

import authRoutes from "./routes/auth.routes";

import morgan from "morgan";

import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: `http://localhost:${process.env.PORT || 3000}`,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/products", productsRoutes);

app.use("/api/update", updateRoutes);

app.use("/api/updatepoints", updatePointsRoutes);

app.use("/api/auth", authRoutes);

app.get("/api", (request, response, next) => {
  response.status(200).json({ message: "API running" });
});

app.use(asyncHandler);

app.use(handleErrors);

export default app;
