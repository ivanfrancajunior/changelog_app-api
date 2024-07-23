import { Request, Response, NextFunction } from "express";
export const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    return res
      .status(500)
      .json({ message: err.message, statusCode: res.statusCode });
  }
};
