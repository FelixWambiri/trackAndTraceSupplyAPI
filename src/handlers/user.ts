import { Request, Response } from "express";
import prisma from "../db";
import { comparePasswords, createToken, hashPassword } from "../modules/auth";

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hash = await hashPassword(password);

    await prisma.user.create({
      data: {
        username,
        password: hash,
      },
    });

    res
      .status(201)
      .json({ message: "Registation successful, you can proceed to login" });
  } catch (error) {
    res.status(500).json({
      error:
        "Error creating user, try a different user name as the user might already exist",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.body.username },
    });

    if (!user) {
      return sendError(res, "User not found", 401);
    }

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
      return sendError(res, "Invalid username or password", 401);
    }

    const token = createToken(user);
    res.json({ token });
  } catch (error) {
    return sendError(res, "Unexpected error occurred", 500);
  }
};

const sendError = (res, message, statusCode) => {
  res.status(statusCode);
  res.send(message);
};
