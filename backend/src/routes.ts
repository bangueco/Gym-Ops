import { authController } from "@features/auth";
import { memberController } from "@features/member";
import { membershipController } from "@features/membership";
import { login, member, membership, register } from "@features/schemas";
import validate from "@middlewares/validate";
import express from "express";

const apiRouter = express.Router();

// Auth routes
apiRouter.get("/auth", [validate.refreshToken, validate.accessToken], authController.authenticatedUser);
apiRouter.get("/auth/refresh", validate.refreshToken, authController.refreshUserToken);
apiRouter.post("/auth/register", validate.schema(register), authController.register);
apiRouter.post("/auth/login", validate.schema(login), authController.login);
apiRouter.post("/auth/logout", validate.refreshToken, authController.logout);

// Memberships routes
apiRouter.use("/memberships", [validate.refreshToken, validate.accessToken]);
apiRouter.get("/memberships", membershipController.getAllMemberships);
apiRouter.get("/memberships/:membershipId", membershipController.getMembershipById);
apiRouter.post("/memberships", validate.schema(membership), membershipController.createMembership);
apiRouter.put("/memberships/:membershipId", validate.schema(membership), membershipController.updateMembership);
apiRouter.delete("/memberships/:membershipId", membershipController.deleteMembership);

// Members routes
apiRouter.use("/members", [validate.refreshToken, validate.accessToken]);
apiRouter.get("/members", memberController.getAllMembers);
apiRouter.get("/members/:memberId", memberController.getMemberById);
apiRouter.post("/members", validate.schema(member)  ,memberController.createMember);
apiRouter.put("/members/:memberId", validate.schema(member), memberController.updateMember);
apiRouter.delete("/members/:memberId", memberController.deleteMember);

export default apiRouter;