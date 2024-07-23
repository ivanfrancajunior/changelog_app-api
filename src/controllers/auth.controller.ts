import { Request, Response } from "express";
import { comparePassword, generateToken, hashPassword } from "../utils/utils";
import prisma from "../../prisma/prisma-client";

export class AuthController {
  static async createUser(request: Request, response: Response) {
    const { username, password } = request.body;

    const alreadyExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (alreadyExists)
      return response.status(400).json({ error: "User already exists" });

    const user = await prisma.user.create({
      data: {
        username,
        password: await hashPassword(password),
      },
    });

    const token = generateToken(user);

    response.status(201).json({ token });
  }

  static async signin(request: Request, response: Response) {
    const { username, password } = request.body;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return response.status(401).json({ error: "Invalid credentials" });
    }

    const matches = await comparePassword(password, user.password);

    if (!matches) {
      return response.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user);

    return response.status(200).json({ token });
  }

  static async getUser(request: Request, response: Response) {
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        username: true,
        products: true,
        createdAt: true,
      },
      where: {
        id: request.user.id,
      },
    });

    return response.status(200).json({ user });
  }
  static async updateUser(request: Request, response: Response) {
    const requestUser = request.user;

    const { username, password } = request.body;

    const user = await prisma.user.findUnique({
      where: {
        id: requestUser.id,
      },
    });

    if (!user) return response.status(404).json({ error: "User not found" });

    const verifyUser = user.id === requestUser.id;

    if (!verifyUser)
      return response.status(401).json({ error: "Unauthorized" });

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        username: username || user.username,
        password: (await hashPassword(password)) || user.password,
      },
    });

    if (!updatedUser)
      return response
        .status(500)
        .json({ error: "Something went wrong. Try again later" });

    return response.status(200).json({ updatedUser });
  }
  static async deleteUser(request: Request, response: Response) {
    const requestUser = request.user;

    const user = await prisma.user.findUnique({
      select: {
        id: true,
        username: true,
        products: true,
        createdAt: true,
      },
      where: {
        id: request.user.id,
      },
    });

    if (!user) return response.status(404).json({ error: "User not found" });

    const verifyUser = requestUser.id === user.id;

    if (!verifyUser)
      return response.status(401).json({ error: "Unauthorized" });

    const deletedUser = await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    if (!deletedUser)
      return response
        .status(500)
        .json({ error: "Something went wrong. Try again later" });

    return response.status(204).json({ message: "success" });
  }
}
