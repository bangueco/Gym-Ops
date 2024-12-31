import express from "express";
import membershipValidate from "./membership.validate";
import membershipController from "./membership.controller";
import { authValidate } from "@features/auth";

const membershipRouter = express.Router();

membershipRouter.use(authValidate.accessToken);
membershipRouter.use(authValidate.refreshToken);

membershipRouter.post("/", membershipValidate.membershipInput, membershipController.createMembership);

export default membershipRouter;