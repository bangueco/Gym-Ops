import express from "express";
import authController from "./auth.controller";
import validate from "@middlewares/validate";
import authSchema from "./auth.schema";

const authRouter = express.Router();

authRouter.get("/", [validate.refreshToken, validate.accessToken], authController.authenticatedUser);
authRouter.get("/refresh", validate.refreshToken, authController.refreshUserToken);
authRouter.post("/register", validate.schema(authSchema.register), authController.register);
authRouter.post("/login", validate.schema(authSchema.login), authController.login);
authRouter.post("/logout", validate.refreshToken, authController.logout);

export default authRouter;