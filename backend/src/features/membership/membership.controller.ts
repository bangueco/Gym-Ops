import { NextFunction, Request, Response } from "express";
import membershipService from "./membership.service";
import httpStatusCode from "@lib/utils/httpStatusCode";

const getAllMemberships = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const memberships = await membershipService.getMemberships();
    response.status(httpStatusCode.OK).json(memberships);
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
    const { membershipName, membershipLength } = request.body;
    const membership = await membershipService.createMembership(membershipName, membershipLength);
    response.status(httpStatusCode.CREATED).json({message: "Membership created successfully", membership});
  } catch (error) {
    next(error);
  }
};

const updateMembership = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { membershipId } = request.params;
    const { membershipName, membershipLength } = request.body;

    const membership = await membershipService.updateMembership(parseInt(membershipId), { membershipName, membershipLength });
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