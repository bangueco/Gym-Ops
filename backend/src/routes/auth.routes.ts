import authController from "@controllers/auth.controller";
import validate from "@middlewares/validate";
import express from "express";

const authRouter = express.Router();

authRouter.get("/", validate.accessToken, authController.authenticatedUser);
authRouter.post("/register", validate.register, authController.register);
authRouter.post("/login", validate.login, authController.login);

export default authRouter;