import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = ({ id, username }: User): string => {
  const token = jwt.sign({ id, username }, process.env.TOKEN_SECRET, {
    expiresIn: "5h",
  });

  return token;
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
