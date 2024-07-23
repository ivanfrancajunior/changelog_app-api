import { Request, Response } from "express";
import prisma from "../../prisma/prisma-client";
import { UpdatePoint } from "@prisma/client";


export class PointsController {
  static async create(request: Request, response: Response) {
    const { name, description } = request.body;

    const { id } = request.params;

    const update = await prisma.update.findFirst({
      where: { id },
    });

    if (!update)
      return response.status(404).json({ error: "Update not found" });

    const bulletPoint = await prisma.updatePoint.create({
      data: {
        name,
        description,
        updateId: update.id,
        updatedAt: new Date(),
      },
    });

    return response.status(201).json(bulletPoint);
  }

  static async getPoints(request: Request, response: Response) {
    const { id } = request.params;

    const bulletPoints = await prisma.updatePoint.findMany({
      where: { updateId: id },
    });

    return response.status(200).json(bulletPoints);
  }
  static async getPoint(request: Request, response: Response) {
    const { id } = request.params;

    const bulletPoint = await prisma.updatePoint.findFirst({
      where: { id },
    });

    return response.status(200).json(bulletPoint);
  }
  static async update(request: Request, response: Response) {
    const { name, description }: UpdatePoint = request.body;

    const { id } = request.params;

    const user = request.user;

    const product = await prisma.product.findFirst({
      where: {
        belongsToId: user.id,
      },
    });

    if (!product) return response.status(401).json({ error: "Unauthorized" });

    const update = await prisma.update.findFirst({
      where: {
        productId: product?.id,
      },
    });

    if (!update)
      return response.status(404).json({ error: "Update not found" });

    if (update.productId !== product?.id)
      return response.status(401).json({ error: "Unauthorized" });

    const bulletPoint = await prisma.updatePoint.update({
      where: { id },
      data: {
        name,
        description,
        updatedAt: new Date(),
      },
    });

    return response.status(201).json(bulletPoint);
  }
  static async delete(request: Request, response: Response) {
    const { id } = request.params;

    const user = request.user;

    const product = await prisma.product.findFirst({
      where: {
        belongsToId: user.id,
      },
    });

    if (!product) return response.status(401).json({ error: "Unauthorized" });

    const update = await prisma.update.findFirst({
      where: {
        productId: product?.id,
      },
    });

    if (update.productId !== product?.id)
      return response.status(401).json({ error: "Unauthorized" });

    await prisma.updatePoint.delete({
      where: { id },
    });

    return response.status(204).json({
      message: "success",
    });
  }
}
