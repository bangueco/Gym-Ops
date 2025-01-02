import express from "express";
import membershipController from "./membership.controller";
import validate from "@middlewares/validate";
import membershipSchema from "./membership.schema";

const membershipRouter = express.Router();

membershipRouter.use(validate.accessToken);
membershipRouter.use(validate.refreshToken);

membershipRouter.get("/", membershipController.getAllMemberships);
membershipRouter.get("/:membershipId", membershipController.getMembershipById);
membershipRouter.post("/", validate.schema(membershipSchema.membership), membershipController.createMembership);
membershipRouter.put("/:membershipId", validate.schema(membershipSchema.membership), membershipController.updateMembership);
membershipRouter.delete("/:membershipId", membershipController.deleteMembership);

export default membershipRouter;