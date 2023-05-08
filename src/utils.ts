import { z } from "zod";
import { Request, Response, NextFunction } from "express";

type ValidationError = {
  input: string;
  message: string;
};

export const zodValidationMiddleware = (schema: z.ZodType<any>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors: ValidationError[] = error.issues.map((issue) => ({
        input: issue.path.join("."),
        message: issue.message,
      }));
      res
        .status(400)
        .json({ message: "Invalid input", details: validationErrors });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};
