import express from "express";
import authController from "./auth.controller";
import authValidate from "./auth.validate";

const authRouter = express.Router();

authRouter.get("/", [authValidate.refreshToken, authValidate.accessToken], authController.authenticatedUser);
authRouter.get("/refresh", authValidate.refreshToken, authController.refreshUserToken);
authRouter.post("/register", authValidate.registerInput, authController.register);
authRouter.post("/login", authValidate.loginInput, authController.login);
authRouter.post("/logout", authValidate.refreshToken, authController.logout);

export default authRouter;