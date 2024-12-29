import jwt from "@lib/jwt";
import { ApiError } from "@lib/utils/appError";
import httpStatusCode from "@lib/utils/httpStatusCode";
import authSchema from "@schemas/authSchema";
import { NextFunction, Request, Response } from "express";

const register = async (request: Request, _response: Response, next: NextFunction) => {

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

const login = async (request: Request, _response: Response, next: NextFunction) => {

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

    const decoded = jwt.verifyToken(token);

    if (typeof decoded !== "string") {
      request.user = decoded;
    }

    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  register, login, accessToken
};