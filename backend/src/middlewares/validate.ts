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

export default {
  register, login
};