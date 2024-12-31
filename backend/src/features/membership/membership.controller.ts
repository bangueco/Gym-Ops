import { NextFunction, Request, Response } from "express";
import membershipService from "./membership.service";
import httpStatusCode from "@lib/utils/httpStatusCode";

const createMembership = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { membershipName, membershipLength } = request.body;
    const membership = await membershipService.createMembership(membershipName, membershipLength);
    response.status(httpStatusCode.CREATED).json({message: "Membership created successfully", membership});
  } catch (error) {
    next(error);
  }
};

export default {
  createMembership
};