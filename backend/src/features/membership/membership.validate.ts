import { NextFunction, Request, Response } from "express";
import membershipSchema from "./membership.schema";

const membershipInput = async (request: Request, _response: Response, next: NextFunction) => {

  try {

    // Validate request with auth schema from zod
    const validatedData = await membershipSchema.membership.parseAsync(request.body);

    // Reattach validated request into body
    request.body = validatedData;

    next();
  } catch (error: unknown) {
    next(error);
  }

};

export default {
  membershipInput
};