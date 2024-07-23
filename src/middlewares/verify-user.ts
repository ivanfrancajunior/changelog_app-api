import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const protect = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const bearer = request.headers.authorization;

  if (!bearer) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  const [, token] = bearer.split(" ");

  if (!token) return response.status(401).json({ error: "Unauthorized" });
  try {
    const user = jwt.verify(token, process.env.TOKEN_SECRET)

    if (!user) return response.status(401).json({ error: "Invalid token" });

    request.user = user;
  } catch (error) {
    console.log(error);
    return response.status(401).json({ error: "Unauthorized" });
  }

  next();
};
