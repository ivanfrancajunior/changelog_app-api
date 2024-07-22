import express from "express";

import productsRoutes from "./routes/products.routes";

import updateRoutes from "./routes/updates.routes";

import updatePointsRoutes from "./routes/bulletPoints.routes";

import morgan from "morgan";

import cors from "cors";

const app = express();

app.use(
  cors({
    origin: `http://localhost:${process.env.PORT || 3000}`,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/product", productsRoutes);

app.use("/api/update", updateRoutes);

app.use("/api/updatepoints", updatePointsRoutes);

app.get("/api", (request, response) => {
  response.status(200).json({ message: "Hello World!" });
});

export default app;
