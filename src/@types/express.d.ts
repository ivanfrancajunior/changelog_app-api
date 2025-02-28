import { Request } from "express";
import { User } from "@prisma/client";

declare module "express" {
  interface Request {
    user?: User;
    file?: Express.Multer.File;
  }
}
