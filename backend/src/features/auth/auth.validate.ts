import jwt from "@lib/jwt";
import { ApiError } from "@lib/utils/appError";
import httpStatusCode from "@lib/utils/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import authSchema from "./auth.schema";

const registerInput = async (request: Request, _response: Response, next: NextFunction) => {

  try {

    // Validate request with auth schema from zod
    const validatedData = await authSchema.register.parseAsync(request.body);

    // Reattach validated request into body
    request.body = validatedData;

    next();
  } catch (error: unknown) {
    next(error);
  }

};

const loginInput = async (request: Request, _response: Response, next: NextFunction) => {

  try {

    // Validate request with auth schema from zod
    const validatedData = await authSchema.login.parseAsync(request.body);

    // Reattach validated request into body
    request.body = validatedData;

    next();
  } catch (error) {
    next(error);
  }

};

const accessToken = (request: Request, _response: Response, next: NextFunction) => {
  try {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new ApiError(httpStatusCode.UNAUTHORIZED, "Invalid authorization header.");
    }

    const token = authorizationHeader.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(httpStatusCode.UNAUTHORIZED, "Bearer token not found.");
    }

    const decoded = jwt.verifyAccessToken(token);

    if (typeof decoded !== "string") {
      request.user = decoded;
    }

    next();
  } catch (error: unknown) {
    next(error);
  }
};

const refreshToken = (request: Request, _response: Response, next: NextFunction) => {
  try {
    const { refreshToken } = request.cookies;

    if (!refreshToken) {
      throw new ApiError(httpStatusCode.UNAUTHORIZED, "Refresh token not found.");
    }

    const payload = jwt.verifyRefreshToken(refreshToken);

    if (typeof payload === "string") {
      throw new ApiError(httpStatusCode.UNAUTHORIZED, "Invalid refresh token.");
    }

    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  registerInput, loginInput, accessToken, refreshToken
};