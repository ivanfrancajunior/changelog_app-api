import express from "express";

import productsRoutes from "./routes/products.routes";

import updateRoutes from "./routes/updates.routes";

import updatePointsRoutes from "./routes/bulletPoints.routes";

const app = express();

app.use(express.json());

app.use("/products", productsRoutes);

app.use("/updates", updateRoutes);

app.use("/updatepoints", updatePointsRoutes);

app.get("/", (request, response) => {
  response.json({ message: "Hello World!" });
});

export default app;
