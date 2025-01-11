import memberService from "./member.service";
import { NextFunction, Request, Response } from "express";

const getAllMembers = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { createdBy } = request.query;
    const members = await memberService.getMembers({createdBy: createdBy ? parseInt(createdBy as string) : undefined});
    response.status(200).json(members);
  } catch (error) {
    next(error);
  }
};

const getMemberById = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { memberId } = request.params;
    const member = await memberService.getMemberById(parseInt(memberId));
    response.status(200).json(member);
  } catch (error) {
    next(error);
  }
};

const createMember = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, phoneNumber, membershipId, createdBy } = request.body;
    const member = await memberService.createMember(firstName, lastName, email, phoneNumber, membershipId, createdBy);
    response.status(201).json({ message: "Member created successfully", member });
  } catch (error) {
    next(error);
  }
};

const updateMember = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { memberId } = request.params;
    const { firstName, lastName, email, phoneNumber, membershipId } = request.body;

    const member = await memberService.updateMember(parseInt(memberId), { firstName, lastName, email, phoneNumber, membershipId });
    response.status(200).json({ message: "Member updated successfully", member });
  } catch (error) {
    next(error);
  }
};

const deleteMember = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { memberId } = request.params;
    await memberService.deleteMember(parseInt(memberId));
    response.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default {
  getAllMembers, getMemberById, createMember, updateMember, deleteMember
};