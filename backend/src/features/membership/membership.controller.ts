import { NextFunction, Request, Response } from "express";
import membershipService from "./membership.service";
import httpStatusCode from "@lib/utils/httpStatusCode";

const getAllMemberships = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { createdBy, page, pageSize} = request.query;
    const memberships = await membershipService.getMemberships({createdBy: createdBy ? parseInt(createdBy as string) : undefined}, page ? parseInt(page as string) : undefined, pageSize ? parseInt(pageSize as string) : undefined);
    const membershipsSecondPage = await membershipService.getMemberships({createdBy: createdBy ? parseInt(createdBy as string) : undefined}, page ? parseInt(page as string) + 1 : undefined, pageSize ? parseInt(pageSize as string) : undefined);


    response.status(httpStatusCode.OK).json({
      memberships,
      hasNextPage: membershipsSecondPage.length > 0 ? true : false
    });
  } catch (error) {
    next(error);
  }
};

const getMembershipById = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { membershipId } = request.params;
    const membership = await membershipService.getMembershipById(parseInt(membershipId));
    response.status(httpStatusCode.OK).json(membership);
  } catch (error) {
    next(error);
  }
};

const createMembership = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { membershipName, membershipLength, membershipFee, createdBy } = request.body;
    const membership = await membershipService.createMembership(membershipName, membershipLength, createdBy, membershipFee);
    response.status(httpStatusCode.CREATED).json({message: "Membership created successfully", membership});
  } catch (error) {
    next(error);
  }
};

const updateMembership = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { membershipId } = request.params;
    const { membershipName, membershipLength, createdBy, membershipFee } = request.body;

    const membership = await membershipService.updateMembership(parseInt(membershipId), { membershipName, membershipLength, createdBy, membershipFee });
    response.status(httpStatusCode.OK).json({message: "Membership updated successfully", membership});
  } catch (error) {
    next(error);
  }
};

const deleteMembership = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { membershipId } = request.params;
    await membershipService.deleteMembership(parseInt(membershipId));
    response.status(httpStatusCode.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

export default {
  getAllMemberships, getMembershipById, createMembership, updateMembership, deleteMembership
};