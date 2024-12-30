import authController from "@controllers/auth.controller";
import validate from "@middlewares/validate";
import express from "express";

const authRouter = express.Router();

authRouter.get("/", [validate.refreshToken, validate.accessToken], authController.authenticatedUser);
authRouter.get("/refresh", validate.refreshToken, authController.refreshUserToken);
authRouter.post("/register", validate.register, authController.register);
authRouter.post("/login", validate.login, authController.login);
authRouter.post("/logout", validate.refreshToken, authController.logout);

export default authRouter;