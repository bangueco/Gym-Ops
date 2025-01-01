import express from "express";
import membershipValidate from "./membership.validate";
import membershipController from "./membership.controller";
import { authValidate } from "@features/auth";

const membershipRouter = express.Router();

membershipRouter.use(authValidate.accessToken);
membershipRouter.use(authValidate.refreshToken);

membershipRouter.get("/", membershipController.getAllMemberships);
membershipRouter.get("/:membershipId", membershipController.getMembershipById);
membershipRouter.post("/", membershipValidate.membershipInput, membershipController.createMembership);
membershipRouter.put("/:membershipId", membershipValidate.membershipInput, membershipController.updateMembership);
membershipRouter.delete("/:membershipId", membershipController.deleteMembership);

export default membershipRouter;