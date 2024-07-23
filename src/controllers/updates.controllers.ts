import { Request, Response } from "express";
import prisma from "../../prisma/prisma-client";
import { Update } from "@prisma/client";

export class UpdatesController {
  static async create(request: Request, response: Response) {
    const { id } = request.params;

    const { title, version }: Update = request.body;

    const user = request.user;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product)
      return response.status(404).json({ error: "Product not found" });

    if (user.id !== product.belongsToId)
      return response.status(401).json({ error: "Unauthorized" });

    const newUpdate = await prisma.update.create({
      data: {
        title,
        productId: product.id,
        updatedAt: new Date(),
        version,
      },
    });

    return response.status(201).json(newUpdate);
  }

  static async getUpdates(request: Request, response: Response) {
    const { id } = request.params;

    const updates = await prisma.update.findMany({
      where: {
        productId: id,
      },
    });

    if (!updates)
      return response.status(404).json({ error: "Product not found" });

    return response.status(200).json(updates);
  }
  static async getUpdateById(request: Request, response: Response) {
    const { id } = request.params;

    const update = await prisma.update.findFirst({
      where: {
        id: id,
      },
    });

    if (!update)
      return response.status(404).json({ error: "Product not found" });

    return response.status(200).json(update);
  }

  static async update(request: Request, response: Response) {
    const { id } = request.params;

    const { title, version, status, assets }: Update = request.body;

    const has_updates = await prisma.update.findUnique({
      where: {
        id,
      },
    });

    if (!has_updates)
      return response.status(404).json({ error: "Product not found" });

    const update = await prisma.update.update({
      where: {
        id,
      },
      data: {
        title,
        version,
        status,
        assets,
        updatedAt: new Date(),
      },
    });

    if (!update)
      return response
        .status(500)
        .json({ error: "Something went wrong. Try again later" });

    return response.status(200).json(update);
  }
  static async delete(request: Request, response: Response) {
    const { id } = request.params;

    const user = request.user;

    const product = await prisma.product.findFirst({
      where: {
        belongsToId: user.id,
      },
    });

    const update = await prisma.update.findUnique({
      where: {
        id,
        productId: product?.id,
      },
    });

    if (update.productId !== product?.id)
      return response.status(401).json({ error: "Unauthorized" });

    await prisma.update.delete({
      where: {
        id,
      },
    });

    return response.status(204).json({
      message: "success",
    });
  }
}
