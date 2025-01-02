import { authController, authSchema } from "@features/auth";
import { membershipController, membershipSchema } from "@features/membership";
import validate from "@middlewares/validate";
import express from "express";

const apiRouter = express.Router();

// Auth routes
apiRouter.get("/auth/", [validate.refreshToken, validate.accessToken], authController.authenticatedUser);
apiRouter.get("/auth/refresh", validate.refreshToken, authController.refreshUserToken);
apiRouter.post("/auth/register", validate.schema(authSchema.register), authController.register);
apiRouter.post("/auth/login", validate.schema(authSchema.login), authController.login);
apiRouter.post("/auth/logout", validate.refreshToken, authController.logout);

// Memberships routes
apiRouter.use("/memberships", [validate.refreshToken, validate.accessToken]);
apiRouter.get("/memberships/", membershipController.getAllMemberships);
apiRouter.get("/memberships/:membershipId", membershipController.getMembershipById);
apiRouter.post("/memberships/", validate.schema(membershipSchema.membership), membershipController.createMembership);
apiRouter.put("/memberships/:membershipId", validate.schema(membershipSchema.membership), membershipController.updateMembership);
apiRouter.delete("/memberships/:membershipId", membershipController.deleteMembership);

export default apiRouter;