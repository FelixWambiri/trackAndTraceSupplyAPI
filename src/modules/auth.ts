import jwt from "jsonwebtoken";
import * as argon2 from "argon2";

export const comparePasswords = async (password, hash) => {
  return await argon2.verify(hash, password);
};

export const hashPassword = async (password) => {
  return await argon2.hash(password);
};

export const createToken = (user) => {
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

const unauthorizedError = (res) => {
  const error = {
    message: "Not authorized",
    status: 401,
  };
  res.status(error.status).json(error);
};

export const verifyToken = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: "Token required" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401).json({ message: "Token required" });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      unauthorizedError(res);
      return;
    }
    req.user = decodedToken;
    next();
    return;
  } catch (error) {
    unauthorizedError(res);
    return;
  }
};
