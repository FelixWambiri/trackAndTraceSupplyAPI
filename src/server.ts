import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import morgan from "morgan";
import swaggerDocument from "../openapi.json";
import router from "./routes/index";
import { verifyToken } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";
import { userSchema } from "./schemas";
import { zodValidationMiddleware } from "./utils";

const app = express();
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", verifyToken, router);

app.post("/auth/register", zodValidationMiddleware(userSchema), createNewUser);
app.post("/auth/login", zodValidationMiddleware(userSchema), signin);

export default app;
